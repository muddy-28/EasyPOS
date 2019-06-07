import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Image, Text } from 'react-native'
import styles from './Styles/ProductBigStyle'
import { Images } from '../Themes'

export default class ProductBig extends Component {
  static propTypes = {
    productImage: PropTypes.object,
    productLabel: PropTypes.string,
    onPress: PropTypes.func,
  }
  
  render () {
    return (
      <TouchableOpacity style={[styles.container]} onPress={() => this.props.onPress()}>
        <Image source={this.props.productImage && this.props.productImage.url ? {uri: this.props.productImage.url} : Images.product} style={styles.productImage} />
        <Text style={styles.productLabel}>{this.props.productLabel}</Text>
      </TouchableOpacity>
    )
  }
}
