//SPDX-License-Identifier:MIT
pragma solidity ^0.8.18;
contract Ledger{
    mapping(address => uint256) private  s_deposits;
    error Ledger__NotEnoughEthSent();
    event Deposit(address  indexed USER,uint256 amount);
    function deposit() public payable{
           if( (msg.value)<= 0)
        revert Ledger__NotEnoughEthSent();
        s_deposits[msg.sender]=s_deposits[msg.sender]+ msg.value;
        emit Deposit(msg.sender,msg.value);
    }
}
