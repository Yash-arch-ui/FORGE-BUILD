// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Ledger} from "../src/Ledger.sol";
import {Test} from "forge-std/Test.sol";
import {DeployLedger} from "../script/DeployLedger.s.sol";

contract LedgerTest is Test {
    address USER = makeAddr("user");
    Ledger ledger;

    uint256 constant STARTING_BALANCE = 10 ether;
    uint256 constant SEND_VALUE = 0.1 ether;

    function setUp() public {
        vm.deal(USER, STARTING_BALANCE);
        DeployLedger deployLedger = new DeployLedger();
        ledger = deployLedger.run();
    }

    function testNotEnoughEthSent() public {
        vm.prank(USER);
        vm.expectRevert(Ledger.Ledger__NotEnoughEthSent.selector);
        ledger.deposit();
    }

    function testAddsDepositsToArrayOfDepositers() public {
        vm.prank(USER);
        ledger.deposit{value: SEND_VALUE}();

        address funder = ledger.s_deposits(0);
        assertEq(funder, USER);
    }

    function testDepositUpdatesDepositedDataStructure() public {
        vm.prank(USER);
        ledger.deposit{value: SEND_VALUE}();

        uint256 amountDeposited = ledger.getAddresstoAmountDeposited(USER);

        assertEq(amountDeposited, SEND_VALUE);
    }
}

/*Ran 3 tests for test/LedgerTest.t.sol:LedgerTest
[PASS] testAddsDepositsToArrayOfDepositers() (gas: 87792)
[PASS] testDepositUpdatesDepositedDataStructure() (gas: 87561)
[PASS] testNotEnoughEthSent() (gas: 11044)
Suite result: ok. 3 passed; 0 failed; 0 skipped; finished in 22.91ms (8.89ms CPU time)

Ran 1 test suite in 368.57ms (22.91ms CPU time): 3 tests passed, 0 failed, 0 skipped (3 total tests)*/
