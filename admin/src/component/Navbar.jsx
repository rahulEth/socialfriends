// components/Header.js
import React, { useState } from "react";
import { ethers } from "ethers";
import { Web3Provider } from "ethers/providers";

function Header() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== "undefined") {
        // Request accounts
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]); // Get the first account
        console.log("Wallet connected:", accounts[0]);
        const provider = new ethers.JsonRpcProvider(
          process.env.TAIKO_HELKA_TESTNET
        );
        console.log("Provider initialized:", provider);
      } else {
        setErrorMessage(
          "MetaMask is not installed. Please install it to continue."
        );
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      setErrorMessage("An error occurred while connecting to MetaMask.");
    }
  };
  return (
    <header className="bg-[#bbf7d0cb] p-4 flex items-center justify-between sticky h-20 top-0 ">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          Logo
        </div>
        <h1 className="text-lg font-semibold">Earth Friend</h1>
      </div>
      <div className="flex items-center space-x-2">
        {walletAddress ? (
          <>
            <span>Auditor</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Wallet Connected
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
