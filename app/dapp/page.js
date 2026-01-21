"use client"
import {useState,useEffect} from "react";
import {ethers, parseEther} from "ethers";
export default function Home(){
    const [isConnected,setIsConnected]= useState(false);
    const [provider,setProvider]=useState(null);
    const [signer,setSigner]=useState(null);
    const [userAddress,setUserAddress]= useState(null);
    const [contract,setContract]=useState(null);
    const [depositValue,setDepositValue]= useState("");

    const  contractAddress="0xdD90A6825ac3611555be114a06CDB3c15C884109";
    
    const abi=[
         {
            "type": "constructor",
            "inputs": [],   
            "stateMutability": "payable"
        },
        {
            "type": "receive",
            "stateMutability": "payable"
        },
        {
            "type": "function",
            "name": "MAX_INTEREST_PERCENT",
            "inputs": [],
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
            "name": "MAX_TIME",
            "inputs": [],
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
            "name": "calculateInterestRate",
            "inputs": [
                {
                    "name": "user",
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
            "name": "fund",
            "inputs": [],
            "outputs": [],
            "stateMutability": "payable"
        },
        {
            "type": "function",
            "name": "getAddressToAmountFunded",
            "inputs": [
                {
                    "name": "funder",
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
            "name": "getFunders",
            "inputs": [
                {
                    "name": "index",
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
            "type": "function",
            "name": "rate",
            "inputs": [],
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
            "name": "s_funders",
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
            "type": "function",
            "name": "seedVault",
            "inputs": [],
            "outputs": [],
            "stateMutability": "payable"
        },
        {
            "type": "function",
            "name": "withdraw",
            "inputs": [],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "event",
            "name": "funding",
            "inputs": [
                {
                    "name": "user",
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
            "name": "Vault__CannotWithdraw",
            "inputs": []
        },
        {
            "type": "error",
            "name": "Vault__NotEnoughEthSent",
            "inputs": []
        },
        {
            "type": "error",
            "name": "Vault__VaultInsolvent",
            "inputs": []
        },
        {
            "type": "error",
            "name": "Vault__WithdrawFailure",
            "inputs": []
        }
    ];
   
   useEffect(()=> {
        if(typeof window!== "undefined" && window.ethereum){
         const prov = new ethers.BrowserProvider(window.ethereum);
         setProvider(prov);
        }
    
    },[]);
    
   
    
   async function connect(){
       if(!provider){
            alert("INSTALL METAMASK");
            return;
        }
        try{

            const accounts =await window.ethereum.request({method:"eth_requestAccounts"});
             setUserAddress(accounts[0]);
             const network= await provider.getNetwork();
             if(network.chainId!== 11155111n){
                alert("SWITCH TO SEPOLIA");
                return;
             }
            const signerObj= await provider.getSigner();
            setSigner(signerObj);
            const contractObj= new ethers.Contract(contractAddress,abi,signerObj);
            setContract(contractObj);
            setIsConnected(true);
        }catch(e)
        {
            console.log(e);
        }
        }
     
         async function deposit(){
            if(!contract){
                alert("CONNECT METAMASK");
                return;
            }
            const amount=depositValue;
            if(!amount || Number(amount) <=0 ){
                alert("SEND MORE ETH");
                return;
            }
            let Amount;
            try{
                Amount=ethers.parseEther(amount);
                const transxn= await contract.fund({value:Amount});
                await transxn.wait();
                alert(`Deposit Successful:${amount} ETH`);
                setDepositValue("")
            
            }catch(e)
            {
                console.log(e);
            }
            

        }
       async function getUserBalance(){
    
        if(!contract || !userAddress){
            alert("CONNECT FIRST");
            return;
        }
        try{
        const principalinWei= await contract.getAddressToAmountFunded(userAddress);
        const interestinWei = await contract.calculateInterestRate(userAddress);
        
        const totalinWei= principalinWei+interestinWei;
        const eth=ethers.formatEther(totalinWei);
        return Number(eth).toFixed(8);
        }catch(e)
        {
            console.log(e);
        }
       }

       
       async function Withdraw(){
        if(!contract || !userAddress){
            alert("CONNECT FIRST");
            return;
        }
        try{
            const transaction = await contract.withdraw();
            await transaction.wait();
            alert("SUCCESS");
        }catch(e)
        {
            console.log(e);
        }
       
    }
       



    return (
  <div
    style={{
      minHeight: "90vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "pink",
    }}
  >
    <div
      className="CART"
      style={{
        width: "620px",
        height: "600px",
        backdropFilter: "blur(12px)",
        borderRadius: "30px",
        padding: "25px",
        color: "white",
        boxShadow: "0 15px 40px black",
        textAlign: "center",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1667984510054-d4562f93621d?q=80&w=1332&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <button onClick={connect}>
        {isConnected ? "Connected" : "Connect Wallet"}
      </button>

      <br />

      <input
        type="number"
        placeholder="Enter Amount in ETH"
        value={depositValue}
        onChange={(e) => setDepositValue(e.target.value)}
        style={{ margin: "10px 0", padding: "5px", fontSize:"25px"}}
      />

      <br />

      <button onClick={deposit}>Deposit</button>
      <br/>
      <br/>
      <br/>


      <button onClick={Withdraw} style={{ marginLeft: "10px", color:""}}>
        Withdraw
      </button>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={async () => {
            const balance = await getUserBalance();
            alert(`Total Balance (Principal + Interest): ${balance} ETH`);
          }}
        >
          Show Balance
        </button>
      </div>
    </div>
  </div>
);


    }


