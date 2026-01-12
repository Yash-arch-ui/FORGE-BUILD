import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.8.1/dist/ethers.min.js";

const abi =  [
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
     ]
const address = "0xfE9Fea8d9d8AE7166511D1F8dB005E7A066AEe35";

let provider;
let signer;
let Ledger;

async function connect() {
  if (!window.ethereum) {
    alert("INSTALL METAMASK");
    return;
  }
  await window.ethereum.request({ method: "eth_requestAccounts" });
  provider = new ethers.BrowserProvider(window.ethereum);
  const network= await provider.getNetwork();
  if(network.chainId !== 11155111n){
    alert("SWITCH TO SEPOLIA IN METAMASK");
    return;
  }
  signer = await provider.getSigner();
  Ledger = new ethers.Contract(address, abi, signer);
  listenEvents();
}

async function deposit() {
 await connect();
  const amount = document.getElementById("DEPOSITINGAMOUNT").value;
  if (!amount || Number(amount) <= 0) {
    alert("SEND MORE ETH");
    return;
  }
  let Amount;
  try {
    Amount = ethers.parseEther(amount);
  } catch {
    alert("INVALID AMOUNT");
    return;
  }
  const transaction = await Ledger.deposit({ value: Amount });
  await transaction.wait();

  alert(`Deposit successful: ${amount} ETH`);
}


async function balance() {
  await connect();
  const userAddress = await signer.getAddress(); /* provides that address of the connected wallet */
  const bal = await Ledger.getAddresstoAmountDeposited(userAddress);
  document.getElementById("balance").innerText =ethers.formatEther(bal);
}

function listenEvents() {
  if (!Ledger) return;
  Ledger.removeAllListeners("Deposit");

  Ledger.on("Deposit", (user, amount) => {
    console.log(
      "YOUR DEPOSIT IS CONFIRMED",user,ethers.formatEther(amount));
  });
}


window.connect = connect;
window.deposit = deposit;
window.balance= balance;

