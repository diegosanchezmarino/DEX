
import React, { Component } from 'react';
import { StyledNavbar, LeftStack, RightStack, CenterStack } from './Navbar.styled';
import { MainButton } from './MainButton/MainButton.js';
import { AccountInfo } from './AccountInfo/AccountInfo.js'
import ViewSelector from './ViewSelector/ViewSelector';

class Navbar extends Component {

    render() {
        return (
            <StyledNavbar>
                <LeftStack>
                </LeftStack>
                <CenterStack>
                    <ViewSelector state={this.props.state} changeTab={this.props.changeTab} />
                </CenterStack>
                <RightStack >
                    <MainButton state={this.props.state} />
                    <AccountInfo state={this.props.state} />
                </RightStack>

            </StyledNavbar >
        );
    }



}
export default Navbar;
