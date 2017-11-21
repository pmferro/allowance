pragma solidity ^0.4.0;

contract Allowance {

    address public owner;
    address public beneficiary;

    function Allowance(address _beneficiary) public payable {
        owner = msg.sender;
        beneficiary = _beneficiary;
    }
    
    function withdrawBeneficiary() public {
        uint amount = 1000;
        // Remember to zero the pending refund before
        // sending to prevent re-entrancy attacks
        owner.transfer(amount);
    }
}