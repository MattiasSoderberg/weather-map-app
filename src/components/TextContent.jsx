import React, { useContext } from 'react'
import styled from 'styled-components'
import { MapContext } from '../App'
import { temperatureColor } from '../utils'
import Container from './Container'

const ColoredContainer = styled.div`
    width: 60%;
    height: 500px;
    background: #${props => props.background};
    padding: 2rem 2rem;
    margin: 1rem;
    border-radius: 0.2rem;
    border: 1.5px solid #264653;
`
const HeadingContainer = styled.div`
    width: 60%;
    display: flex;
    align-items: center;
`
const StyledInfoHeading1 = styled.h2`
    font-size: 2.2rem;
    font-weight: 500;
    color: #264653;
`
const StyledInfoText = styled.p`
    margin: 0 0 1rem 0;
    font-size: 1.3rem;
    color: #264653;
`
const StyledImage = styled.img`
    width: 75px;
    height: 45px;
    margin-left: 2rem;
`

// {currentWeather && currentLocation &&
//     <Container width={35} justify="center">
//         <Container width={80} direction="column" align="center">
//             <Container>
//                 <StyledInfoHeading1>{currentLocation.EnglishName} <span>{currentWeather.WeatherIcon}</span></StyledInfoHeading1>
//                 <StyledImage src={`../../public/icons/1-s.png`} />
//             </Container>
//             <ColoredContainer background={temperatureColor(currentWeather.Temperature.Metric.Value)}>
//                 <StyledInfoText>Current temperature: {currentWeather.Temperature.Metric.Value} {currentWeather.Temperature.Metric.Unit}</StyledInfoText>
//                 <StyledInfoText>Weather: {currentWeather.WeatherText}</StyledInfoText>
//             </ColoredContainer>
//         </Container>
//     </Container>
// }

export default function TextContent() {
    const { currentWeather, currentLocation } = useContext(MapContext)
    console.log(currentWeather)
    console.log(currentLocation)
    return (
        <>

            <Container width={35} justify="center">
                <Container width={80} direction="column" align="center">
                    <HeadingContainer>
                        <StyledInfoHeading1>Solvalla <span></span></StyledInfoHeading1>
                        <StyledImage src={`icons/${7}-s.png`} />
                    </HeadingContainer>
                    <ColoredContainer background={temperatureColor(2)}>
                        <StyledInfoText>Current temperature:</StyledInfoText>
                        <StyledInfoText>Weather:</StyledInfoText>
                    </ColoredContainer>
                </Container>
            </Container>
        </>
    )
}
