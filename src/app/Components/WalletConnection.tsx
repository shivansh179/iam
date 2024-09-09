"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const WalletConnection = () => {
  const [account, setAccount] = useState<string | null>(null);

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
      const handleAccountsChanged = (accounts: string[]) => {
        setAccount(accounts[0]);
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      // Cleanup the event listener on component unmount
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
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
