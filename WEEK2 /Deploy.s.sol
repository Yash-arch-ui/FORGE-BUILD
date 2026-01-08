// SPDX-License-Identifer:MIT
pragma solidity ^0.8.13;
import {Script} from "forge-std/Script.sol";
import {Ledger} from "../src/Ledger.sol";
contract DeployLedger is Script{
function run() external returns(Ledger){
vm.startBroadcast();
Ledger ledger= new Ledger();
vm.stopBroadcast();
return ledger();
}
}
