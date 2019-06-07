import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import styles from './Styles/ModalAddProductStyle'
import CustomIcon from './CustomIcon'
import { ApplicationStyles } from '../Themes';

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
    const numPerRow = 6;

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
            {
              this.props.productColors.map((ac, ai) => {
                if (ai % numPerRow == 0) {
                  return (
                    <View key={"a_" + ai.toString()} style={styles.buttonsRow}>
                      {
                        this.props.productColors.filter((bc, bi) => bi >= ai && bi < ai + numPerRow).map((cc, ci) => {
                          return (
                            <TouchableOpacity 
                              key={'color_' + ci.toString()} 
                              style={[styles.button, styles.commonRow, this.props.productSelectedColorIndex == (ai + ci) ? styles.selectedButton : null]}
                              onPress={() => this.props.onChangeProductSelectedColorIndex(ai + ci)}
                            >
                              <Text style={[this.props.productSelectedColorIndex == (ai + ci) ? styles.selectedButtonText : styles.buttonText]}>{cc}</Text>
                            </TouchableOpacity>
                          )
                        })
                      }
                    </View>
                  )
                }
              })
            }
          </View>
        </View>
      </Modal>
    )
  }
}
