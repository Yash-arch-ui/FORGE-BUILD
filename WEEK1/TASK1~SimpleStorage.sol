//SPDX-License-Identifier:MIT

 pragma solidity ^0.8.18;

contract SimpleStorage{
    uint256 myNumber;
   function set(uint256 _number) public  {
       myNumber=_number;
    
    }
    function get() public view returns(uint256){
     return myNumber;
     }
    
}
// DEPLOYED AT SEPOLIA
/*
Deployer: 0x3884d7c9bA39C00CE28b5F8bD26102Cd057fB9E4
Deployed to: 0xcBb4B9548dcaDBB1192efc3Da88DE5c0Ebb64b09
Transaction hash: 0x9083ca2ee94f4bd9518ae9191fe52ffb0967f391c3ff1effad8a4549522ff574
*/

