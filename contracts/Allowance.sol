pragma solidity ^0.4.0;

contract Allowance {

    struct AllowanceData {
        address owner;
        address beneficiary;
        uint startDate;
        uint lastWithdrawalDate;
        uint maxWithdrawalAmount;
        uint withdrawalFrequency;
        bool withdrawalIsFronzen;
        uint balance;
      }

    mapping (address => AllowanceData) public accounts;

    event FundsAdded(uint _amount);
    event BeneficiaryUpdated(address _beneficiary);
    event FundsWithdrawn(address _address, uint _amount);
    event WithdrawIsFrozen(bool _frozen, uint _date);

    function Allowance(address _beneficiary) public payable {
        require(msg.value > ((1 ether / 100) + 60000 wei));
        accounts[msg.sender].owner = msg.sender;
        accounts[msg.sender].beneficiary = _beneficiary;
        accounts[msg.sender].startDate = now;
        accounts[msg.sender].balance = msg.value;
        accounts[msg.sender].maxWithdrawalAmount = 1 ether / 100;
        accounts[msg.sender].beneficiary.transfer(accounts[msg.sender].maxWithdrawalAmount);
    }

    function addAllowance(address _beneficiary) public payable {
        require(msg.value > ((1 ether / 100) + 60000 wei));
        accounts[msg.sender].owner = msg.sender;
        accounts[msg.sender].beneficiary = _beneficiary;
        accounts[msg.sender].startDate = now;
        accounts[msg.sender].balance = msg.value;
        accounts[msg.sender].maxWithdrawalAmount = 1 ether / 100;
        accounts[msg.sender].beneficiary.transfer(accounts[msg.sender].maxWithdrawalAmount);
    }

    function addFunds(address _owner) payable public returns (bool) {  
        require(accounts[_owner].owner == _owner);
        require(accounts[_owner].owner == msg.sender);
        accounts[_owner].balance += msg.value;
        FundsAdded(msg.value);   
        return true;
    }

    function freeze(address _owner) public {
        require(accounts[_owner].owner == _owner);
        require(accounts[_owner].owner == msg.sender);
        accounts[_owner].withdrawalIsFronzen = true;
        WithdrawIsFrozen(true, now);
    }

    function unFreeze(address _owner) public {
        require(accounts[_owner].owner == _owner);
        require(accounts[_owner].owner == msg.sender);
        accounts[_owner].withdrawalIsFronzen = false;
        WithdrawIsFrozen(false, now);
    }   

    function getBalance(address _owner) public view returns (uint) {
        require(accounts[_owner].owner == _owner);
        require(accounts[_owner].owner == msg.sender);
        return accounts[_owner].balance;
    }

    function withdrawOwner(address _owner, uint _amount) public {
        require(accounts[_owner].owner == _owner);
        require(accounts[_owner].owner == msg.sender);
        if (_amount <= accounts[_owner].balance) {
            accounts[_owner].balance -= _amount;
            accounts[_owner].owner.transfer(_amount);
        }
    }

    function withdrawOwnerAll(address _owner) public {
        require(accounts[_owner].owner == _owner);
        require(accounts[_owner].owner == msg.sender);
        uint remainingBalance = getBalance(_owner);
        accounts[_owner].owner.transfer(remainingBalance);
        FundsWithdrawn(_owner, remainingBalance);
    }

    function withdrawBeneficiary(address _owner) public {
        // Remember to zero the pending refund before
        // sending to prevent re-entrancy attacks
        require(accounts[_owner].owner == _owner);
        require(accounts[_owner].beneficiary == msg.sender);
        require(now - accounts[_owner].lastWithdrawalDate > 60);
        //if (now - contractLastWithdrawal > 60) {
        setLastWithdrawalDate(_owner);
        accounts[_owner].balance -= accounts[_owner].maxWithdrawalAmount;
        accounts[_owner].beneficiary.transfer(accounts[_owner].maxWithdrawalAmount);
        FundsWithdrawn(accounts[_owner].beneficiary, accounts[_owner].maxWithdrawalAmount);
        //}
    }

    function updateBeneficiary(address _owner, address _beneficiary) public {
        require(accounts[_owner].owner == _owner);
        require(accounts[_owner].owner == msg.sender);
        accounts[_owner].beneficiary = _beneficiary;
        BeneficiaryUpdated(accounts[_owner].beneficiary);
    }

    function getBeneficiary(address _owner) public view returns(address) {
        return accounts[_owner].beneficiary;
    } 

    function getOwner(address _owner) public view returns(address) {
        return  accounts[_owner].owner;
    } 

    function setLastWithdrawalDate(address _owner) private {
        accounts[_owner].lastWithdrawalDate = now;
    }

    function getLastWithdrawalDate(address _owner) public view returns(uint) {
        return accounts[_owner].lastWithdrawalDate;
    } 

    function getWithdrawnIsFrozenStatus(address _owner) public view returns (bool) {
        return accounts[_owner].withdrawalIsFronzen;
    }

    function() public payable {
        this.addFunds(msg.sender);
    }

}