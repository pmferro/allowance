pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Allowance.sol";

contract TestAllowance {
    Allowance allowanceContract = Allowance(DeployedAddresses.Allowance());


  /*
    function testInitialBalanceUsingDeployedContract() public {
        uint initialBalance = 5 ether;
       // Assert.equal(allowanceContract.getBalance(), initialBalance, "The contract should have 5 eth when deployed.");  
        Assert.equal(5 ether,initialBalance, "The contract should have 5 eth when deployed.");  
    }


    // Testing the addfunds() function
    //function testAddFunds() {  
    //}
    
    
  
    // Testing the adopt() function
    function testUserCanAdoptPet() {
        uint returnedId = allowance.adopt(8);
        uint expected = 8;
        Assert.equal(returnedId, expected, "Allowance of pet ID 8 should be recorded.");
    }

  
    // Testing retrieval of a single pet's owner
    function testGetAdopterAddressByPetId() {
        // Expected owner in this contract
        address expected = this;
        address adopter = allowance.adopters(8);
        Assert.equal(adopter, expected, "Owner of pet ID 8 should be recoded.");
    }

    // Testing retrieval of all pet owners
    function testGetAdopterAddressByPetIdInArray() {
        // Expected owner is this contract
        address expected = this;
        // Store adopters in memory rather than contract's storage
        address[16] memory adopters = allowance.getAdopters();
        Assert.equal(adopters[8], expected, "Owner of pet ID 8 should be recorded.");
        
    }
    */

}

