
import React, { Component } from 'react';
import { StyledViewSelector, FaucetTab, SwapTab } from './ViewSelector.styled';


const Tabs = {
    Swap: 0,
    Faucet: 1
}

class ViewSelector extends Component {


    constructor(props) {
        super(props)
        this.state = {
            selectedTab: Tabs.Swap
        }
    }

    render() {
        return (
            <StyledViewSelector>
                <SwapTab onClick={event => { this.swapSelected() }} isActive={this.state.selectedTab === Tabs.Swap}>
                    <p>Swap</p>
                </SwapTab>
                <FaucetTab onClick={event => { this.faucetSelected() }} isActive={this.state.selectedTab === Tabs.Faucet} >
                    <p>Faucet</p>
                </FaucetTab>
            </StyledViewSelector >
        );
    }

    faucetSelected() {
        this.setState({ selectedTab: Tabs.Faucet })
    }


    swapSelected() {
        this.setState({ selectedTab: Tabs.Swap })
    }


}
export default ViewSelector;
