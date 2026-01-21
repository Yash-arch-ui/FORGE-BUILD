//SPDX-License-Identifer:MIT
pragma solidity ^0.8.18;
import {Test,console} from "forge-std/Test.sol";

import {Vault} from "../src/Vault.sol";
import {DeployVault} from "../script/DeployVault.s.sol";

contract VaultTest is Test{

address USER= makeAddr("user");
Vault vault;
uint256 constant SEND_VALUE=1 ether;
uint256 constant STARTING_BALANCE=10 ether;
uint256 constant GAS_PRICE=1;
function setUp() external {
vm.deal(USER,STARTING_BALANCE);
DeployVault deployVault =new DeployVault();
vault=deployVault.run();
 vm.deal(address(vault), 10 ether);

}


function testFundUpdates() public{
    vm.prank(USER);
    vault.fund{value:SEND_VALUE}();
    uint256 amountFunded=vault.getAddressToAmountFunded(USER);
    assertEq(amountFunded,SEND_VALUE);
}
function testAddsFundersToArrayOfFunders() public{
    vm.prank(USER);
    vault.fund{value:SEND_VALUE}();
    address funder= vault.getFunders(0);
    assertEq(funder,USER);
}
modifier funded(){
    vm.prank(USER);
    vault.fund{value:SEND_VALUE}();
    _;
}
 

function testInterestAfterTime() public funded{
    vm.warp(block.timestamp+1 days);
    vm.prank(USER);
    uint256 interest=vault.calculateInterestRate();
    console.log("Interest",interest);
    assertGe(interest,0);
}
function testWithdrawWithoutFunds() public{
    address NONFUNDER= makeAddr("nonFunder");
    vm.deal(NONFUNDER,5 ether);
    vm.prank(NONFUNDER);
    vm.expectRevert(Vault.Vault__CannotWithdraw.selector);
        vault.withdraw();


}
function testWithdrawSendsFunds() public funded{
    vm.warp(block.timestamp+1 days);
    uint256 beforeBalance=USER.balance;
    vm.prank(USER);
    vault.withdraw();
    uint256 afterBalance= USER.balance;
    assertGt(afterBalance,beforeBalance);
    uint256 fundedAmount=vault.getAddressToAmountFunded(USER);
    assertEq(fundedAmount,0);
}
function testMultipleUsersWithdraw()  public{
    address USER1=makeAddr("user1");
    vm.deal(USER1,STARTING_BALANCE);
    vm.prank(USER);
    vault.fund{value:SEND_VALUE}();

    vm.prank(USER1);
     vault.fund{value:SEND_VALUE}();

    vm.warp(block.timestamp + 1 days);

    vm.prank(USER);
    vault.withdraw();
    vm.prank(USER1);
    vault.withdraw();
    assertEq(vault.getAddressToAmountFunded(USER),0);
    assertEq(vault.getAddressToAmountFunded(USER1),0);
}

}
