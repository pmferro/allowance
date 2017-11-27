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
      lastWithdrawalDate: null,
      ownerAddress: "",
      message: "Vacio",
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
      let beneficiary = await allowanceInstance.getBeneficiary();
      let ownerAccount = await accounts[0];

      //console.log(typeof loggedAccount, typeof ownerAccount, typeof beneficiary)

      if (loggedAccount === ownerAccount) {
        this.setState({ message: "Rol Owner con Account: " + loggedAccount});
      } else {
        if (loggedAccount === beneficiary) {
          this.setState({ message: "Rol Beneficiario con Address: " + loggedAccount })
        } else {
          this.setState({ message: "Ud debe ser Owner o Beneficiario. ---- Address logged:" + loggedAccount})
        }
      }


      let contractBalanceValue = await allowanceInstance.getBalance.call({from: accounts[0]});
      let lastWithdrawalDateValue = await allowanceInstance.getLastWithdrawalDate();
      /*
      console.log(lastWithdrawalDateValue)
      console.log(allowanceInstance)
      */
      this.setState({ contractAddress: allowanceInstance.address});
      this.setState({ ownerAddress: accounts[0]});
      this.setState({ beneficiaryAddress: beneficiary});
      this.setState({ lastWithdrawalDate: lastWithdrawalDateValue.c[0]});
      this.setState({ contractBalance: contractBalanceValue.c[0]});
    

      } catch (e){
    }
  }

  async onContractAddressAdded(_contractAddress) {
    this.setState({ contractAddress: _contractAddress});
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


  render() {

    var messageText = <div>{this.state.message}</div>
    
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
              <WithdrawFromContract 
                onContractAddressAdded={this.onContractAddressAdded.bind(this)} 
                onContractWithdrawalBeneficiaryRequest={this.onContractWithdrawalBeneficiaryRequest.bind(this)} 
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
