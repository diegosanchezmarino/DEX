
import React, { Component } from 'react';
import { StyledSwapBox, CurrencyInput, CurrencyOutput, Loading } from './SwapBox.styled';
import etherCoin from '../../../assets/ethereum.png'
import dogeCoin from '../../../assets/dogecoin.jpeg'
import { MetamaskStatus } from '../../../App';
import { getAddressBalance, getTokenAmount } from '../../../api/BlockchainApi.js';
import SwapButton from './SwapButton/SwapButton';
import web3 from 'web3';

export const Status = {
    Loading: 1,
    ReadyToSwap: 2,
    NotEnoughCurrency: 3,
    Empty: 4
}

class SwapBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            input: { raw: '', decimals: '' },
            output: { raw: '', decimals: '' },
            status: Status.Empty
        }
    }



    validateInput(value) {

        var res = value.split(".");
        let result = false

        if (res.length === 1 && value > 0) {
            return true
        }
        else if (res.length === 2 && res[1].length < 19 && value > 0) {
            return true
        }

        return result

    }

    inputChanged(value) {

        const inputIsCorrect = this.validateInput(value)
        if (inputIsCorrect) {

            const weiValue = new web3.utils.toBN(web3.utils.toWei(value.toString(), 'ether'))

            this.setState({ status: Status.Loading, input: { raw: weiValue, decimals: value } })

            getAddressBalance(this.props.state.account).then(addressBalance => {
                let userEther = new web3.utils.toBN(addressBalance)
                getTokenAmount(weiValue).then(tokenAmount => {
                    const decimals = web3.utils.fromWei(tokenAmount.toString(), 'ether')

                    var newState = {
                        output: {
                            raw: tokenAmount,
                            decimals: decimals
                        }
                    }
                    if (userEther.lt(weiValue)) {
                        newState.status = Status.NotEnoughCurrency
                    }
                    else {
                        newState.status = Status.ReadyToSwap
                    }
                    this.setState(newState)
                }).catch(error => {
                    console.log(error)
                    this.setState({ output: { raw: '', decimals: '' }, status: Status.NotEnoughCurrency })
                })
            })


        }
        else {
            this.setState({
                output: { raw: '', decimals: '' },
                input: { raw: '', decimals: '' },
                status: Status.Empty
            })
        }



    }


    render() {
        return (
            <StyledSwapBox>
                <h4>Swap</h4>
                <CurrencyInput>
                    <input disabled={this.props.state.metamaskStatus !== MetamaskStatus.Ready}
                        spellCheck="false" pattern="^[0-9]*[.,]?[0-9]*$" inputMode="decimal" type='number'
                        placeholder='0.0' minLength="1" maxLength="21" autoComplete="off" autoCorrect="off"
                        onChange={event => { this.inputChanged(event.target.value) }} ></input>
                    <img src={etherCoin} alt='inputTokenImage'></img>
                    <p></p>
                </CurrencyInput>
                <CurrencyOutput>
                    <input disabled={this.props.state.metamaskStatus !== MetamaskStatus.Ready}
                        spellCheck="false" pattern="^[0-9]*[.,]?[0-9]*$" inputMode="decimal" type='number'
                        placeholder='0.0' minLength="1" maxLength="21" autoComplete="off" autoCorrect="off"
                        value={this.state.output.decimals}
                    ></input>
                    <img src={dogeCoin} alt='outputTokenImage'></img>
                    <p></p>
                </CurrencyOutput>
                <Loading isVisible={this.state.status === Status.Loading}>
                    <p>Loading...</p>
                </Loading>
                <SwapButton status={this.state.status} account={this.props.state.account} input={this.state.input.raw} output={this.state.output.raw} />
            </StyledSwapBox >
        );
    }

}
export default SwapBox;
