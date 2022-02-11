
import React, { Component } from 'react';

import TradeView from './components/TradeView/TradeView';
import { StyledApp } from './App.styled';
import Navbar from './components/Navbar/Navbar';
import { BlockchainConnectionManager } from './utilities/BlockchainConnectionManager';
import dogeCoin from './assets/dogecoin.jpeg'


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
      morePostsAvailable: false,
      tokens: [
        {
          icon: dogeCoin,
          address: '0x0A53f1061522340A2e249DacfD3f45863940D7b4',
          exchangeAddress: '0x46cAA04e2eeBC6Bdf6f38788DedebF2624bFD308',
          name: 'Ramona',
          symbol: 'MONA'
        }
      ]
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


  render() {
    return (
      <StyledApp>
        <Navbar state={this.state} />
        <TradeView state={this.state} />
      </StyledApp >

    );
  }

}
export default App;
