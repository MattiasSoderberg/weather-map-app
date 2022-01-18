import React, { useState, useEffect, useContext } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import Pin from './Pin'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapContext } from '../App'
import Container from './Container'
import styled from 'styled-components'

const DisplayContainer = styled.div`
    width: 8rem;
    height: 3rem;
    background: #000000bb;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 0.5rem;
    border: 2px solid #264653;
`
const DisplayText = styled.p`
    color: #f9f9f9;
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

    const accessToken = 'pk.eyJ1IjoibWF0dGUxOTg2IiwiYSI6ImNrd3c2OHBobjAwcDEydmxhMWYweHIydngifQ.KDPn3rWaOyr1kGtoO9fDLw'

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
            <ReactMapGL
                {...viewport}
                width="100%"
                height="100%"
                onViewportChange={setViewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxApiAccessToken={accessToken}
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
        </Container>
    )
}
