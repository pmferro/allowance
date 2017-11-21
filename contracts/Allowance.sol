pragma solidity ^0.4.0;

contract Allowance {

    address public owner;
    address public beneficiary;

    function Allowance(address _beneficiary) public payable {
        owner = msg.sender;
        beneficiary = _beneficiary;
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
    
    function addFunds(uint _amount) onlyOwner payable public returns (bool) {
        
        return true;
    }

    function freeze() onlyOwner public {

    }

    function kill() onlyOwner public {

    }

    function withdrawOwner(uint _amount) public {
        owner.transfer(_amount);
    }

    function withdrawBeneficiary() public {
        uint amount = 1000;
        // Remember to zero the pending refund before
        // sending to prevent re-entrancy attacks
        owner.transfer(amount);
    }

    function testContract() public pure returns (string) {
        return "Method call test ok";
    }

}