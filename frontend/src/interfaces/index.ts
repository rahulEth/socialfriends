interface ABIInput {
  internalType: string;
  name: string;
  type: string;
}

interface ABIEventInput {
  indexed: boolean;
  internalType: string;
  name: string;
  type: string;
}

interface ABIEvent {
  anonymous: boolean;
  inputs: ABIEventInput[];
  name: string;
  type: string;
}

interface ABIFunction {
  inputs: ABIInput[];
  name: string;
  outputs?: ABIInput[];
  stateMutability: string;
  type: string;
}

interface CONTRACTABI {
  abi: (ABIEvent | ABIFunction)[];
}

interface TransactionData {
  activityType: string;
  date: Date;
  exeTxId: string;
  fileName: string;
  ipfsPath: string;
  status: string;
  subTxId: string;
  tokenAmount: string;
  txIndexId: string;
  userAddr: string;
  _id: string;
}

export type { CONTRACTABI,  TransactionData};
