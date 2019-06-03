import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'
import styles from './Styles/ProductSmallStyle'
import { Images } from '../Themes'

export default class ProductSmall extends Component {
  static propTypes = {
    productImage: PropTypes.string,
    productLabel: PropTypes.string,
    productNum: PropTypes.number,
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={this.props.productImage ? {uri: this.props.productImage} : Images.product} resizeMode='cover' style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{this.props.productLabel}</Text>
          <View style={styles.rightContainer}>
            <Text style={styles.limit}>Available quantity: </Text>
            <Text style={styles.limitNum}>{this.props.productNum}</Text>
          </View>
        </View>
      </View>
    )
  }
}
