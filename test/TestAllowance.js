var Allowance = artifacts.require("./Allowance.sol");
var ether = 1000000000000000000;
var shannon = 1000000000;

contract('Allowance', accounts => {
  let allowance = {};
  const ownerAddress = accounts[0];
  const beneficiaryAddress = accounts[1];

  beforeEach(async() => {
    allowance = await Allowance.deployed();
  })

  it('Test Initial Contract Balance', async() => {
    let expectedBalance = 0.99 * ether;
    const contractBalance = await allowance.getBalance({from: ownerAddress});
    assert.equal(contractBalance, expectedBalance);
  })

  it('Test Add Funds', async() => {
    let fundsToAdd = 1 * ether;
    const contractPreviousBalance = await allowance.getBalance({from: ownerAddress});
    await allowance.addFunds({from: ownerAddress, value: fundsToAdd});
    const contractNewBalance = await allowance.getBalance({from: ownerAddress});
    assert.equal(contractNewBalance, contractPreviousBalance.toNumber() + fundsToAdd);
  }) 

  it('Test UnFreeze Withdrawals', async() => {
    await allowance.unFreeze({from: ownerAddress});
    const withdrawnIsFrozen = await allowance.getWithdrawnIsFrozenStatus({from: ownerAddress});
    //console.log("withdrawnIsFrozen:", withdrawnIsFrozen);
    assert.equal(withdrawnIsFrozen, false);
  }) 

  it('Test WithdrawBeneficiary', async() => {
    //const beneficiaryAddress = ""
    const beneficiaryPreviousBalance = web3.eth.getBalance(accounts[1])
    const promiseResponse = await allowance.withdrawBeneficiary({from: beneficiaryAddress});
    const gasUsed = promiseResponse.receipt.gasUsed;
    const beneficiaryNewBalance = web3.eth.getBalance(accounts[1]);
    const expectedBalance = beneficiaryPreviousBalance.toNumber() + (0.01 * ether) - (gasUsed * 100 * shannon);
    /*
    console.log("gasUsed:", gasUsed*100000000000);
    console.log("beneficiaryPreviousBalance", beneficiaryPreviousBalance.toNumber());
    console.log("beneficiaryNewBalance",beneficiaryNewBalance.toNumber());
    console.log("expectedBalance", expectedBalance);
    console.log("Diferencia:", expectedBalance - beneficiaryNewBalance.toNumber());
    */
    assert.equal(beneficiaryNewBalance.toNumber(), expectedBalance);
  });

  it('Test Freeze Withdrawals', async() => {
    await allowance.freeze({from: ownerAddress});
    const withdrawnIsFrozen = await allowance.getWithdrawnIsFrozenStatus({from: ownerAddress});
    //console.log("withdrawnIsFrozen:", withdrawnIsFrozen);
    assert.equal(withdrawnIsFrozen, true);
  }) 

  it('Test WithdrawOwner', async() => {
    const ownerPreviousBalance = web3.eth.getBalance(accounts[0])
    const promiseResponse = await allowance.withdrawOwner(0.02 * ether, {from: ownerAddress});
    const gasUsed = promiseResponse.receipt.gasUsed;
    const ownerNewBalance = web3.eth.getBalance(accounts[0]);
    const expectedBalance = ownerPreviousBalance.toNumber() + (0.02 * ether) - (gasUsed * 100 * shannon);
    assert.equal(ownerNewBalance.toNumber(), expectedBalance);
  });

  it('Test WithdrawOwnerAll', async() => {
    const ownerPreviousBalance = web3.eth.getBalance(accounts[0])
    const contractBalance = await allowance.getBalance({from: ownerAddress});
    const promiseResponse = await allowance.withdrawOwnerAll({from: ownerAddress});
    const gasUsed = promiseResponse.receipt.gasUsed;
    const ownerNewBalance = web3.eth.getBalance(accounts[0]);
    const expectedBalance = ownerPreviousBalance.toNumber() + contractBalance.toNumber() - (gasUsed * 100 * shannon);
    assert.equal(ownerNewBalance.toNumber(), expectedBalance);
  }); 

  it('Test Get Beneficiary Address', async() => {
    const beneficiaryAddressTest = await allowance.getBeneficiary({from: beneficiaryAddress});
    assert.equal(beneficiaryAddressTest, beneficiaryAddress);
  })

  it('Test Get Owner Address', async() => {
    const ownerAddressTest = await allowance.getOwner({from: ownerAddress});
    assert.equal(ownerAddressTest, ownerAddress);
  })

  it('Test Update Beneficiary Address', async() => {
    await allowance.updateBeneficiary(accounts[2], {from: ownerAddress});
    const newBeneficiaryAddress = await allowance.getBeneficiary({from: accounts[2]});    
    assert.equal(newBeneficiaryAddress, accounts[2]);
  })

  it('Test Kill Contract', async() => {
    const ownerPreviousBalance = web3.eth.getBalance(accounts[0])
    const contractBalance = await allowance.getBalance({from: ownerAddress});
    const promiseResponse = await allowance.kill({from: ownerAddress});
    const gasUsed = promiseResponse.receipt.gasUsed;
    const ownerNewBalance = web3.eth.getBalance(accounts[0]);
    const expectedBalance = ownerPreviousBalance.toNumber() + contractBalance.toNumber() - (gasUsed * 100 * shannon);
    assert.equal(ownerNewBalance.toNumber(), expectedBalance);
  })

})
