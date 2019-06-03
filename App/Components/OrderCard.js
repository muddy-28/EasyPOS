import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styles from './Styles/OrderCardStyle'

export default class OrderCard extends Component {
  static propTypes = {
    order: PropTypes.object,
  }

  render () {
    let order = this.props.order;
    return (
      <View 
        style={[
          styles.container, 
          order.kind=='red' ? styles.redBorder : order.kind=='green' ? styles.greenBorder : order.kind=='blue' ? styles.blueBorder : styles.orangeBorder
        ]}
      >
        <View style={styles.infoRow}>
          <Text style={styles.orderNo}>{'#' + order.no}</Text>
          <Text style={styles.orderPrice}>{'$' + order.price.toFixed(2)}</Text>
        </View>
        {
          order.name ? 
            <View style={[
              styles.nameRow,
              order.kind=='red' ? styles.redBackground : order.kind=='green' ? styles.greenBackground : order.kind=='blue' ? styles.blueBackground : styles.orangeBackground
            ]}>
              <Text style={styles.orderName}>{order.name}</Text>
            </View> 
          : 
            null
        }
      </View>
    )
  }
}
