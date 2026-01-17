"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [eth, seteth] = useState("");
  const [balance, setbalance] = useState("0");

  const contractAddress = "0x852137383c88D98c8687F4c97Df42849Ae968066";

  const abi =[
        {
            "type": "function",
            "name": "deposit",
            "inputs": [],
            "outputs": [],
            "stateMutability": "payable"
        },
        {
            "type": "function",
            "name": "getAddresstoAmountDeposited",
            "inputs": [
                {
                    "name": "depositingaddress",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "s_deposits",
            "inputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "event",
            "name": "Deposit",
            "inputs": [
                {
                    "name": "USER",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                },
                {
                    "name": "amount",
                    "type": "uint256",
                    "indexed": false,
                    "internalType": "uint256"
                }
            ],
            "anonymous": false
        },
        {
            "type": "error",
            "name": "Ledger__NotEnoughEthSent",
            "inputs": []
        }
    ];
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const prov = new ethers.BrowserProvider(window.ethereum);
      setProvider(prov);
    }
  }, []);

  async function connect() {
    if (!provider) {
      alert("Install MetaMask");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const signerObj = await provider.getSigner();
      setSigner(signerObj);

      const contractObj = new ethers.Contract(
        contractAddress,
        abi,
        signerObj
      );
      setContract(contractObj);

      setIsConnected(true);
    } catch (e) {
      console.error(e);
    }
  }

  async function execute() {
    if (!contract) {
      alert("Connect wallet first");
      return;
    }
        if (!eth) {
      alert("Enter ETH amount");
      return;
    }

    const tx = await contract.deposit({
      value: ethers.parseEther(eth),
    });

    await tx.wait();
 
    alert(`Deposited ${eth} ETH`);
    seteth("");
  }

  

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to My MINIDAPP</h1>

      {isConnected ? (
        <p>Connected</p>
      ) : (
        <button onClick={connect}>Connect</button>
      )}

      <div style={{ marginTop: "20px" 

      }}>
        <input
          type="text"
          placeholder="Enter ETH"
          value={eth}
          onChange={(e) => seteth(e.target.value)}
        />
        <button onClick={execute} disabled={!contract || !isConnected}>
          Deposit
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        
       
      </div>
    </div>
  );
}