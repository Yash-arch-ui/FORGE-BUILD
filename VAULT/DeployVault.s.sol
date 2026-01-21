//SPDX-License-Identifier:MIT
pragma solidity ^0.8.18;
import {Script} from "forge-std/Script.sol";
import {Vault} from "../src/Vault.sol";
contract DeployVault is Script{
    function run() external returns(Vault){
        vm.startBroadcast();
        Vault vault= new Vault{value: 0.000005 ether}();
        vm.stopBroadcast();
        return vault;
    }

}
