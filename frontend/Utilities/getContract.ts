import {ethers} from "ethers";

import { CONTRACT_ADDRESS , ABI } from "@/constants/constants";

const getContract = async() => {

    try {
        
        const provider = new ethers.BrowserProvider(window.ethereum);

        const signer = await provider.getSigner();

        const contract = new ethers.Contract(CONTRACT_ADDRESS , ABI , signer);

        return contract;

    } catch (error) {

        console.log(error);
        
    }

}
export default getContract;