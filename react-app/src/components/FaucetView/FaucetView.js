
import React, { Component } from 'react';
import { Tabs } from '../Navbar/ViewSelector/ViewSelector';
import FaucetBox from './FaucetBox/FaucetBox';
import { StyledFaucetView } from './FaucetView.styled';

export function FaucetView(props) {

    if (props.state.currentTab === Tabs.Faucet) {
        return (
            <StyledFaucetView>
                <FaucetBox state={props.state} />
            </StyledFaucetView>
        );
    }
    else {
        return null
    }



}
