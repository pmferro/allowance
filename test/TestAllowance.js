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


})
