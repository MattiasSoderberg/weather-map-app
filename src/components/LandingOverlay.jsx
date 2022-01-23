import React, { useContext } from 'react'
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

export default function LandingOverlay() {
    const { setShowLandingMessage } = useContext(MapContext)
    return (
        <Overlay onClick={e => setShowLandingMessage(false)}>
            <OverlayH2>Welcome to WeatherMapApp</OverlayH2>
            <OverlayText>Make sure to use the dragable <b>marker</b> to get the weather on the location of your choosing</OverlayText>
            <OverlayText>or <b>search</b> for a location to both se it on the map aned get the current weather information.</OverlayText>
        </Overlay>
    )
}
