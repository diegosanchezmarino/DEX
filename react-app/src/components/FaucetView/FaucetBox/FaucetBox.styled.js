
import styled from 'styled-components'

export const StyledFaucetBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    background-color: grey;
    border-radius: 15px;
    background-color: #191c20;
    justify-content: space-between;
    box-sizing: border-box;
    box-shadow: 0 0 10px rgba(0,0,0,0.15);
    h4 {
        margin-top: 0px;
        margin-left: 0px;
        margin-bottom: 10px;
        margin-right: 0px;
        color: white;
        align-self: flex-start;
        justify-self: flex-start;
    }
`


export const CurrencyInput = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 15px;
    align-items: center;
    background-color: #28232c;
    padding: 15px;

    input {
        outline: none;
        border: none;
        color: white;
        font-size: 28px;
        white-space: nowrap;
        background-color: #28232c;
        appearance: textfield;
        padding: 10px;
        cursor: text;
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            /* display: none; <- Crashes Chrome on hover */
            -webkit-appearance: none;
            margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
        }
        -moz-appearance:textfield; /* Firefox */
    }
    img {
        height: 25px;
        width: 25px;
    }
`


