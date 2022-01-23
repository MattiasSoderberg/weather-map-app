import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import Container from './components/Container';
import Header from './components/Header';
import Map from './components/Map';
import Dropdown from './components/Dropdown';
import TextContent from './components/TextContent';
import LandingOverlay from './components/LandingOverlay';
import { accuWeather_BASE_URL } from './utils';

const MapContext = createContext({})

function App() {
  const [showLandingMessage, setShowLandingMessage] = useState(true)
  const [coords, setCoords] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [dropdownResults, setDropdownResults] = useState([])
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 4000,
      maxiumAge: 0
    }

    function success(pos) {
      const { latitude, longitude } = pos.coords

      setCoords({ lat: latitude, lng: longitude })
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options)
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
      const url = `${accuWeather_BASE_URL}/currentconditions/v1/${currentLocation.Key}?apikey=${process.env.REACT_APP_API_KEY}&language=sv`
      fetch(url)
        .then(res => {
          if (res.ok) {
            console.log(res)
            return res.json()
          } else {
            throw new Error(res.statusText)
          }
        })
        .then(data => setCurrentWeather(data[0]))
    }
  }, [currentLocation])

  return (
    <div className="App">
      <MapContext.Provider value={{ coords, setCoords, currentWeather, currentLocation, setIsDropdownVisible, setDropdownResults, searchValue, setSearchValue, setShowLandingMessage }}>
        {showLandingMessage && <LandingOverlay />}
        <Header />
        {isDropdownVisible &&
          <Dropdown results={dropdownResults} />
        }
        <Container>
          <TextContent />
          <Map />
        </Container>
      </MapContext.Provider>
    </div>
  );
}

export { MapContext }
export default App;
