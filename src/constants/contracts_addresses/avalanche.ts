import { ContractsRegistryType } from '../contracts';

const addresses: ContractsRegistryType['1'] = {
  ANGLE: '0x5EE94c25e3d5113CD055537340B9d19CFA4D9217',
  bridges: {
    LayerZero: '0xC011882d0f7672D8942e7fE2248C174eeD640c8f',
  },
  agEUR: {
    AgToken: '0xAEC8318a9a59bAEb39861d10ff6C7f7bf1F96C57',
    bridges: {
      Anyswap: '0x6feFd97F328342a8A840546A55FDcfEe7542F9A8',
      LayerZero: '0x14C00080F97B9069ae3B4Eb506ee8a633f8F5434',
    },
    Treasury: '0xa014A485D64efb236423004AB1a99C0aaa97a549',
  },
  ExternalStakings: [
    {
      tokenName: 'Pangolin agEUR/AVAX',
      stakingContractAddress: '',
      poolContractAddress: '0x4A045a80967B5ecc440c88dF9a15a3339d43D029',
    },
  ],
  CoreBorrow: '0xe9f183FC656656f1F17af1F2b0dF79b8fF9ad8eD',
  FlashAngle: '0x9C215206Da4bf108aE5aEEf9dA7caD3352A36Dad',
  Governor: '0x43a7947A1288e65fAF30D8dDb3ca61Eaabd41613',
  Guardian: '0xCcD44983f597aE4d4E2B70CF979597D63a10870D',
  ProxyAdmin: '0x7AB641E661a9728913A44e06f6a4879481142DDb',
};

export default addresses;
