import React, { Component } from 'react'

export default class WithdrawFromContract extends Component {
    
      constructor(props) {
        super(props)
        this.state = {
          newValueAdded: 0
        }
      }

      onWithdrawBeneficiary(event) {
        const { onContractWithdrawalBeneficiaryRequest } = this.props
        onContractWithdrawalBeneficiaryRequest();
      }
      
      onAddFunds(event) {
        const { onAddFundsRequest } = this.props
        onAddFundsRequest(this.state.newValueAdded);
      }

      onAddFundsChange(event) {
        const { target } = event
        const { value } = target
        this.setState({
          ...this.state,
          newValueAdded: value,
        })
      }

      onWithdrawAllFunds(event) {
        const { onWithdrawAllFundsRequest } = this.props
        onWithdrawAllFundsRequest();
      }
    
      clearForm() {
        this.setState({
            newValueAdded: ''
        })
      }
  
      
      render() {
        var partial;

            switch (this.props.role) {
              case 'owner':
                partial = 
                <div>
                  <input type="text" onChange={this.onAddFundsChange.bind(this)} value={this.state.newValueAdded} placeholder="ether" />
                  <button onClick={this.onAddFunds.bind(this)}>Add Funds</button>
               </div>
              break;
        
              case 'beneficiary':
                partial =
                <div>
                <button onClick={this.onWithdrawBeneficiary.bind(this)}>Retirar allowance</button>
                </div>
              break;
        
              case '':
                partial = <p>xxx Access Denied xxx</p>
              break;
            }
            
        return (
          <div>
            {partial}
          </div>
        )
      }
    }