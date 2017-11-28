pragma solidity ^0.4.0;

contract Allowance {

    address private owner;
    address private beneficiary;
    uint private contractStartDate;
    uint private contractLastWithdrawal;
    uint constant public MAX_WITHDRAWAL_AMOUNT = 1 ether / 100; // 0.01 ETH
    uint constant public MIN_WITHDRAWAL_FREQUENCY = 1 days; // 7 dias
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

    modifier onlyOwnerOrBeneficiary(){
        require(msg.sender == beneficiary || msg.sender == owner);
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
        uint remainingBalance = getBalance();
        owner.transfer(remainingBalance);
        FundsWithdrawn(owner, remainingBalance);
    }

    function withdrawBeneficiary() onlyOwnerOrBeneficiary freezeWithdrawBeneficiary public {
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

    function getOwner() public view returns(address) {
        return owner;
    } 

    function setLastWithdrawalDate() private {
        contractLastWithdrawal = now;
    }

    function getLastWithdrawalDate() public view returns(uint) {
        return contractLastWithdrawal;
    } 

    function getWithdrawnIsFrozenStatus() public view returns (bool) {
        return withdrawnIsFrozen;
    }

    function() public onlyOwner payable {
        this.addFunds();
    }

}