
import React, { Component } from 'react';

import TradeView from './components/TradeView/TradeView';
import { StyledApp } from './App.styled';
import Navbar from './components/Navbar/Navbar';
import { BlockchainConnectionManager } from './utilities/BlockchainConnectionManager';

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
      morePostsAvailable: false
    }
    this.updateState = this.updateState.bind(this)
  }

  async componentDidMount() {
    this.blockchainConnectionManager = new BlockchainConnectionManager(this.updateState);
    this.blockchainConnectionManager.validate()

  }

  updateState(newState) {
    this.setState(newState);
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  render() {
    return (
      <StyledApp>
        <Navbar state={this.state} />
        <TradeView />
      </StyledApp >

    );
  }

}
export default App;
