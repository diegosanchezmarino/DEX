import React, { Component } from 'react';
import { StyledTokenButton } from './GetTokenButton.styled';
import { getTokens } from '../../../../api/TokenApi';


class GetTokenButton extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <StyledTokenButton onClick={event => { getTokens(this.props.state.input.raw, this.props.account) }} isActive={this.props.state.input.raw > 0}>
                Get Tokens
            </StyledTokenButton>
        )
    }

}
export default GetTokenButton;
