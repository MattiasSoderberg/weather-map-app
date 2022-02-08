import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.div`
    background: #264653;
    max-width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 2rem;
    gap: 2rem;
    border-top: 3px solid #2A9D8F;
`
const FooterText = styled.p`
    color: #2A9D8F;
    font-size: 0.6rem;
`

export default function Footer() {
    return (
        <FooterContainer>
            <FooterText>Länk till portfolio</FooterText>
            <FooterText>&copy; Mattias Söderberg</FooterText>
        </FooterContainer>
    )
}
