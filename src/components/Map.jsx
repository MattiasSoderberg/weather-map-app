import React, { useState, useEffect, useContext } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import Pin from './Pin'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapContext } from '../App'
import Container from './Container'
import styled from 'styled-components'
import mapboxgl from 'mapbox-gl'

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const MapContainer = styled.div`
    width: 100%;
    border-left: 2px solid #264653;
`

const DisplayContainer = styled.div`
    width: 8rem;
    height: 3rem;
    background: #264653de;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 0.5rem;
    border: 2.5px solid #264653;
`
const DisplayText = styled.p`
    color: #f6f6f6;
    margin: 0;
    padding: 0.1rem 0;
`

export default function Map() {
    const { coords, setCoords } = useContext(MapContext)
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 11,
    })
    const [markerLocation, setMarkerLocation] = useState({
        latitude: 0,
        longitude: 0
    })

    useEffect(() => {
        if (coords) {
            setViewport(prevState => {
                return { ...prevState, latitude: coords.lat, longitude: coords.lng }
            })
            setMarkerLocation({ latitude: coords.lat, longitude: coords.lng })
        }
    }, [coords])

    function onMarkerDragEnd(e) {
        setCoords({ lat: e.lngLat[1], lng: e.lngLat[0] })
    }

    function onMarkerDrag(e) {
        setMarkerLocation({ latitude: e.lngLat[1], longitude: e.lngLat[0] })
    }

    function roundFloat(num) {
        return Math.round((num + Number.EPSILON) * 100) / 100
    }

    return (
        <Container width={65}>
            <MapContainer>
                <ReactMapGL
                    {...viewport}
                    width="100%"
                    height="100%"
                    onViewportChange={setViewport}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
                >
                    <Marker
                        latitude={markerLocation.latitude}
                        longitude={markerLocation.longitude}
                        draggable={true}
                        onDrag={onMarkerDrag}
                        onDragEnd={onMarkerDragEnd}
                    >
                        <Pin size={20} />
                    </Marker>
                    <DisplayContainer>
                        <DisplayText>Latitude: {roundFloat(markerLocation.latitude)}</DisplayText>
                        <DisplayText>Longitude: {roundFloat(markerLocation.longitude)}</DisplayText>
                    </DisplayContainer>
                </ReactMapGL>
            </MapContainer>
        </Container>
    )
}
