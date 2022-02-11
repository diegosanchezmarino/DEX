
import React, { Component } from 'react';
import { StyledNavbar } from './Navbar.styled';
import { MainButton } from './MainButton/MainButton.js';
import { AccountInfo } from './AccountInfo/AccountInfo.js'

class Navbar extends Component {

    render() {
        return (
            <StyledNavbar>
                <MainButton state={this.props.state} />
                <AccountInfo state={this.props.state} />
            </StyledNavbar >
        );
    }



}
export default Navbar;
