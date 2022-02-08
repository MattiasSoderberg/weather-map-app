import React, { useContext } from 'react'
import styled from 'styled-components'
import { MapContext } from '../App'
import { convertKmToMPerHour, temperatureColor } from '../utils'
import { BsArrowUp } from 'react-icons/bs'
import Container from './Container'

const ColoredContainer = styled.div`
    width: 90%;
    height: 13rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #${props => props.background};
    // padding: 0.5rem 2.5rem;
    //margin: 1rem;
    gap: 0.5rem;
    border-radius: 2.5rem;
    box-shadow: 0 0 14px 1px #264653;
    transition: background ease 1s;
`
const HeadingContainer = styled.div`
    width: 90%;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #264653;
    border-radius: 0 0 2.5rem 2.5rem;
    gap: 2rem;
    box-shadow: 1px 3px 12px 1px #264653;
`
const ForecastContainer = styled(HeadingContainer)`
    flex-direction: column;
    height: 22rem;
    padding: 0.5rem 2.5rem;
    margin-bottom: 1.5rem;
    border-radius: 2.5rem;
    box-shadow: 1px 0px 14px 1px #264653;
    gap: 1rem;
`
const StyledHeading1 = styled.h2`
    font-size: 2.2rem;
    font-weight: 400;
    color: #f6f6f6;
    margin: 0;
`
const StyledHeading2 = styled.h3`
    font-size: 1.5rem;
    font-weight: 400;
    color: #f6f6f6;
    margin: 0;
`
const StyledInfoHeading = styled(StyledHeading1)`
    color: #060606;
    font-size: 2.6rem;
`
const StyledInfoTextContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
`
const StyledInfoText = styled.p`
    margin: 0;
    font-size: 1.2rem;
    color: #060606;
`
const WindArrowIcon = styled(BsArrowUp)`
    font-size: 1.2rem;
    transform: rotate(${props => props.deg}deg)
`
const IconContainer = styled.div`
    transform: rotate(${props => props.deg}deg)
`
const StyledImageLg = styled.img`
    width: 100px;
    height: 60px;
`
const ForecastContentContainer = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.7rem;
`
const ForecastTextContainer = styled.div`
    display: flex;
    width: 8rem;
    align-items: center;
    gap: 0.4rem;
`
const ForecastText = styled(StyledInfoText)`
    margin: 0;
    font-size: 1rem;
    color: #f6f6f6;
`
const ForecastImage = styled.img`
    width: 36px;
    height: 21.6px;
`

export default function TextContent() {
    const { currentWeather, currentLocation, forecast } = useContext(MapContext)
    console.log(currentLocation)
    console.log(currentWeather)
    return (
        <Container width={30} justify="center">
            <Container width={100} direction="column" align="center" justify="space-between">
                <HeadingContainer>
                    {currentLocation ?
                        <>
                            <StyledHeading1>{currentLocation.EnglishName}{`, ${currentLocation.Country.ID}`}</StyledHeading1>
                        </>
                        : <StyledHeading2>No Location</StyledHeading2>}
                </HeadingContainer>
                {currentWeather ?
                    <ColoredContainer background={temperatureColor(currentWeather.Temperature.Metric.Value)}>
                        <StyledImageLg src={`/icons/${currentWeather.WeatherIcon}-s.png`} />
                        <StyledInfoHeading>{currentWeather.Temperature.Metric.Value}&deg;{currentWeather.Temperature.Metric.Unit}</StyledInfoHeading>
                        <StyledInfoTextContainer>
                            <StyledInfoText>{currentWeather.WeatherText}</StyledInfoText>
                            <StyledInfoText>Wind {convertKmToMPerHour(currentWeather.Wind.Speed.Metric.Value)} m/s
                            <WindArrowIcon deg={currentWeather.Wind.Direction.Degrees}></WindArrowIcon>
                            </StyledInfoText>
                            {/* <IconContainer deg={currentWeather.Wind.Direction.Degrees}><BsArrowUp /></IconContainer> */}
                        </StyledInfoTextContainer>
                    </ColoredContainer>
                    : <StyledInfoText>No Weather</StyledInfoText>}
                <ForecastContainer>
                    <StyledHeading2>{forecast ? "12-hour Forecast" : "No Forecast"}</StyledHeading2>
                    <ForecastContentContainer>
                        {forecast && forecast.map((item, index) => {
                            return <ForecastTextContainer key={index}>
                                <ForecastText>{item.DateTime.slice(11, 16)}</ForecastText>
                                <ForecastImage src={`/icons/${item.WeatherIcon}-s.png`} />
                                <ForecastText>{item.Temperature.Value}&deg;{item.Temperature.Unit}</ForecastText>
                            </ForecastTextContainer>
                        })}
                    </ForecastContentContainer>
                </ForecastContainer>
            </Container>
        </Container>
    )
}
