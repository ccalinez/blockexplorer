export type Block {
  hash: string;
  parentHash: string;
  number : number;
  timestamp: number;

  gasLimit : BigNumber;
  gasUsed : BigNumber;
  miner: string,
  extraData : string;
  transactions : string [];
  baseFeePerGas: BigNumber;
  _difficulty: BigNumber;
}