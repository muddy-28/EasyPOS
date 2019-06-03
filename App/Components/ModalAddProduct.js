import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import styles from './Styles/ModalAddProductStyle'
import CustomIcon from './CustomIcon'

export default class ModalAddProduct extends Component {
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
    onProcProductNumber: PropTypes.func,
    onChangeProductSelectedSizeIndex: PropTypes.func,
    onChangeProductSelectedColorIndex: PropTypes.func,
  }

  render () {
    return (
      <Modal animationType="slide" transparent={true} visible={this.props.visible}>
        <View style={styles.screenContainer}>
          <View style={styles.modal}>
            <View style={[styles.titleRow, styles.borderRow]}>
              <TouchableOpacity onPress={() => this.props.onClose()}><CustomIcon name="black_close" /></TouchableOpacity>
              <Text style={styles.title}>Add: Product 1</Text>
              <TouchableOpacity onPress={() => this.props.onClose()}><CustomIcon name="black_add" /></TouchableOpacity>
            </View>
            <View style={[styles.commonRow, styles.secondRow, styles.borderRow]}>
              <TouchableOpacity onPress={() => this.props.onProcProductNumber(-1)} style={styles.setCountButton}>
                <CustomIcon name="remove" />
              </TouchableOpacity>
              <View style={styles.displayNumberContainer}>
                <Text style={styles.displayNumber}>{this.props.productNumber}</Text>
              </View>
              <TouchableOpacity onPress={() => this.props.onProcProductNumber(1)} style={styles.setCountButton}>
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
            <Text style={styles.size}>Size</Text>
            <View style={styles.buttonsRow}>
              {this.props.productSizes.map((size, i) => {
                return (
                  <TouchableOpacity 
                    key={'size_' + i.toString()} 
                    style={[styles.button, styles.commonRow, this.props.productSelectedSizeIndex == i ? styles.selectedButton : null]}
                    onPress={() => this.props.onChangeProductSelectedSizeIndex(i)}
                  >
                    <Text style={[this.props.productSelectedSizeIndex == i ? styles.selectedButtonText : styles.buttonText]}>{size}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={[styles.size, styles.color]}>Color</Text>
            <View style={styles.buttonsRow}>
              {this.props.productColors.filter((c, i) => i < 6).map((color, i) => {
                return (
                  <TouchableOpacity 
                    key={'color_' + i.toString()} 
                    style={[styles.button, styles.commonRow, this.props.productSelectedColorIndex == i ? styles.selectedButton : null]}
                    onPress={() => this.props.onChangeProductSelectedColorIndex(i)}
                  >
                    <Text style={[this.props.productSelectedColorIndex == i ? styles.selectedButtonText : styles.buttonText]}>{color}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={[styles.buttonsRow, styles.lastButtonsRow]}>
              {this.props.productColors.filter((c, i) => i >= 6).map((color, i) => {
                return (
                  <TouchableOpacity 
                    key={'color_' + (i + 6).toString()} 
                    style={[styles.button, styles.commonRow, this.props.productSelectedColorIndex == i + 6 ? styles.selectedButton : null]}
                    onPress={() => this.props.onChangeProductSelectedColorIndex(i + 6)}
                  >
                    <Text style={[this.props.productSelectedColorIndex == i + 6 ? styles.selectedButtonText : styles.buttonText]}>{color}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
