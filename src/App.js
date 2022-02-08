import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import Container from './components/Container';
import Header from './components/Header';
import Map from './components/Map';
import Dropdown from './components/Dropdown';
import TextContent from './components/TextContent';
import LandingOverlay from './components/LandingOverlay';
import { accuWeather_BASE_URL, getUserLocation } from './utils';
import Footer from './components/Footer';

const MapContext = createContext({})

function App() {
  const [showLandingMessage, setShowLandingMessage] = useState(true)
  const [coords, setCoords] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [dropdownResults, setDropdownResults] = useState([])
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    getUserLocation(setCoords)
  }, [])

  useEffect(() => {
    if (coords) {
      const url = `${accuWeather_BASE_URL}/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_API_KEY}&q=${coords.lat}%2C${coords.lng}`
      fetch(url)
        .then(res => {
          if (res.ok) {
            console.log(res)
            return res.json()
          } else {
            console.log(res)
            throw new Error(res.statusText)
          }
        })
        .then(data => setCurrentLocation(data))
        .catch(err => {
          console.log(err)
        })
    }
  }, [coords])

  useEffect(() => {
    if (currentLocation) {
      const currentConditionUrl = `${accuWeather_BASE_URL}/currentconditions/v1/${currentLocation.Key}?apikey=${process.env.REACT_APP_API_KEY}&details=true`
      fetch(currentConditionUrl)
        .then(res => {
          if (res.ok) {
            console.log(res)
            return res.json()
          } else {
            throw new Error(res.statusText)
          }
        })
        .then(data => setCurrentWeather(data[0]))

      const forecastUrl = `${accuWeather_BASE_URL}/forecasts/v1/hourly/12hour/${currentLocation.Key}?apikey=${process.env.REACT_APP_API_KEY}&metric=true`
      fetch(forecastUrl)
        .then(res => {
          if (res.ok) {
            console.log(res)
            return res.json()
          } else {
            throw new Error(res.statusText)
          }
        })
        .then(data => setForecast(data))
    }
  }, [currentLocation])

  return (
    <div className="App">
      <MapContext.Provider value={{ coords, setCoords, currentWeather, currentLocation, setCurrentLocation, forecast, setIsDropdownVisible, setDropdownResults, searchValue, setSearchValue, setShowLandingMessage }}>
        {showLandingMessage && <LandingOverlay />}
        <Header />
        {isDropdownVisible &&
          <Dropdown results={dropdownResults} />
        }
        <Container>
          <TextContent />
          <Map />
        </Container>
        <Footer />
      </MapContext.Provider>
    </div>
  );
}

export { MapContext }
export default App;
