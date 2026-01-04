//SPDX-License-Identifier:MIT

 pragma solidity ^0.8.18;

contract SimpleStorage{
    uint myNumber;

   struct Person{   
       string name;
       uint Number;
    }
   function set(uint _number) public virtual{
       myNumber=_number;
    
    }
     
      function get() public view returns(uint){
     return myNumber;
     }
    
}
// DEPLOYED LOCALLY IN ANVIL BLOCKCHAIN...
//Deployer: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
//Deployed to: 0x610178dA211FEF7D417bC0e6FeD39F05609AD788
//Transaction hash: 0x29783b9cb2cfa5cb19904a31fa4895c7e3f3ee91ef23ea95320a70b58062d0be
