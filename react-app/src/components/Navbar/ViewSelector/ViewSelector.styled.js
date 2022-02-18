
import styled from 'styled-components'

export const StyledViewSelector = styled.div`
        display: flex;
        flex-direction: row;
        padding: 2px;
        background-color: black;
        border-radius: 14px;
`


export const SwapTab = styled.div`
        display: flex;
        border-radius: 14px;
        padding-top: 7.5px;
        padding-bottom: 7.5px;
        padding-left: 15px;
        padding-right: 15px;
        cursor: pointer;
        p {
            font-weight: 750;
            margin: 0 0 0 0;
            color: white;
        }

        background-color: ${props => props.isActive ? "#28232c" : "black"};

`
export const FaucetTab = styled.div`
        display: flex;
        border-radius: 14px;
        padding-top: 7.5px;
        padding-bottom: 7.5px;
        padding-left: 15px;
        padding-right: 15px;
        margin-left: 50px;
        cursor: pointer;
        p {
            font-weight: 750;
            margin: 0 0 0 0;
            color: white;
        }
        background-color: ${props => props.isActive ? "#28232c" : "black"};

`