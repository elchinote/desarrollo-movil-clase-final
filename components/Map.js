import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MapView, Location } from 'expo'

export default class App extends React.Component {
  constructor() {
    super()
    this.mapRef = React.createRef()
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.coordinates) {
      return
    }

    const {
      coordinates: [latitude, longitude],
    } = nextProps

    const region = {
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
    this.mapRef.current.animateToRegion(region)
  }

  render() {
    const { canchas } = this.props

    return (
      <MapView
        ref={this.mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: -34.6356065,
          longitude: -58.366945,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {canchas.map(cancha => {
          const {
            title,
            coordinates: [latitude, longitude],
          } = cancha

          return <MapView.Marker key={title} coordinate={{ latitude, longitude }} />
        })}
      </MapView>
    )
  }
}
