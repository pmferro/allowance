pragma solidity ^0.4.0;

contract Allowance {

    address public owner;
    address public beneficiary;
    uint private contractStartDate;
    uint private contractLastWithdrawal;
    uint constant private MAX_WITHDRAWAL_AMOUNT = 100000000000000000; // 0.1 ETH
    uint constant private MIN_WITHDRAWAL_FREQUENCY = 7*60*60*24; // 7 dias


    event FundsAdded(uint _amount);
    event BeneficiaryUpdated(address _beneficiary);
    event FundsWithdrawn(uint _amount);

    function Allowance(address _beneficiary) public payable {
        owner = msg.sender;
        beneficiary = _beneficiary;
        contractStartDate = now;
        //contractLastWithdrawal = now;
        beneficiary.transfer(MAX_WITHDRAWAL_AMOUNT);
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
        FundsAdded(msg.value);   
        return true;
    }

    //TO-DO
    function freeze() onlyOwner view public {}

    //TO-DO
    function kill() onlyOwner view public {}

    function getBalance() onlyOwner public view returns (uint) {
        return this.balance;
    }

    function withdrawOwner(uint _amount) onlyOwner public {
        var amount = _amount;
        if (amount <= getBalance()) {
            owner.transfer(_amount);
        }
    }

    function withdrawOwnerAll() onlyOwner public {
        owner.transfer(getBalance());
    }

    function withdrawBeneficiary() onlyBeneficiary public {
        // Remember to zero the pending refund before
        // sending to prevent re-entrancy attacks
        require(now - contractLastWithdrawal > 60);
        //if (now - contractLastWithdrawal > 60) {
        setLastWithdrawalDate();
        beneficiary.transfer(MAX_WITHDRAWAL_AMOUNT);
        FundsWithdrawn(MAX_WITHDRAWAL_AMOUNT);
        //}
    }

    function updateBeneficiary(address _beneficiary) onlyOwner public {
        beneficiary = _beneficiary;
        BeneficiaryUpdated(beneficiary);
    }

    function setLastWithdrawalDate() private {
        contractLastWithdrawal = now;
    }

    function getLastWithdrawalDate() public view returns(uint) {
        return contractLastWithdrawal;
    } 

    function testContractConnection() public pure returns (string) {
        return "Contract connection OK";
    }

    function() public onlyOwner payable {
        this.addFunds();
    }

}