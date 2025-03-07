import axios from "axios";
import getContract from "../../Utilities/getContract";

import { toast } from "react-hot-toast";

export const successNotification = (msg: string) => toast.success(msg , {duration: 3000});


export const errorNotification = (msg: string) => toast.error(msg , {duration: 3000});



export const uploadDataToSmartContract = async(address: `0x${string}` , value: number , ipfsHash: string , activityType: string) => {


    try {
        
        const contract = await getContract();

        const estimatedGas = await contract?.submitTransaction.estimateGas(address , value , ipfsHash , activityType);


        console.log("The estimated gas is" , estimatedGas?.toString());

        const transaction = await contract?.submitTransaction(address , value , ipfsHash , activityType , {

            gasLimit: estimatedGas?.toString(),

        });

        console.log("The transaction hash is" , transaction?.hash);

        return transaction?.hash;



    } catch (error) {

        console.log(error);
        
    }

   

}

export const submitTransaction = async(userAddress: `0x${string}` , filename: string , ipfsPath: string, activityType: string , txId: string , tokenAmount: number , txIndexId: string) => {

    try {
        
        const url: string = "http://localhost:8000/api/submitTransaction";

        const data = {

            userAddr: userAddress,
            fileName: filename,
            ipfsPath: ipfsPath,
            activityType: activityType,
            txId: txId,
            tokenAmount: tokenAmount,
            txIndexId: txIndexId,

        }

        const resp = await axios.post(url , data);

        // console.log(resp.data);

        return resp.data;

    } catch (error) {

        console.log(error);
        
    }

}

export const execTransaction = async(userAddress: `0x${string}`, txIndexId: string , txId: string , status: string) => {

    try {

        const url: string = "http://localhost:8000/api/execTransaction";

        const data = {

            userAddr: userAddress,
            txIndexId: txIndexId,
            txId: txId,
            status: status,

        }

        const resp = await axios.post(url , data);

        console.log(resp.data);

        return resp.data;



    } catch (error) {

        console.log(error);
        
    }

}

