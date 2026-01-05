import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.8.1/dist/ethers.min.js";
//OR
//  import {ethers} from "ethers"
const abi=[
        {
            "type": "function",
            "name": "get",
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
            "name": "set",
            "inputs": [
                {
                    "name": "_number",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        }
    ]
  const address="0xB3030DcCCcB270ae1422EcaA9edd57CD5911D665";   
    async function connect(){
       await window.ethereum.request({ method: "eth_requestAccounts"  }); 
    }
    async function set(){
      
       const provider=new ethers.BrowserProvider(window.ethereum);
       const signer= await provider.getSigner();
       const Contract= new ethers.Contract(address,abi,signer);
       const no=Number(document.getElementById("inputurFavNumber").value);
       const transactioninfo = await Contract.set(no);  
       console.log("Transaction Hash:", transactioninfo.hash);
      document.getElementById("txHash").innerText = transactioninfo.hash;

    }
    async function get(){
       const provider=new ethers.BrowserProvider(window.ethereum);
       const Contract= new ethers.Contract(address,abi,provider)
       const favoritenumber=await Contract.get();
       document.getElementById("output").innerText=favoritenumber.toString();

    }
