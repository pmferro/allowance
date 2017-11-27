var Allowance = artifacts.require("./Allowance.sol");
var ether = 1000000000000000000;

contract('Allowance', accounts => {
  let allowance = {};
  const ownerAddress = accounts[0];
  const beneficiaryAddress = accounts[1];

  beforeEach(async() => {
    allowance = await Allowance.deployed();
  })

  it('Check Initial Contract Balance', async() => {
    let expectedBalance = 0.99 * ether;
    const contractBalance = await allowance.getBalance({from: ownerAddress});
    assert.equal(contractBalance, expectedBalance);
  })

  it('Check Add Funds', async() => {
    let fundsToAdd = 1 * ether;
    const contractPreviousBalance = await allowance.getBalance({from: ownerAddress});
    await allowance.addFunds({from: ownerAddress, value: fundsToAdd});
    const contractNewBalance = await allowance.getBalance({from: ownerAddress});
    assert.equal(contractNewBalance, contractPreviousBalance.toNumber() + fundsToAdd);
  }) 

})
