
import React, { Component } from 'react';
import { StyledViewSelector, FaucetTab, SwapTab } from './ViewSelector.styled';


export const Tabs = {
    Swap: 0,
    Faucet: 1
}

class ViewSelector extends Component {


    constructor(props) {
        super(props)
    }

    render() {
        return (
            <StyledViewSelector>
                <SwapTab onClick={event => { this.swapSelected() }} isActive={this.props.state.currentTab === Tabs.Swap}>
                    <p>Swap</p>
                </SwapTab>
                <FaucetTab onClick={event => { this.faucetSelected() }} isActive={this.props.state.currentTab === Tabs.Faucet} >
                    <p>Faucet</p>
                </FaucetTab>
            </StyledViewSelector >
        );
    }

    faucetSelected() {
        this.props.changeTab(Tabs.Faucet)
        // this.setState({ selectedTab: Tabs.Faucet })
    }


    swapSelected() {
        this.props.changeTab(Tabs.Swap)
        // this.setState({ selectedTab: Tabs.Swap })
    }


}
export default ViewSelector;
