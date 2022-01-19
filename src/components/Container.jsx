import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
    width: ${props => props.width}%;
    height: 100%;
    display: flex;
    flex-direction: ${props => props.direction};
    justify-content: ${props => props.justify};
    align-items: ${props => props.align};
    margin: ${props => props.margin}rem;
    background: #f5f1df;
`

export default function Container(props) {
    return (
        <StyledContainer width={props.width} margin={props.margin} direction={props.direction} justify={props.justify} align={props.align}>
            {props.children}
        </StyledContainer>
    )
}
