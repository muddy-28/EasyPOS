import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text } from 'react-native'
import styles from './Styles/ProductBigStyle'
import { Images } from '../Themes'

export default class ProductBig extends Component {
  static propTypes = {
    productImage: PropTypes.string,
    productLabel: PropTypes.string,
  }
  
  render () {
    return (
      <View style={styles.container}>
        {/* <Image source={this.props.productImage ? {uri: this.props.productImage} : Images.product} style={styles.productImage} /> */}
        <Image source={this.props.productImage ? Images.product : {uri: 'https://firebasestorage.googleapis.com/v0/b/kontact-101d5.appspot.com/o/1.png?alt=media&token=8c04f679-144e-43a3-b53a-b2a97b8b31d8'}} style={styles.productImage} />
        <Text style={styles.productLabel}>{this.props.productLabel}</Text>
      </View>
    )
  }
}
