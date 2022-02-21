
import React, { Component } from 'react';
import { Tabs } from '../Navbar/ViewSelector/ViewSelector';
import SwapBox from './SwapBox/SwapBox';
import { StyledTradeView } from './TradeView.styled';

export function TradeView(props) {


    if (props.state.currentTab === Tabs.Swap) {
        return (
            <StyledTradeView>
                <SwapBox state={props.state} />
            </StyledTradeView>
        );
    }
    else {
        return null
    }


}
