import React, { Component } from 'react'
import AllowanceContract from '../build/contracts/Allowance.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

import WithdrawFromContract from './utils/WithdrawFromContract'

var ether = 1000000000000000000;

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      contractAddress: "",
      contractBalance: 0,
      ownerBalance: 0,
      beneficiaryBalance: 0,
      addFundsValue: 0,
      lastWithdrawalDate: null,
      ownerAddress: "",
      message: "",
      role: "",
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  async instantiateContract() {

    try {
      let contract = require('truffle-contract')
      let allowance = contract(AllowanceContract)
      allowance.setProvider(this.state.web3.currentProvider)
  
      let accounts = await this.state.web3.eth.getAccounts();
      let allowanceInstance = await allowance.deployed();

      let loggedAccount = await window.web3.eth.defaultAccount;
      let beneficiaryAccount = await allowanceInstance.getBeneficiary();
      let ownerAccount = await allowanceInstance.getOwner();

      //console.log(typeof loggedAccount, typeof ownerAccount, typeof beneficiaryAccount)
      //console.log("logged",loggedAccount)
      //console.log("owner", ownerAccount)
      //console.log("beneficiario", beneficiaryAccount)

      if (loggedAccount.toLowerCase() === ownerAccount.toLowerCase()) {
        this.setState({ message: "Rol Owner con Account: " + loggedAccount});
        this.setState({ role: "owner"});
      } else {
        if (loggedAccount.toLowerCase() === beneficiaryAccount.toLowerCase()) {
          this.setState({ message: "Rol Beneficiario con Address: " + loggedAccount })
          this.setState({ role: "beneficiary"});
        } else {
          this.setState({ message: "Ud debe ser Owner o Beneficiario. ---- Address logged:" + loggedAccount})
        }
      }

      let beneficiaryBalance = await this.state.web3.eth.getBalance(beneficiaryAccount)
      console.log("Beneficiary Balance:",beneficiaryBalance/ether)

      let ownerBalance = await this.state.web3.eth.getBalance(ownerAccount)
      console.log("Owner Balance:",ownerBalance/ether)

      let contractBalance = await this.state.web3.eth.getBalance(allowanceInstance.address)
      console.log("Contract Balance:", contractBalance/ether)


      let contractBalanceValue = await allowanceInstance.getBalance.call({from: accounts[0]});
      let lastWithdrawalDateValue = await allowanceInstance.getLastWithdrawalDate();

      this.setState({ contractAddress: allowanceInstance.address});
      this.setState({ ownerAddress: ownerAccount});
      this.setState({ ownerBalance: ownerBalance/ether});
      this.setState({ beneficiaryAddress: beneficiaryAccount});
      this.setState({ beneficiaryBalance: beneficiaryBalance/ether});
      this.setState({ lastWithdrawalDate: lastWithdrawalDateValue.c[0]});
      this.setState({ contractBalance: contractBalance/ether});
    

      } catch (e){
    }
  }

  async onContractWithdrawalBeneficiaryRequest() {

    try {
      let contract = require('truffle-contract')
      let allowance = contract(AllowanceContract)
      allowance.setProvider(this.state.web3.currentProvider)
  
      //let accounts = await this.state.web3.eth.getAccounts();
      let allowanceInstance = await allowance.deployed();
      //let contractBalanceValue = await allowanceInstance.getBalance.call({from: accounts[0]});
      //let lastWithdrawalDateValue = await allowanceInstance.getLastWithdrawalDate();
      let beneficiary = await allowanceInstance.getBeneficiary();

      let WithdrawBeneficiaryPromise = await allowanceInstance.withdrawBeneficiary({from: beneficiary});
      console.log(WithdrawBeneficiaryPromise);
      } catch (e){
    }
  }

  async onWithdrawAllFundsRequest() {
    
        try {
          let contract = require('truffle-contract')
          let allowance = contract(AllowanceContract)
          allowance.setProvider(this.state.web3.currentProvider)
          let allowanceInstance = await allowance.deployed();
          let owner = await allowanceInstance.getOwner();
          let WithdrawAllFundsPromise = await allowanceInstance.withdrawOwnerAll({from: owner});
          console.log(WithdrawAllFundsPromise);
          } catch (e){
        }
      }


  async onAddFundsRequest(_addFundsValue) {

    let addFundsValue = _addFundsValue * ether

    try {
      let contract = require('truffle-contract')
      let allowance = contract(AllowanceContract)
      allowance.setProvider(this.state.web3.currentProvider)

      //let accounts = await this.state.web3.eth.getAccounts();
      let allowanceInstance = await allowance.deployed();
      //let contractBalanceValue = await allowanceInstance.getBalance.call({from: accounts[0]});
      //let lastWithdrawalDateValue = await allowanceInstance.getLastWithdrawalDate();
      //let beneficiary = await allowanceInstance.getBeneficiary();
      let owner = await allowanceInstance.getOwner();
    

      let addFundsPromise = await allowanceInstance.addFunds({from: owner, value: addFundsValue });
      console.log(addFundsPromise);

      } catch (e){
    }

  }



  render() {

    var messageText = <div>{this.state.message} - {this.state.role}</div>
    
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Allowance - DEMO</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Welcome!</h1>
              {messageText}
              <h2>Allowance Smart Contract Example</h2>
              <p>Contract Address: {this.state.contractAddress}</p>
              <p>Owner Address is: {this.state.ownerAddress}</p>
              <p>Owner Balance is: {this.state.ownerBalance} eth</p>
              <p>Beneficiary Address is: {this.state.beneficiaryAddress}</p>
              <p>Beneficiary Balance is: {this.state.beneficiaryBalance} eth</p>
              <p>lastWithdrawalDate: {this.state.lastWithdrawalDate}</p>
              <p>Contract Balance is: {this.state.contractBalance} eth</p>
              <hr/>
              <div id="navbar">
              <WithdrawFromContract 
                onAddFundsRequest={this.onAddFundsRequest.bind(this)} 
                onWithdrawAllFundsRequest={this.onWithdrawAllFundsRequest.bind(this)} 
                onContractWithdrawalBeneficiaryRequest={this.onContractWithdrawalBeneficiaryRequest.bind(this)} 
                role={this.state.role}
                />
                </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
