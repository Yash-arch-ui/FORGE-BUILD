//SPDX-License-Identifier:MIT

 pragma solidity ^0.8.18;

contract SimpleStorage{
    uint256 myNumber;

   struct Person{   
       string name;
       uint256 Number;
    }
   function set(uint256 _number) public virtual{
       myNumber=_number;
    
    }
     
      function get() public view returns(uint256){
     return myNumber;
     }
    
}
// DEPLOYED LOCALLY IN ANVIL BLOCKCHAIN...
//Deployer: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
//Deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
//Transaction hash: 0xff75ddda06d1e1e586d1be14a995d361ff03e9cf2ead40b5ff2c945e213a3f7f
