
import React, { Component } from 'react';
import { StyledFaucetBox, CurrencyInput } from './FaucetBox.styled';
import etherCoin from '../../../assets/ethereum.png'
import { validateInput } from '../../../utilities/UtilsFunctions';
import web3 from 'web3';
import GetTokenButton from './GetTokenButton/GetTokenButton.js'

class FaucetBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            input: { raw: '', decimals: '' }
        }
    }

    inputChanged(value) {
        console.log(value)
        const inputIsCorrect = validateInput(value)
        if (inputIsCorrect) {
            const weiValue = new web3.utils.toBN(web3.utils.toWei(value.toString(), 'ether'))
            this.setState({
                input: {
                    raw: weiValue,
                    decimals: value
                }
            })
        }
        else {
            this.setState({
                input: {
                    raw: '',
                    decimals: ''
                }
            })
        }
    }


    render() {
        return (
            <StyledFaucetBox>
                <h4>Faucet</h4>
                <CurrencyInput>
                    <input disabled={false}
                        spellCheck="false" pattern="^[0-9]*[.,]?[0-9]*$" inputMode="decimal" type='number'
                        placeholder='0.0' minLength="1" maxLength="21" autoComplete="off" autoCorrect="off"
                        onChange={event => { this.inputChanged(event.target.value) }} ></input>
                    <img src={etherCoin} alt='inputTokenImage'></img>
                </CurrencyInput>
                <GetTokenButton state={this.state} account={this.props.state.account} />
            </StyledFaucetBox>
        );
    }

}
export default FaucetBox;
