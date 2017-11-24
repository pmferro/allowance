pragma solidity ^0.4.0;

contract Allowance {

    address public owner;
    address public beneficiary;
    uint private contractStartDate;
    uint private contractLastWithdrawal;
    uint constant private MAX_WITHDRAWAL_AMOUNT = 1 ether / 10; // 0.1 ETH
    uint constant private MIN_WITHDRAWAL_FREQUENCY = 7 days; // 7 dias
    bool public withdrawnIsFrozen = false;


    event FundsAdded(uint _amount);
    event BeneficiaryUpdated(address _beneficiary);
    event FundsWithdrawn(address _address, uint _amount);
    event WithdrawIsFrozen(bool _frozen, uint _date);

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

    modifier freezeWithdrawBeneficiary(){
        require(withdrawnIsFrozen != true);
        _;
    }    
    
    function addFunds() onlyOwner payable public returns (bool) {  
        FundsAdded(msg.value);   
        return true;
    }

    function freeze() onlyOwner public {
        withdrawnIsFrozen = true;
        WithdrawIsFrozen(true, now);
    }

    function unFreeze() onlyOwner public {
        withdrawnIsFrozen = false;
        WithdrawIsFrozen(false, now);
    }    

    function kill() onlyOwner public {
        selfdestruct(owner);
    }

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
        FundsWithdrawn(owner, MAX_WITHDRAWAL_AMOUNT);
    }

    function withdrawBeneficiary() onlyBeneficiary freezeWithdrawBeneficiary public {
        // Remember to zero the pending refund before
        // sending to prevent re-entrancy attacks
        require(now - contractLastWithdrawal > 60);
        //if (now - contractLastWithdrawal > 60) {
        setLastWithdrawalDate();
        beneficiary.transfer(MAX_WITHDRAWAL_AMOUNT);
        FundsWithdrawn(beneficiary, MAX_WITHDRAWAL_AMOUNT);
        //}
    }

    function updateBeneficiary(address _beneficiary) onlyOwner public {
        beneficiary = _beneficiary;
        BeneficiaryUpdated(beneficiary);
    }

    function getBeneficiary() public view returns(address) {
        return beneficiary;
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