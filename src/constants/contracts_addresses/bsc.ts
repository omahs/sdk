import { ContractsRegistryType } from '../contracts';

const addresses: ContractsRegistryType['1'] = {
  ANGLE: '0x97B6897AAd7aBa3861c04C0e6388Fc02AF1F227f',
  bridges: {
    LayerZero: '0x16cd38b1B54E7abf307Cb2697E2D9321e843d5AA',
  },
  agEUR: {
    AgToken: '0x12f31B73D812C6Bb0d735a218c086d44D5fe5f89',
    bridges: {
      Anyswap: '0x38C84D5bBAD726D465Cf6A5349E41D6d7095faf7',
      LayerZero: '0xe9f183FC656656f1F17af1F2b0dF79b8fF9ad8eD',
    },
    Treasury: '0x9485aca5bbBE1667AD97c7fE7C4531a624C8b1ED',
  },
  CoreBorrow: '0x31429d1856aD1377A8A0079410B297e1a9e214c2',
  Governor: '0x0128eA927198f39e4955DdB01Fd62E8De6B3e6a4',
  Guardian: '0x371Ac6dB8063e6076890ef032A4A3cFCF226F548',
  ProxyAdmin: '0x9a5b060Bd7b8f86c4C0D720a17367729670AfB19',
};

export default addresses;
