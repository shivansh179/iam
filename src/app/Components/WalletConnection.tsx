"use client"

// components/WalletConnection.js
import { Wallet } from "ethers";
import { SetStateAction, useEffect, useState } from "react";

const WalletConnection = () => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: SetStateAction<null>[]) => {
        setAccount(accounts[0]);
      });
    }
  }, []);

  return (
    <div>
      {account ? (
        <p className="text-green-500">Connected: {account}</p>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnection;
