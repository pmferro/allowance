import React, { Component } from 'react'
//import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import AllowanceContract from '../build/contracts/Allowance.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      contractBalance: "",
      lastWithdrawalDate: "",
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

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const allowance = contract(AllowanceContract)
    allowance.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var allowanceInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {allowance.deployed().then((instance) => {
        // 1 START --------
        allowanceInstance = instance

        // Stores a given value, 5 by default.
        return allowanceInstance.getLastWithdrawalDate().then((result) => {
        // Get the value from the contract to prove it worked.
        //return allowanceInstance.get.call(accounts[0])
        //}).then((result) => {
        // Update state with the result.
        //return this.setState({ lastWithdrawalDate: result.c[0] })
        //return allowanceInstance.getBalance().then((result) => {
        //  return this.setState({contractBalance: result.c[0]})
        //})


        
      })
      })
    })
  }


  
  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Welcome!</h1>
              <h2>Allowance Smart Contract Example</h2>
              <p>Contract Address</p>
              <p>Contract Address</p>
              <p>Contract Address</p>
              <p>Contract Address</p>
              <p>lastWithdrawalDate: {this.state.lastWithdrawalDate}</p>
            
              <p>Contract Balance is: {this.state.contractBalance}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
