pragma solidity ^0.4.0;

contract Allowance {

    address public owner;
    address public beneficiary;
    bool public isAllowedToWithdraw;
    uint private contractStartDate;
    uint private contractLastWithdrawal;
    uint constant private MAX_WITHDRAWAL_AMOUNT = 100000000000000000; // 0.1 ETH
    uint constant private MIN_WITHDRAWAL_FREQUENCY = 7*60*60*24; // 7 dias

    function Allowance(address _beneficiary) public payable {
        owner = msg.sender;
        beneficiary = _beneficiary;
        contractStartDate = now;
        contractLastWithdrawal = now;
        isAllowedToWithdraw = true;
        //beneficiary.transfer(MAX_WITHDRAWAL_AMOUNT);
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    modifier onlyBeneficiary(){
        require(msg.sender == beneficiary);
        _;
    }    
    
    function addFunds() onlyOwner payable public returns (bool) {
        
        return true;
    }

    function freeze() onlyOwner view public {

    }

    function kill() onlyOwner view public {
        
    }

    function getBalance() onlyOwner public view returns (uint) {
        return this.balance;
    }

    function withdrawOwner(uint _amount) onlyOwner public {
        owner.transfer(_amount);
    }

    function withdrawOwner2(uint _amount) onlyOwner public payable {
        owner.transfer(_amount);
    }

    function withdrawBeneficiary() public payable {
        // Remember to zero the pending refund before
        // sending to prevent re-entrancy attacks
        if (isAllowedToWithdraw) {
            //this.transfer(MAX_WITHDRAWAL_AMOUNT);
            isAllowedToWithdraw = false;
        }
        
    }

    function setLastWithdrawalDate() private {
        contractLastWithdrawal = now;
    }

    function testContractConnection() public pure returns (string) {
        return "Contract connection OK deploy 12:19 PM";
    }

}