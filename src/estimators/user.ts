import { BigNumberish } from '@ethersproject/bignumber';
import { ethers } from 'ethers';

import { registry } from '../constants';
import { Oracle__factory, PerpetualManagerFront__factory, StableMasterFront__factory } from '../constants/types';
import { computeBurn, computeInverseBurn, computeInverseMint, computeMint } from '../helpers';
import { ChainId } from '../index';
import { parseCollat, parseStable } from '../utils';

/**
 * Estimates the amount of stablecoin one would get with this amount of collateral
 *
 * @param amount - Amount of collateral used to mint
 * @param collateral - Address, symbol or name of the collateral used
 * @param stablecoin - Address, symbol or name of the stablecoin
 *
 * @returns the amount of stablecoin received (with 18 decimals)
 */
export async function estimateMint(
  amount: BigNumberish,
  collateral: string,
  stablecoin: string,
  provider = ethers.getDefaultProvider()
): Promise<BigNumberish> {
  const stable = parseStable(stablecoin);
  const collat = parseCollat(collateral);

  // Fetch data on chain
  const stableMasterAddress = registry(ChainId.MAINNET, { stablecoin: stable.symbol })?.StableMaster;
  const oracleAddress = registry(ChainId.MAINNET, stable.symbol, collat.symbol)?.Oracle;
  const perpetualManagerAddress = registry(ChainId.MAINNET, stable.symbol, collat.symbol)?.PerpetualManager;
  const poolManagerAddress = registry(ChainId.MAINNET, stable.symbol, collat.symbol)?.PoolManager;

  /** Error case */
  if (!stableMasterAddress || !oracleAddress || !perpetualManagerAddress || !poolManagerAddress) {
    console.error('Address do not exist');
    return 0;
  } else {
    const stablemaster = StableMasterFront__factory.connect(stableMasterAddress, provider);
    const oracle = Oracle__factory.connect(oracleAddress, provider);
    const perpetualManager = PerpetualManagerFront__factory.connect(perpetualManagerAddress, provider);

    const rate = await oracle.readLower();
    const totalCoveredAmount = await perpetualManager.totalHedgeAmount();
    const stocksUsers = (await stablemaster.collateralMap(poolManagerAddress)).stocksUsers;
    const collatRatio = await stablemaster.getCollateralRatio();

    return computeMint(
      1,
      stable.symbol.slice(2),
      collat.symbol,
      amount,
      collat.decimals,
      rate,
      totalCoveredAmount,
      stocksUsers,
      collatRatio
    ).amountForUserInStable;
  }
}

/**
 * Estimates the amount of collateral needed to get a targeted amount of stablecoin
 *
 * @param amount - Targeted amount of stablecoin
 * @param collateral - Address, symbol or name of the collateral
 * @param stablecoin - Address, symbol or name of the stablecoin
 *
 * @returns the amount of collateral needed (with decimals of the collateral)
 */
export async function estimateInverseMint(
  amount: BigNumberish,
  collateral: string,
  stablecoin: string,
  provider = ethers.getDefaultProvider()
): Promise<BigNumberish> {
  const stable = parseStable(stablecoin);
  const collat = parseCollat(collateral);

  // Fetch data on chain
  const stableMasterAddress = registry(ChainId.MAINNET, { stablecoin: stable.symbol })?.StableMaster;
  const oracleAddress = registry(ChainId.MAINNET, stable.symbol, collat.symbol)?.Oracle;
  const perpetualManagerAddress = registry(ChainId.MAINNET, stable.symbol, collat.symbol)?.PerpetualManager;
  const poolManagerAddress = registry(ChainId.MAINNET, stable.symbol, collat.symbol)?.PoolManager;

  /** Error case */
  if (!stableMasterAddress || !oracleAddress || !perpetualManagerAddress || !poolManagerAddress) {
    console.error('Address do not exist');
    return 0;
  } else {
    const stablemaster = StableMasterFront__factory.connect(stableMasterAddress, provider);
    const oracle = Oracle__factory.connect(oracleAddress, provider);
    const perpetualManager = PerpetualManagerFront__factory.connect(perpetualManagerAddress, provider);

    const rate = await oracle.readLower();
    const totalCoveredAmount = await perpetualManager.totalHedgeAmount();
    const stocksUsers = (await stablemaster.collateralMap(poolManagerAddress)).stocksUsers;
    const collatRatio = await stablemaster.getCollateralRatio();

    return computeInverseMint(
      1,
      stable.symbol.slice(2),
      collat.symbol,
      amount,
      collat.decimals,
      rate,
      totalCoveredAmount,
      stocksUsers,
      collatRatio
    ).amountOfCollateralNeeded;
  }
}

