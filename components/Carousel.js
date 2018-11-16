import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image, Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native'

const windowWidth = Dimensions.get('window').width

import styled from 'styled-components/native'
import Carousel from 'react-native-snap-carousel'

export default class ThumbnailCarousel extends Component {
  handleSnapToItem = index => {
    const item = this.props.canchas[index]
    this.props.onItemChange(item)
  }

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.item} key={item.title}>
        <Image style={styles.image} source={{ uri: item.image }} />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Carousel
          data={this.props.canchas}
          renderItem={this.renderItem}
          onSnapToItem={this.handleSnapToItem}
          sliderWidth={windowWidth}
          itemWidth={300}
          inactiveSlideOpacity={1}
        />
      </View>
    )
  }
}

ThumbnailCarousel.propTypes = {
  onItemChange: PropTypes.func,
  canchas: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.string,
      coordinates: PropTypes.arrayOf(PropTypes.number),
    })
  ).isRequired,
}

ThumbnailCarousel.defaultProps = {
  onItemChange: () => console.warn('No te olvides de setear `onItemChange`'),
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
  },

  item: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
  },

  image: {
    top: 25,
    width: 300,
    height: 144,
    borderRadius: 10,
  },
})
