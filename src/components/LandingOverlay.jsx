import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { MapContext } from '../App'

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    background: #000000de;
    text-align: center;
    color: #f6f6f6;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1.2rem;
`
const OverlayH2 = styled.h2`
    font-weight: 400;
    font-size: 3rem;
    margin: 0;
`
const OverlayText = styled.p`
    font-size: 1.5rem;
    margin: 0;
`
const OverlayTextSmall = styled.p`
    font-size: 0.9rem;
    margin: 0;
`

export default function LandingOverlay() {
    const [showWelcome, setShowWelcome] = useState(true)
    const { setShowLandingMessage } = useContext(MapContext)

    const handleOnOverlayClick = () => {
        setShowLandingMessage(false)
        setShowWelcome(false)
        console.log(showWelcome)
    }

    return (
        <Overlay onClick={handleOnOverlayClick}>
            <OverlayH2>
                {showWelcome ? "Welcome to WeatherMapApp"
                    : "Instructions"}
            </OverlayH2>
            <OverlayText>Use the dragable <b>marker</b> to get the weather on the location you want</OverlayText>
            <OverlayText>or <b>search</b> for a location to both see it on the map and get the current weather information.</OverlayText>
            <OverlayTextSmall>Click on the screen to get going</OverlayTextSmall>
        </Overlay>
    )
}
