
import React, { Component } from 'react';
import { AddressBox, StyledAccountInfo } from './AccountInfo.styled';
import { MetamaskStatus } from '../../../App';


export function AccountInfo(props) {

    if (props.state.metamaskStatus === MetamaskStatus.Ready) {
        console.log(props.state)
        return (
            <StyledAccountInfo>
                <AddressBox >
                    <p>{props.state.account.substring(0, 6) + "..." + props.state.account.substring(props.state.account.length - 5)}</p>
                </AddressBox >
            </StyledAccountInfo>
        )
    }
    else {
        console.log(props.state)
        return null
    }

}
