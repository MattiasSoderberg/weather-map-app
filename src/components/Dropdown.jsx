import React, { useContext } from 'react'
import styled from 'styled-components'
import { MapContext } from '../App'
import { accuWeather_BASE_URL } from '../utils'

const DropdownContainer = styled.div`
    width: 22%;
    background: #264653de;
    border: 2px solid #264653;
    position: absolute;
    top: 90px;
    left: 38%;
    z-index: 1;
    box-shadow: 0px 0px 8px 3px #264653;
`
const StyledUl = styled.ul`
    padding: 0.5rem 2rem;
`
const StyledLi = styled.li`
    list-style: none;
    color: #f6f6f6;
    letter-spacing: 0.5px;
    cursor: pointer;
    padding: 0.7rem 0.4rem;
    border-bottom: 1px solid #264653;
    transition: background ease 250ms;

    &:hover {
        background: #264653;
    }
`

export default function Dropdown({ results }) {
    const { setSearchValue, setIsDropdownVisible, setCoords } = useContext(MapContext)

    const handleOnClick = (result) => {
        setSearchValue(`${result.LocalizedName}, ${result.Country.LocalizedName}`)
        setIsDropdownVisible(false)

        const url = `${accuWeather_BASE_URL}/locations/v1/${result.Key}?apikey=${process.env.REACT_APP_API_KEY}`

        fetch(url)
        .then(res => res.json())
        .then(data => setCoords({ lat: data.GeoPosition.Latitude, lng: data.GeoPosition.Longitude }))

        setSearchValue("")
    }

    console.log(results)

    return (
        <DropdownContainer>
            {results ?
            <StyledUl>
                {results.map((result, index) => {
                    return <StyledLi key={index} onClick={e => handleOnClick(result)}>{result.LocalizedName}, {result.Country.LocalizedName}</StyledLi>
                })}
            </StyledUl>
            : <p><i>No results</i></p>}
        </DropdownContainer>
    )
}
