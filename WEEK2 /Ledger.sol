//SPDX-License-Identifier:MIT
pragma solidity ^0.8.18;
contract Ledger{
    mapping(address => uint256) private  s_addressToAmountDeposited;
    address[] public s_deposits;
    error Ledger__NotEnoughEthSent();
    event Deposit(address  indexed USER,uint256 amount);
    function deposit() public payable{
           if( (msg.value) == 0)
        revert Ledger__NotEnoughEthSent();
        s_addressToAmountDeposited[msg.sender]=s_addressToAmountDeposited[msg.sender]+ msg.value;
        s_deposits.push(msg.sender);
        emit Deposit(msg.sender,msg.value);
    }
    function getAddresstoAmountDeposited(address depositingaddress) external view returns (uint256){
   return s_addressToAmountDeposited[depositingaddress];
    }
}
