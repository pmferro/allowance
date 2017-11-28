import React, { Component } from 'react'
//import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import AllowanceContract from '../build/contracts/Allowance.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

import WithdrawFromContract from './utils/WithdrawFromContract'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      contractAddress: "",
      contractBalance: "",
      addFundsValue:0,
      lastWithdrawalDate: null,
      ownerAddress: "",
      message: "Vacio",
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
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

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
      console.log("Beneficiary Balance:",beneficiaryBalance/1000000000000000000)

      let ownerBalance = await this.state.web3.eth.getBalance(ownerAccount)
      console.log("Owner Balance:",ownerBalance/1000000000000000000)

      let contractBalance = await this.state.web3.eth.getBalance(allowanceInstance.address)
      console.log("Contract Balance:",contractBalance/1000000000000000000)


      let contractBalanceValue = await allowanceInstance.getBalance.call({from: accounts[0]});
      let lastWithdrawalDateValue = await allowanceInstance.getLastWithdrawalDate();
      /*
      console.log(lastWithdrawalDateValue)
      console.log(allowanceInstance)
      */
      this.setState({ contractAddress: allowanceInstance.address});
      this.setState({ ownerAddress: ownerAccount});
      this.setState({ beneficiaryAddress: beneficiaryAccount});
      this.setState({ lastWithdrawalDate: lastWithdrawalDateValue.c[0]});
      this.setState({ contractBalance: contractBalanceValue.c[0]});
    

      } catch (e){
    }
  }

  async onContractAddressAdded(_contractAddress) {
    this.setState({ contractAddress: _contractAddress});
  }
  
  async onAddFundsChange(_addFundsValue) {
    this.setState({ addFundsValue: _addFundsValue});
  }
  
  async onContractWithdrawalBeneficiaryRequest() {
    //this.setState({ contractAddress: _contractAddress});


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


  async onAddFundsRequest(_newValueAdded) {

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
      console.log(_newValueAdded);
      console.log(this.state.addFundsValue)
      let addFundsPromise = await allowanceInstance.addFunds({from: owner, value: _newValueAdded * 1000000000000000000});
      console.log(addFundsPromise);

      } catch (e){
    }


  }



  render() {

    var messageText = <div>{this.state.message} {this.state.role}</div>

    
    
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
              <p>Beneficiary Address is: {this.state.beneficiaryAddress}</p>
              <p>lastWithdrawalDate: {this.state.lastWithdrawalDate}</p>
              <p>Contract Balance is: {this.state.contractBalance}</p>
              <hr/>
              <div id="navbar">
              <WithdrawFromContract 
                onContractAddressAdded={this.onContractAddressAdded.bind(this)} 
                onAddFundsRequest={this.onAddFundsRequest.bind(this)} 
                onAddFundsChange={this.onAddFundsChange.bind(this)} 
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
