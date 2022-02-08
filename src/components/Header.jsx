import React, { useContext } from 'react'
import styled from 'styled-components'
import { MapContext } from '../App'
import { accuWeather_BASE_URL, getUserLocation } from '../utils'

const HeaderContainer = styled.div`
    width: 100%;
    height: 100px;
    background: #264653;
    padding: 0 5rem;
    display: flex;
    align-items: center;
    border-bottom: 7px solid #2A9D8F;
    z-index: 2;
`
const StyledHeadingHeader = styled.h1`
    font-size: 2.8rem;
    // margin: 0 0 0 4rem;
    color: #e76f51;
    font-weight: 500;
`
const FormContainer = styled.div`
    margin: 0 auto 0 auto;
`
const Input = styled.input`
    padding: 0.8rem;
    font-size: 1.3rem;
    outline: #f9f9f9;
    border: 1px solid #E76F51;
    background: #264653;
    margin-right: 1rem;
    color: #f6f6f6;

    &:focus {
        box-shadow: 0px 0px 1px 1.5px #E76F51;
    }
`
const FormButton = styled.button`
    font-size: 1.3rem;
    padding: 0.8rem 1rem;
    border: 1px solid #E76F51;
    background: #264653;
    color: #f9f9f9;
    letter-spacing: 1px;
    transition: all ease-out 50ms;

    &:hover {
        background: #396480;
    }

    &:active {
        transform: scale(0.95)
    }
`
const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
`
const NavButton = styled(FormButton)`
    font-size: 0.9rem;
`

export default function Header() {
    const { searchValue, setSearchValue, setDropdownResults, setIsDropdownVisible, setCoords, setShowLandingMessage } = useContext(MapContext)

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const url = `${accuWeather_BASE_URL}/locations/v1/cities/search?apikey=${process.env.REACT_APP_API_KEY}&q=${searchValue}`

        if (searchValue) {
            fetch(url)
                .then(res => res.json())
                .then(data => setDropdownResults(data))
        }
    }

    const handleOnChange = (e) => {
        const url = `${accuWeather_BASE_URL}/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${e.target.value}`

        setSearchValue(e.target.value)

        if (e.target.value) {
            // console.log(e.target.value)
            setTimeout(() => {
                fetch(url)
                    .then(res => {
                        if (res.ok) {
                            // console.log(res)
                            return res.json()
                        } else {
                            console.log(res)
                            throw new Error(res.statusText)
                        }
                    })
                    .then(data => {
                        if (data.length !== 0) {
                            setDropdownResults(data)
                        } else {
                            setDropdownResults(null)
                        }
                        setIsDropdownVisible(true)
                        console.log(data)
                    })
            }, 1000)
        } else {
            setIsDropdownVisible(false)
        }
    }

    return (
        <HeaderContainer>
            <StyledHeadingHeader>WeatherMapApp</StyledHeadingHeader>
            <FormContainer>
                <form onSubmit={handleOnSubmit}>
                    <Input value={searchValue} onChange={e => handleOnChange(e)} placeholder="Search Location" />
                    <FormButton>Search</FormButton>
                </form>
            </FormContainer>
            <ButtonContainer>
                <NavButton onClick={e => getUserLocation(setCoords)}>Current Location</NavButton>
                <NavButton onClick={e => setShowLandingMessage(true)}>Welcome Message</NavButton>
            </ButtonContainer>
        </HeaderContainer>
    )
}
