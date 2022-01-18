import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import Container from './components/Container';
import Header from './components/Header';
import Map from './components/Map';
import TextContent from './components/TextContent';
import { accuweatherAPI_KEY, accuWeather_BASE_URL } from './utils';

const MapContext = createContext({})

function App() {
  const [coords, setCoords] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [currentLocation, setCurrentLocation] = useState(null)

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
      const url = `${accuWeather_BASE_URL}/locations/v1/cities/geoposition/search?apikey=${accuweatherAPI_KEY}&q=${coords.lat}%2C${coords.lng}`
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
      const url = `${accuWeather_BASE_URL}/currentconditions/v1/${currentLocation.Key}?apikey=${accuweatherAPI_KEY}`
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
      <MapContext.Provider value={{ coords, setCoords, currentWeather, currentLocation }}>
        <Header />
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
