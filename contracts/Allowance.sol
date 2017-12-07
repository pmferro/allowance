pragma solidity ^0.4.0;

contract Allowance {

    struct AccountsData {
        address owner;
        address[] beneficiaries;
        mapping (address => SubAccountsData) subaccounts;
        uint balance;
    }

    struct SubAccountsData {
        address parent;
        address beneficiary;
        uint startDate;
        uint lastWithdrawalDate;
        uint maxWithdrawalAmount;
        uint withdrawalFrequency;
        bool withdrawalIsFronzen;
    }

    mapping (address => AccountsData) public accounts;


    event FundsAdded(address _owner, uint _amount);
    event BeneficiaryUpdated(address _beneficiary);
    event FundsWithdrawn(address _owner, address _beneficiary, uint _amount);
    event WithdrawIsFrozen(bool _frozen, uint _date);

    function Allowance() public {

    }

    function addAccount(address _beneficiary) public payable {
        require(msg.value > ((1 ether / 100) + 60000 wei));
        accounts[msg.sender].owner = msg.sender;
        AccountsData storage acc = accounts[msg.sender];
        uint i = 0;
        for (i = 0; i < (acc.beneficiaries.length - 1); i++) {
            require(acc.beneficiaries[i] != _beneficiary);
            // Subaccount already exists
        }
        acc.beneficiaries.push(_beneficiary);
        acc.balance = msg.value;

        // Create SubAccount
        SubAccountsData storage sub = acc.subaccounts[_beneficiary];
        sub.parent = acc.owner;
        sub.startDate = now;
        sub.maxWithdrawalAmount = 1 ether / 100;

        // Initial Transfer
        acc.balance -= sub.maxWithdrawalAmount;
        sub.beneficiary.transfer(sub.maxWithdrawalAmount);
    }

    modifier onlyOwner() { // Modifier
        require(accounts[msg.sender].owner == msg.sender);
        _;
    } 

    modifier onlyOwnerOrBeneficiary(address _owner) { // Modifier
        require(accounts[msg.sender].owner == msg.sender || accounts[_owner].subaccounts[msg.sender].beneficiary == msg.sender);
        _;
    } 

    function addFunds() payable public onlyOwner returns (bool) {  
        accounts[msg.sender].balance += msg.value;
        FundsAdded(msg.sender, msg.value);   
        return true;
    }

    function freeze(address _beneficiary) onlyOwner public {
        accounts[msg.sender].subaccounts[_beneficiary].withdrawalIsFronzen = true;
        WithdrawIsFrozen(true, now);
    }

    function unFreeze(address _beneficiary) onlyOwner public {
        accounts[msg.sender].subaccounts[_beneficiary].withdrawalIsFronzen = false;
        WithdrawIsFrozen(false, now);
    }   

    function getBalance() public view onlyOwner returns (uint) {
        return accounts[msg.sender].balance;
    }

    function withdrawOwner(uint _amount) onlyOwner public {
        if (_amount <= accounts[msg.sender].balance) {
            accounts[msg.sender].balance -= _amount;
            accounts[msg.sender].owner.transfer(_amount);
        }
    }

    function withdrawOwnerAll() onlyOwner public {
        uint remainingBalance = getBalance();
        accounts[msg.sender].owner.transfer(remainingBalance);
        FundsWithdrawn(msg.sender, msg.sender, remainingBalance);
    }

    function withdrawBeneficiary(address _owner, address _beneficiary) onlyOwnerOrBeneficiary(msg.sender) public {
        // Remember to zero the pending refund before
        // sending to prevent re-entrancy attacks
        require(now - accounts[_owner].subaccounts[msg.sender].lastWithdrawalDate > 60);
        //if (now - contractLastWithdrawal > 60) {
        setLastWithdrawalDate(_owner);
        accounts[_owner].balance -= accounts[_owner].subaccounts[_beneficiary].maxWithdrawalAmount;
        accounts[_owner].subaccounts[_beneficiary].beneficiary.transfer(accounts[_owner].subaccounts[_beneficiary].maxWithdrawalAmount);
        FundsWithdrawn(accounts[_owner].owner, accounts[_owner].subaccounts[_beneficiary].beneficiary, accounts[_owner].subaccounts[_beneficiary].maxWithdrawalAmount);
        //}
    }

/*
    function updateBeneficiary(address _owner, address _beneficiary) public {
        require(accounts[_owner].owner == _owner);
        require(accounts[_owner].owner == msg.sender);
        accounts[_owner].beneficiary = _beneficiary;
        BeneficiaryUpdated(accounts[_owner].beneficiary);
    }
*/

    function getBeneficiaries(address _owner) public view returns(address[]) {
        return accounts[_owner].beneficiaries;
    } 

    function getOwner(address _owner) public view returns(address) {
        return  accounts[_owner].owner;
    } 

    function setLastWithdrawalDate(address _owner) private {
        accounts[_owner].subaccounts[msg.sender].lastWithdrawalDate = now;
    }

    function getLastWithdrawalDate(address _owner) public view returns(uint) {
        return accounts[_owner].subaccounts[msg.sender].lastWithdrawalDate;
    } 

    function getWithdrawnIsFrozenStatus(address _owner) public view returns (bool) {
        return accounts[_owner].subaccounts[msg.sender].withdrawalIsFronzen;
    }

    function() public payable {
        this.addFunds();
    }

}
