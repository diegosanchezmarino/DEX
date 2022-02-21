
import React, { Component } from 'react';

import { TradeView } from './components/TradeView/TradeView';
import { StyledApp } from './App.styled';
import Navbar from './components/Navbar/Navbar';
import { BlockchainConnectionManager } from './utilities/BlockchainConnectionManager';
import dogeCoin from './assets/dogecoin.jpeg'
import { FaucetView } from './components/FaucetView/FaucetView';
import { Tabs } from './components/Navbar/ViewSelector/ViewSelector';

export const MetamaskStatus = {
  Idle: 0,
  NotInstalled: 1,
  WrongNetwork: 2,
  NotConnected: 3,
  Ready: 4
}

class App extends Component {


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      metamaskStatus: MetamaskStatus.Idle,
      currentTab: Tabs.Swap
    }

    this.updateState = this.updateState.bind(this)
    this.changeTab = this.changeTab.bind(this)
  }

  async componentDidMount() {
    this.blockchainConnectionManager = new BlockchainConnectionManager(this.updateState);
    this.blockchainConnectionManager.validate()

  }

  updateState(newState) {
    this.setState(newState);
  }

  changeTab(newTab) {
    this.setState({ currentTab: newTab })
  }


  render() {
    return (
      <StyledApp>
        <Navbar changeTab={this.changeTab} state={this.state} />
        <TradeView state={this.state} />
        <FaucetView state={this.state} />
      </StyledApp >

    );
  }

}
export default App;
