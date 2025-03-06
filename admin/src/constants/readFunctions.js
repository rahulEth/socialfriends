import axios from "axios";

export const getTransactionsByUser = async (userAddress) => {
  try {
    let url = "http://localhost:3001//api/getTransactionsByUser";

    let params = {
      userAddr: userAddress,
    };

    const resp = await axios.get(url, { params });

    console.log(resp.data);

    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const submitTransaction = async (
  userAddress,
  filename,
  ipfsHash,
  activityType,
  txId,
  tokenAmount,
  txIndexId
) => {
  try {
    const url = "http://localhost:3001/api/submitTransaction";

    const data = {
      userAddr: userAddress,
      fileName: filename,
      ipfsPath: ipfsHash,
      activityType: activityType,
      txId: txId,
      tokenAmount: tokenAmount,
      txIndexId: txIndexId,
    };

    const resp = await axios.post(url, data);

    console.log(resp.data);

    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const execTransaction = async (userAddress, txIndexId, txId, status) => {
  try {
    const url = "http://localhost:3001/api/execTransaction";

    const data = {
      userAddr: userAddress,
      txIndexId: txIndexId,
      txId: txId,
      status: status,
    };

    const resp = await axios.post(url, data);

    console.log(resp.data);

    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
