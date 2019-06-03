import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import styles from './Styles/ModalAddDiscountStyle'
import CustomIcon from './CustomIcon'

export default class ModalAddDiscount extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    selectedTabIndex: PropTypes.number,
    onChangeTabIndex: PropTypes.func,
    displayNumber: PropTypes.number,
    selectedFuncIndex: PropTypes.number,
    onChangeFuncIndex: PropTypes.func,
    onChangeNumIndex: PropTypes.func,
    onClearDisplay: PropTypes.func,
    onCalcNums: PropTypes.func,
  }

  handleIndexChange = index => {
    this.props.onChangeTabIndex(index);
  };

  render () {
    return (
      <Modal animationType="slide" transparent={true} visible={this.props.visible}>
        <View style={styles.screenContainer}>
          <View style={styles.modal}>
            <View style={[styles.titleRow, styles.borderRow]}>
              <TouchableOpacity onPress={() => this.props.onClose()}><CustomIcon name="black_close" /></TouchableOpacity>
              <Text style={styles.title}>Add Discount</Text>
              <TouchableOpacity onPress={() => this.props.onClose()}><CustomIcon name="black_add" /></TouchableOpacity>
            </View>
            <View style={[styles.secondRow, styles.borderRow]}>
              <SegmentedControlTab
                values={['%', '$']}
                selectedIndex={this.props.selectedTabIndex}
                onTabPress={this.handleIndexChange}
                borderRadius={4}
                allowFontScaling={true}
                tabsContainerStyle={styles.tabsContainerStyle}
                tabStyle={styles.tabStyle}
                tabTextStyle={styles.tabTextStyle}
                activeTabStyle={styles.activeTabStyle}
                activeTabTextStyle={styles.activeTabTextStyle}
              />
            </View>
            <View style={[styles.thirdRow]}>
              <View style={styles.calcBar}>
                <Text style={styles.displayText}>{this.props.displayNumber}</Text>
              </View>
            </View>
            <View style={styles.keypadRow}>
              <TouchableOpacity onPress={() => this.props.onChangeFuncIndex(0)} style={[styles.keypad, this.props.selectedFuncIndex == 0 ? styles.selectedButton : null]}>
                <Text style={[styles.funcText, this.props.selectedFuncIndex == 0 ? styles.selectedText : null]}>5%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.onChangeFuncIndex(1)} style={[styles.keypad, this.props.selectedFuncIndex == 1 ? styles.selectedButton : null]}>
                <Text style={[styles.funcText, this.props.selectedFuncIndex == 1 ? styles.selectedText : null]}>10%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.onChangeFuncIndex(2)} style={[styles.keypad, this.props.selectedFuncIndex == 2 ? styles.selectedButton : null]}>
                <Text style={[styles.funcText, this.props.selectedFuncIndex == 2 ? styles.selectedText : null]}>20%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.onChangeFuncIndex(3)} style={[styles.keypad, this.props.selectedFuncIndex == 3 ? styles.selectedButton : null]}>
                <Text style={[styles.funcText, this.props.selectedFuncIndex == 3 ? styles.selectedText : null]}>30%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.onChangeFuncIndex(4)} style={[styles.keypad, this.props.selectedFuncIndex == 4 ? styles.selectedButton : null]}>
                <Text style={[styles.funcText, this.props.selectedFuncIndex == 4 ? styles.selectedText : null]}>50%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.onClearDisplay()} style={[styles.keypad]}>
                <Text style={[styles.clearText]}>Clear</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.keypadRow}>
              <TouchableOpacity onPress={() => this.props.onChangeNumIndex(7)} style={[styles.keypad, styles.numKeypad]}>
                <Text style={styles.numText}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.onChangeNumIndex(8)} style={[styles.keypad, styles.numKeypad]}>
                <Text style={styles.numText}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.onChangeNumIndex(9)} style={[styles.keypad, styles.numKeypad]}>
                <Text style={styles.numText}>9</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.keypadRow}>
              <TouchableOpacity onPress={() => this.props.onChangeNumIndex(4)} style={[styles.keypad, styles.numKeypad]}>
                <Text style={styles.numText}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.onChangeNumIndex(5)} style={[styles.keypad, styles.numKeypad]}>
                <Text style={styles.numText}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.onChangeNumIndex(6)} style={[styles.keypad, styles.numKeypad]}>
                <Text style={styles.numText}>6</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.keypadRow}>
              <TouchableOpacity onPress={() => this.props.onChangeNumIndex(1)} style={[styles.keypad, styles.numKeypad]}>
                <Text style={styles.numText}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.onChangeNumIndex(2)} style={[styles.keypad, styles.numKeypad]}>
                <Text style={styles.numText}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.onChangeNumIndex(3)} style={[styles.keypad, styles.numKeypad]}>
                <Text style={styles.numText}>3</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.keypadRow}>
              <TouchableOpacity onPress={() => this.props.onChangeNumIndex(10)} style={[styles.keypad, styles.numKeypad, styles.lastNumKeypad]}>
                <Text style={styles.numText}>.</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.onChangeNumIndex(0)} style={[styles.keypad, styles.numKeypad, styles.lastNumKeypad]}>
                <Text style={styles.numText}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.onCalcNums()} style={[styles.keypad, styles.numKeypad, styles.lastNumKeypad]}>
                <Text style={styles.enterText}>Enter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
