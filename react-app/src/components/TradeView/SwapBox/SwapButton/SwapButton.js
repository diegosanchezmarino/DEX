
import React, { Component } from 'react';
import { DisabledText, EnabledButton } from './SwapButton.styled';
import { Status } from '../SwapBox';
import { swapEthForToken } from '../../../../api/BlockchainApi';

class SwapButton extends Component {



    render() {
        console.log(this.props.output.toString())
        console.log(this.props.input.toString())
        return (
            this.renderButton()
        );
    }

    renderButton() {
        if (this.props.status === Status.Loading) {
            return (
                <DisabledText>
                    Swap
                </DisabledText>
            )
        }
        else if (this.props.status === Status.ReadyToSwap) {
            return (
                <EnabledButton onClick={event => { swapEthForToken(this.props.output.toString(), this.props.input.toString(), this.props.account) }}>
                    Swap
                </EnabledButton>
            )
        }
        else if (this.props.status === Status.NotEnoughCurrency) {
            return (
                <DisabledText>
                    Insufficient ETH balance
                </DisabledText>
            )
        }
        else if (this.props.status === Status.Empty) {
            return (
                <DisabledText>
                    Enter an amount
                </DisabledText>
            )
        }
    }

}
export default SwapButton;
