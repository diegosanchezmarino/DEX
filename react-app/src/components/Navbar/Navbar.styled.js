
import styled from 'styled-components'

export const StyledNavbar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    margin-top: 10px;
`
export const LeftStack = styled.div`
    display: flex;
    width: 100%;
    flex-grow: 1;
`
export const CenterStack = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    width: 100%;
`
export const RightStack = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    flex-grow: 1;
    width: 100%;
`
