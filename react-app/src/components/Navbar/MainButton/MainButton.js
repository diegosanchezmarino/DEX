
import React, { Component } from 'react';
import { StyledMainButton } from './MainButton.styled';
import { MetamaskStatus } from '../../../App';
import { connectWallet, switchNetwork } from '../../../utilities/BlockchainConnectionManager'

export function MainButton(props) {

    if (props.state.metamaskStatus === MetamaskStatus.NotConnected) {
        return (
            <StyledMainButton onClick={() => { connectWallet() }}>
                <p>Connect Wallet</p>
            </StyledMainButton>
        )
    }
    else if (props.state.metamaskStatus === MetamaskStatus.WrongNetwork) {
        return (
            <StyledMainButton onClick={() => { switchNetwork() }}>
                <p>Switch Network</p>
            </StyledMainButton>
        )
    }
    else {
        return null
    }


}

