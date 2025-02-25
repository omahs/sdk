import { BigNumber, providers, Wallet } from 'ethers';

import { ALL_TOKENS, CONTRACTS_ADDRESSES, registry, RewardsDistributor__factory } from '../constants';
import { AssetType, ChainId } from '../types';
import { Logger } from './logger';
import { addCall, execMulticall } from './multicall';

export function getStakingPools(chainId: ChainId): string[] {
  const stablesSymbols = Object.values(ALL_TOKENS[chainId][AssetType.STABLE]).map((token) => token.symbol);

  const stakingContracts = stablesSymbols.reduce((acc, stableSymbol) => {
    const agToken = registry(chainId, { stablecoin: stableSymbol });

    if (!!agToken?.collaterals) {
      for (const collateral of Object.values(agToken?.collaterals)) {
        if (collateral.Staking) {
          acc.push(collateral.Staking);
        }
        if (collateral.PerpetualManager) {
          acc.push(collateral.PerpetualManager);
        }
      }

      const externalStaking = CONTRACTS_ADDRESSES[chainId].ExternalStakings?.map((token) => token.stakingContractAddress);
      if (externalStaking && externalStaking.length > 0) {
        acc.push(...externalStaking);
      }
    }

    return acc;
  }, [] as string[]);

  return stakingContracts;
}

type TStakingParams = {
  lastDistributionTime: BigNumber;
  updateFrequency: BigNumber;
  amountToDistribute: BigNumber;
  distributedRewards: BigNumber;
  duration: BigNumber;
  timeStarted: BigNumber;
};

function computeDripAmount(stakingParams: TStakingParams) {
  if (stakingParams.distributedRewards.gte(stakingParams.amountToDistribute)) {
    return BigNumber.from(0);
  }

  const timestamp = BigNumber.from(Date.now()).div(1000);

  const dripAmount = stakingParams.amountToDistribute.mul(timestamp.sub(stakingParams.lastDistributionTime)).div(stakingParams.duration);

  const _duration = stakingParams.duration;
  const timePassed = timestamp.sub(stakingParams.timeStarted);
  const _timeSinceStart = timePassed.gt(_duration) ? _duration : timePassed;
  const timeLeft = stakingParams.duration.sub(_timeSinceStart);

  const rewardsLeftToDistribute = stakingParams.amountToDistribute.sub(stakingParams.distributedRewards);
  if (timeLeft.lt(stakingParams.updateFrequency) || rewardsLeftToDistribute.lt(dripAmount) || timeLeft.eq(0)) {
    return rewardsLeftToDistribute;
  } else {
    return dripAmount;
  }
}

export async function poolsToDrip(stakingContracts: string[], provider: providers.JsonRpcProvider, chainId: ChainId) {
  // eslint-disable-next-line
  const rewardsDistributorAddress = CONTRACTS_ADDRESSES[chainId].RewardsDistributor!;
  const calls = stakingContracts.map((contract) => {
    return addCall(
      RewardsDistributor__factory.createInterface(),
      rewardsDistributorAddress,
      RewardsDistributor__factory.createInterface().functions['stakingContractsMap(address)'].name,
      [contract]
    );
  });

  const results = await execMulticall<TStakingParams>(calls, provider, chainId);
  const dripAvailable: string[] = [];
  for (let i = 0; i < results.length; i++) {
    const stakingParams = results[i];
    const nextDripTimestamp = stakingParams.lastDistributionTime.add(stakingParams.updateFrequency);
    Logger('nextDripTimestamp', new Date(nextDripTimestamp.toNumber() * 1000), stakingContracts[i]);

    if (Date.now() / 1000 >= nextDripTimestamp.toNumber() && computeDripAmount(stakingParams).gt(0)) {
      dripAvailable.push(stakingContracts[i]);
    }
  }
  Logger(dripAvailable);
  return dripAvailable;
}

/**
 * Calls drip() on a Staking contract
 *
 * @param stakingContract - Address of the staking contract
 * @param provider - Ethers provider
 * @param signer - Ethers signer
 * @param chainId - chainId of the network
 */
export async function drip(stakingContract: string, provider: providers.JsonRpcProvider, signer: Wallet, chainId: ChainId): Promise<void> {
  const address = registry(chainId)?.RewardsDistributor;
  if (!!address) {
    const contract = RewardsDistributor__factory.connect(address, provider);
    const tx = await contract.connect(signer).drip(stakingContract);
    Logger('tx drip: ', tx);
    const receipt = await tx.wait();
    Logger('receipt drip: ', receipt);
  } else {
    console.error('RewardsDistributor does not exist on this chain');
  }
}

export default async function (provider: providers.JsonRpcProvider, signer: Wallet, chainId: ChainId) {
  const stakingContracts = getStakingPools(chainId);
  const toDrip = await poolsToDrip(stakingContracts, provider, chainId);

  for (const stakingContract of toDrip) {
    await drip(stakingContract, provider, signer, chainId);
  }
}
