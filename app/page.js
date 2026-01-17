/*"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

import { ethers } from "ethers";


export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [eth,seteth]=useState("");
  const [balance,setbalance]= useState("0");
  const [contract,setContract] = useState(undefined)
  const contractAddress= "0x764287563CcAf77c0E598912175E0e144e087911";
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

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        const provider = new ethers.providers.BrowserProvider(window.ethereum);
        const signerobj= await provider.getSigner();
        setSigner(signerobj);
        
        const contractobj =new ethers.Contract(contractAddress,abi,signerobj);
        setContract(contractobj);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("INSTALL METAMASK");
      setIsConnected(false);
    }
  }
  async function execute (){
    if(!contract)
    {
      alert("Please connect your wallet first");
      return;
    }
   
      if(!eth){
        alert("Enter valid amount");
        return;
      }
     const transaction=await contract.deposit({
      value: ethers.parseEther(eth)
    });// I have deposited.
    await transaction.wait();
    alert(`Deposited ${eth} ETH`);

  }



async function getBalance(){
   if (!signer) return;
  try {
    const userAddress = await signer.getAddress();
    const balancemod = await contract.getAddresstoAmountDeposited(userAddress);
    const balanceEth = ethers.formatEther(balancemod);
    setbalance(balanceEth);
  } catch (e) {
    console.log(e);
  }
}

/*function listenEvents(){
   
  if(!contract){
    return;
  }
  contract.removeAllListeners("Deposit");
  contract.on("Deposit",(user,amount) => {
    console.log("Your deposit is confirmed",user,ethers.formatEther(amount));
  });
}*/
/*
return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to My DAPP</h1>

      {isConnected ? (
        <p>Connected</p>
      ) : (
        <button onClick={connect} style={{ padding: "10px 20px", borderRadius: "5px" }}>
          Connect
        </button>
      )}

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter ETH"
          value={eth }
          onChange={(e) => seteth(e.target.value)}
          style={{ padding: "10px", width: "250px" }}
        />
        <button
          onClick={execute}
          disabled={!contract}
          style={{ padding: "10px 20px", marginLeft: "10px", borderRadius: "5px" }}
        >
          Deposit
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <p>Deposited: {balance} ETH</p>
        <button onClick={getBalance} style={{ padding: "10px 20px", borderRadius: "5px" }}>
          Balance
        </button>
          </div>
    </div>
  );
}
*/
/*
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
      <h1>Welcome to My DAPP</h1>

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
  */
 import React from 'react'
 
 const page = () => {
   return (
     <div style ={
      {
        fontSize:'20px',
        fontWeight:'700',
        fontFamily:'sans-serif',
        color:'red',
        marginTop:'50px',

      }
     }>
       “Design. Develop. Deliver.”
     </div>
   )
 }
 
 export default page
 
