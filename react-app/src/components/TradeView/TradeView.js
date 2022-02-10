
import React, { Component } from 'react';
import SwapBox from './SwapBox/SwapBox';
import { StyledTradeView } from './TradeView.styled';

class TradeView extends Component {

    render() {
        return (
            <StyledTradeView>
                <SwapBox />
            </StyledTradeView>
        );
    }

}
export default TradeView;
