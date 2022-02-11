
import React, { Component } from 'react';
import { StyledSwapBox, CurrencyInput, CurrencyOutput, Loading } from './SwapBox.styled';
import etherCoin from '../../../assets/ethereum.png'
import dogeCoin from '../../../assets/dogecoin.jpeg'
import { MetamaskStatus } from '../../../App';
import { getExchange } from '../../../api/BlockchainApi.js';

class SwapBox extends Component {

    inputChanged() {
        console.log("Input changed!")
        getExchange('0x0A53f1061522340A2e249DacfD3f45863940D7b4').then(result => {
            console.log(result)
        }).catch(error => {
            console.log(error)
        })


    }


    outPutChanged() {

    }


    render() {
        return (
            <StyledSwapBox>
                <h4>Swap</h4>
                <CurrencyInput>
                    <input disabled={this.props.state.metamaskStatus !== MetamaskStatus.Ready}
                        spellCheck="false" pattern="^[0-9]*[.,]?[0-9]*$" inputMode="decimal" type='number'
                        placeholder='0.0' minLength="1" maxLength="79" autoComplete="off" autoCorrect="off"
                        onChange={() => { this.inputChanged() }} ></input>
                    <img src={etherCoin} alt='inputTokenImage'></img>
                    <p></p>
                </CurrencyInput>
                <CurrencyOutput>
                    <input disabled={this.props.state.metamaskStatus !== MetamaskStatus.Ready}
                        spellCheck="false" pattern="^[0-9]*[.,]?[0-9]*$" inputMode="decimal" type='number'
                        placeholder='0.0' minLength="1" maxLength="79" autoComplete="off" autoCorrect="off"
                    ></input>
                    {/* onChange={() => { this.outPutChanged() }} ></input> */}
                    <img src={dogeCoin} alt='outputTokenImage'></img>
                    <p></p>
                </CurrencyOutput>
                <Loading>
                    <p>Loading...</p>
                </Loading>
            </StyledSwapBox >
        );
    }

}
export default SwapBox;
