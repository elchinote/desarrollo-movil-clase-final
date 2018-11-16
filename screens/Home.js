import React from 'react'
import { Button, StyleSheet, Text, View, ScrollView, AsyncStorage } from 'react-native'

import Map from '../components/Map'
import Carousel from '../components/Carousel'

import canchas from '../canchas'

class HomeScreen extends React.Component {
  state = {}

  async componentDidMount() {
    await this.pedirData()
  }

  pedirData = async () => {
    const jwt = await AsyncStorage.getItem('jwt')
    const res = await fetch('https://superclasico-movil.now.sh/me', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })

    if (res.status === 401) {
      this.logout()
      return
    }

    const me = await res.json()

    this.setState({ me })
  }

  logout = async () => {
    await AsyncStorage.removeItem('jwt')
    this.props.navigation.navigate('Auth')
  }

  handleItemChange = item => {
    const { coordinates } = item
    this.setState({ coordinates })
  }

  render() {
    return (
      <View style={styles.container}>
        <Map canchas={canchas} coordinates={this.state.coordinates} />
        <Carousel canchas={canchas} onItemChange={this.handleItemChange} />
        <View style={styles.button} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  button: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'green',
  },

  button2: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'green',
  },

  overlay: {
    width: '100%',
    height: 70,
    backgroundColor: 'blue',
  },
})

export default HomeScreen
