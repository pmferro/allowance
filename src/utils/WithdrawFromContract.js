import React, { Component } from 'react'

export default class WithdrawFromContract extends Component {
    
      constructor(props) {
        super(props)
        this.state = {
          newContractAddress: '',
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
    
      clearForm() {
        this.setState({
            newContractAddress: '',
        })
      }
    
      render() {
        return (
          <div>
            <input type="text" value={this.state.newContractAddress} onChange={this.onContractAddressChange.bind(this)} placeholder="Direccion del contrato: " />
            <button onClick={this.onUpdateContractAddress.bind(this)}>Actualizar</button>
          </div>
        )
      }
    }