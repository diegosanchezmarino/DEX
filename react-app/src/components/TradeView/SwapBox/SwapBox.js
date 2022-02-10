
import React, { Component } from 'react';
import { StyledSwapBox, CurrencyInput, CurrencyOutput, Loading } from './SwapBox.styled';
import etherCoin from '../../../assets/ethereum.png'
import dogeCoin from '../../../assets/dogecoin.jpeg'

class SwapBox extends Component {

    render() {
        return (
            <StyledSwapBox>
                <h4>Swap</h4>
                <CurrencyInput>
                    <input spellCheck="false" pattern="^[0-9]*[.,]?[0-9]*$" inputMode="decimal" type='number' placeholder='0.0' minLength="1" maxLength="79" autoComplete="off" autoCorrect="off" ></input>
                    <img src={etherCoin}></img>
                    <p></p>
                </CurrencyInput>
                <CurrencyOutput>
                    <input spellCheck="false" pattern="^[0-9]*[.,]?[0-9]*$" inputMode="decimal" type='number' placeholder='0.0' minLength="1" maxLength="79" autoComplete="off" autoCorrect="off" ></input>
                    <img src={dogeCoin}></img>
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
