import styled from 'styled-components'


export const StyledTokenButton = styled.button`
    margin-top: 10px;
    color: white;
    padding: 16px;
    box-sizing: border-box;
    font-weight: 500;
    border-radius: 4px;
    border: 0px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    display: flex;
    background-color: rgb(33, 114, 229);
    display: ${props => props.isActive ? "flex" : "none"};


`