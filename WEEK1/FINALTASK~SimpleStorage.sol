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
