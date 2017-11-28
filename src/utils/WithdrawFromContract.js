import React, { Component } from 'react'

export default class WithdrawFromContract extends Component {
    
      constructor(props) {
        super(props)
        this.state = {
          newContractAddress: ''
        }


      }
    

      onContractAddressChange(event) {
        const { target } = event
        const { value } = target
        this.setState({
          ...this.state,
          newContractAddress: value,
        })

      }
    

      onUpdateContractAddress(event) {
        const { newContractAddress } = this.state
        const { onContractAddressAdded } = this.props
        if (newContractAddress !== "") {
            onContractAddressAdded(newContractAddress)
          this.clearForm()
        }
      }

      onWithdrawBeneficiary(event) {
        const { onContractWithdrawalBeneficiaryRequest } = this.props
        onContractWithdrawalBeneficiaryRequest();
      }
      
      onAddFunds(event) {
        const { onAddFundsRequest } = this.props
        onAddFundsRequest();
      }

    
      clearForm() {
        this.setState({
            newContractAddress: '',
        })
      }
  
      
      render() {
        var partial;
        //console.log(this.props);
        

            switch (this.props.role) {
              case 'owner':
                partial =
                <div>
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

              default:
                partial = ""
              break;
            }
            
        return (
          <div>
            {partial}
          </div>
        )
      }
    }

    /*
    <input type="text" value={this.state.newContractAddress} 
                onChange={this.onContractAddressChange.bind(this)} 
                placeholder="Direccion del contrato: " />
                
    */