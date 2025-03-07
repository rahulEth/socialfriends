import axios from "axios";
import getContract from "../../Utilities/getContract";
import { EventLog } from "ethers";

export const getTransactionsByUser = async(userAddress: `0x${string}`) => {

    try {
        
        let url: string = "http://localhost:8000/api/getTransactionsByUser";

        let params = { 

            userAddr: userAddress,

        }

        const resp = await axios.get(url , {params});
        
        // console.log(resp.data);

        return resp.data;

    } catch (error) {

        console.log(error);        
    }

}

export const readEventSubmitTransaction = async() => {

    try {
        
        const contract = await getContract();

        const transactions = await contract?.queryFilter("SubmitTransaction");

        let txId;

        transactions?.map((transaction) => {

            const transactionDetails = transaction as EventLog;

            txId = transactionDetails?.args[1].toString();

        })

        return txId;


    } catch (error) {

        console.log(error);
        
    }

}