/**
 * Estimates the amount of collateral one would get when burning `amount` of stablecoin
 *
 * @param amount - Amount of stablecoin to burn
 * @param collateral - Address, symbol or name of the collateral used
 * @param stablecoin - Address, symbol or name of the stablecoin
 *
 * @returns the amount of collateral received (with decimals of the collateral)
 */
export async function estimateBurn(
  amount: BigNumberish,
  collateral: string,
  stablecoin: string,
  provider = ethers.getDefaultProvider()
): Promise<BigNumberish> {
  const stable = parseStable(stablecoin);
  const collat = parseCollat(collateral);

  // Fetch data on chain
  const stableMasterAddress = registry(ChainId.MAINNET, { stablecoin: stable.symbol })?.StableMaster;
  const oracleAddress = registry(ChainId.MAINNET, stable.symbol, collat.symbol)?.Oracle;
  const perpetualManagerAddress = registry(ChainId.MAINNET, stable.symbol, collat.symbol)?.PerpetualManager;
  const poolManagerAddress = registry(ChainId.MAINNET, stable.symbol, collat.symbol)?.PoolManager;

  /** Error case */
  if (!stableMasterAddress || !oracleAddress || !perpetualManagerAddress || !poolManagerAddress) {
    console.error('Address do not exist');
    return 0;
  } else {
    const stablemaster = StableMasterFront__factory.connect(stableMasterAddress, provider);
    const oracle = Oracle__factory.connect(oracleAddress, provider);
    const perpetualManager = PerpetualManagerFront__factory.connect(perpetualManagerAddress, provider);

    const rate = await oracle.readLower();
    const totalCoveredAmount = await perpetualManager.totalHedgeAmount();
    const stocksUsers = (await stablemaster.collateralMap(poolManagerAddress)).stocksUsers;
    const collatRatio = await stablemaster.getCollateralRatio();

    return computeBurn(
      1,
      stable.symbol.slice(2),
      collat.symbol,
      amount,
      collat.decimals,
      rate,
      totalCoveredAmount,
      stocksUsers,
      collatRatio
    ).amountForUserInCollateral;
  }
}

/**
 * Estimates the amount of stablecoin needed to redeem `amount` of collateral
 *
 * @param amount - Amount of collateral targeted
 * @param collateral - Address, symbol or name of the collateral used
 * @param stablecoin - Address, symbol or name of the stablecoin
 *
 * @returns the amount of stablecoins needed (with 18 decimals)
 */
export async function estimateInverseBurn(
  amount: BigNumberish,
  collateral: string,
  stablecoin: string,
  provider = ethers.getDefaultProvider()
): Promise<BigNumberish> {
  const stable = parseStable(stablecoin);
  const collat = parseCollat(collateral);

  // Fetch data on chain
  const stableMasterAddress = registry(ChainId.MAINNET, { stablecoin: stable.symbol })?.StableMaster;
  const oracleAddress = registry(ChainId.MAINNET, stable.symbol, collat.symbol)?.Oracle;
  const perpetualManagerAddress = registry(ChainId.MAINNET, stable.symbol, collat.symbol)?.PerpetualManager;
  const poolManagerAddress = registry(ChainId.MAINNET, stable.symbol, collat.symbol)?.PoolManager;

  /** Error case */
  if (!stableMasterAddress || !oracleAddress || !perpetualManagerAddress || !poolManagerAddress) {
    console.error('Address do not exist');
    return 0;
  } else {
    const stableMasterAddress = registry(ChainId.MAINNET, { stablecoin: stable.symbol })?.StableMaster;
    const oracleAddress = registry(ChainId.MAINNET, stable.symbol, collat.symbol)?.Oracle;
    const perpetualManagerAddress = registry(ChainId.MAINNET, stable.symbol, collat.symbol)?.PerpetualManager;
    const poolManagerAddress = registry(ChainId.MAINNET, stable.symbol, collat.symbol)?.PoolManager;

    /** Error case */
    if (!stableMasterAddress || !oracleAddress || !perpetualManagerAddress || !poolManagerAddress) {
      console.error('Address do not exist');
      return 0;
    } else {
      const stablemaster = StableMasterFront__factory.connect(stableMasterAddress, provider);
      const oracle = Oracle__factory.connect(oracleAddress, provider);
      const perpetualManager = PerpetualManagerFront__factory.connect(perpetualManagerAddress, provider);

      const rate = await oracle.readLower();
      const totalCoveredAmount = await perpetualManager.totalHedgeAmount();
      const stocksUsers = (await stablemaster.collateralMap(poolManagerAddress)).stocksUsers;
      const collatRatio = await stablemaster.getCollateralRatio();

      return computeInverseBurn(
        1,
        stable.symbol.slice(2),
        collat.symbol,
        amount,
        collat.decimals,
        rate,
        totalCoveredAmount,
        stocksUsers,
        collatRatio
      ).amountOfStablecoinNeeded;
    }
  }
}
