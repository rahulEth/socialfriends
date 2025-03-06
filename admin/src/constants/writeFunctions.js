// import getContract from "../../Utilities/getContract";

import { toast } from "react-hot-toast";
import getContract from "../utils/getContract";

export const successNotification = (msg) =>
  toast.success(msg, { duration: 3000 });

export const errorNotification = (msg) => toast.error(msg, { duration: 3000 });

export const uploadDataToSmartContract = async (
  address,
  value,
  ipfsHash,
  activityType
) => {
  try {
    const contract = await getContract();

    const estimatedGas = await contract?.submitTransaction.estimateGas(
      address,
      value,
      ipfsHash,
      activityType
    );

    console.log("The estimated gas is", estimatedGas?.toString());

    const transaction = await contract?.submitTransaction(
      address,
      value,
      ipfsHash,
      activityType,
      {
        gasLimit: estimatedGas?.toString(),
      }
    );

    console.log("The transaction hash is", transaction?.hash);

    return transaction?.hash;
  } catch (error) {
    console.log(error);
  }
};
