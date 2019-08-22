import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import styles from './Styles/ModalAddCartStyle'
import CustomIcon from './CustomIcon'
import { ApplicationStyles } from '../Themes';

export default class ModalAddCart extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    productSizes: PropTypes.array,
    productColors: PropTypes.array,
    productNumber: PropTypes.number,
    productPrice: PropTypes.number,
    productAvailableNumber: PropTypes.number,
    productSelectedSizeIndex: PropTypes.number,
    productSelectedColorIndex: PropTypes.number,
    onClose: PropTypes.func,
    onClickAdd: PropTypes.func,
    onProcProductNumber: PropTypes.func,
    onChangeProductSelectedSizeIndex: PropTypes.func,
    onChangeProductSelectedColorIndex: PropTypes.func,
  }

  render () {
    const numPerRow = 6;

    return (
      <Modal animationType="slide" transparent={true} visible={this.props.visible} supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}>
        <View style={styles.screenContainer}>
          <View style={styles.modal}>
            <View style={[styles.titleRow, styles.borderRow]}>
              <TouchableOpacity onPress={() => this.props.onClose()}><CustomIcon name="black_close" /></TouchableOpacity>
              <Text style={styles.title}>Add: Product</Text>
              <TouchableOpacity onPress={() => this.props.onClickAdd()}><CustomIcon name="black_add" /></TouchableOpacity>
            </View>
            <View style={[styles.commonRow, styles.secondRow, styles.borderRow]}>
              <TouchableOpacity 
                disabled={this.props.productNumber == 1} 
                onPress={() => this.props.onProcProductNumber(-1)} 
                style={[styles.setCountButton, this.props.productNumber != 1 ? ApplicationStyles.shadow : null]}
              >
                <CustomIcon name="remove" />
              </TouchableOpacity>
              <View style={styles.displayNumberContainer}>
                <Text style={styles.displayNumber}>{this.props.productNumber}</Text>
              </View>
              <TouchableOpacity onPress={() => this.props.onProcProductNumber(1)} style={[styles.setCountButton, ApplicationStyles.shadow]}>
                <CustomIcon name="add" />
              </TouchableOpacity>
            </View>
            <View style={[styles.commonRow, styles.thirdRow, styles.borderRow]}>
              <Text style={styles.productPrice}>{'$' + this.props.productPrice.toFixed(2)}</Text>
              <View style={[styles.commonRow, styles.productAvailableRow]}>
                <Text style={styles.productAvailableLabel}>Available quantity: </Text>
                <Text style={styles.productAvailableNumber}>{this.props.productAvailableNumber}</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
