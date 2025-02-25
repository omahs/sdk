import { ContractsRegistryType } from '../contracts';

const addresses: ContractsRegistryType['1'] = {
  ANGLE: '0x900F717EA076E1E7a484ad9DD2dB81CEEc60eBF1',
  AngleRouter: '0x892bf71463Bd9fa57f3c2266aB74dbe1B96DECEa',
  AngleHelpers: '0xA014eF0565C22c33e8099744e1e1543f736B01d6',
  agEUR: {
    AgToken: '0xE0B52e49357Fd4DAf2c15e02058DCE6BC0057db4',
    bridges: {
      LayerZero: '0x0c1EBBb61374dA1a8C57cB6681bF27178360d36F',
    },
    borrowCollaterals: {
      MAI: {
        Oracle: '0xD622c71aba9060F393FEC67D3e2B9335292bf23B',
        VaultManager: '0xf18303E2Dd58Cf29cad655B3bD2e1Cc4582C6A16',
      },
      USDC: {
        Oracle: '0x06486a422B8742218693F874CEA95a69C92a004f',
        VaultManager: '0xfB16d8e96C0C6e9B72541BFd8D4C3D9e867c990b',
      },
      WBTC: {
        Oracle: '0x6070bbcd2d37Ca71B51AB5337D4d46749C0f1e82',
        VaultManager: '0x0945dE4F356DE3569fE12850AB85a91F533B87A0',
      },
      WETH: {
        Oracle: '0x59FCDbc915508bb23E7d93952525a6e67AEafF1F',
        VaultManager: '0x3f125ECD51181Af1f344aDF76E4271d2923707AB',
      },
      WMATIC: {
        Oracle: '0x1b0c95852Fa547C44600F70eF473640E1B717CE4',
        VaultManager: '0x4b81f51988cd6A9F44350cdABeE9620d16359aa3',
      },
      am3CRV: {
        LPToken: '0xE7a24EF0C5e95Ffb0f6684b813A78F2a3AD7D171',
        Oracle: '0x2e9e48b515bC6D0128B7022A5d868137f0173bF6',
        Rewards: ['0x02Cb0586F9252626e992B2C6c1B792d9751f2Ede'],
        Staker: '0x583EE5b0b2999679d1DdE7aa178B225ad57c481b',
        Swapper: '0xC96dd3f9f50286de5658A664327a9d1E654A8673',
        VaultManager: '0x128C3da565013a236cDcff14738297F9042455Ce',
      },
    },
    Swapper: '0x0050038959659c1e09D5E7F0543b5cf411a942B6',
    Treasury: '0x2F2e0ba9746aae15888cf234c4EB5B301710927e',
  },
  ExternalStakings: [
    {
      tokenName: 'G-UNI agEUR/USDC',
      stakingContractAddress: '0x15BdE1A8d16d4072d949591aFd4fA7ad9d127D05',
      poolContractAddress: '0x1644de0A8E54626b54AC77463900FcFFD8B94542',
    },
  ],
  CoreBorrow: '0x78754109cb73772d70A6560297037657C2AF51b8',
  FlashAngle: '0x2878596427bfA6b52Fa6D93B519A0c610bbDf00a',
  Governor: '0xdA2D2f638D6fcbE306236583845e5822554c02EA',
  Guardian: '0x3b9D32D0822A6351F415BeaB05251c1457FF6f8D',
  MerkleRootDistributor: '0x60FCebEA8F237E771e26939A631Dcf8eFE6d4408',
  MulticallWithFailure: '0xAd96B6342e4EbbbFBAfF0DF248E84C7304fFF5a5',
  ProxyAdmin: '0xBFca293e17e067e8aBdca30A5D35ADDd0cBaE6D6',
};

export default addresses;
