import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import styles from './Styles/ModalAddDiscountStyle'
import CustomIcon from './CustomIcon'

export default class ModalAddDiscount extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    selectedTabIndex: PropTypes.number,
    displayNumber: PropTypes.number,
    onEnter: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedTabIndex: this.props.selectedTabIndex,
      displayNumber: this.props.displayNumber.toString(),
    }
  }

  handleIndexChange = index => {
    this.setState({selectedTabIndex: index})
  };

  onClearDisplay() {
    this.setState({displayNumber: '0'})
  }

  onEnter() {
    if (this.state.selectedTabIndex == 0 && parseFloat(this.state.displayNumber) > 100) {
      Alert.alert('Error', "You need to enter the value under 100", [{text: 'Dismiss'}], {cancelable: false});
    } else {
      this.props.onEnter(this.state.selectedTabIndex, this.state.displayNumber)
    }
  }

  onClose() {
    this.setState({ selectedTabIndex: this.props.selectedTabIndex, displayNumber: this.props.displayNumber.toString() });
    this.props.onClose();
  }

  showDisplayNumber(st) {
    let orgVal = this.state.displayNumber;
    let newVal;

    switch (st) {
      case '.':
        newVal = orgVal.substr(orgVal.length - 1) === '.' ? orgVal : orgVal + '.';
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        newVal = orgVal === '0' ? st : orgVal + st;
        break;
      case '5%':
      case '10%':
      case '20%':
      case '30%':
      case '50%':
        newVal = st.substr(0, st.length - 1);
        break;
      default:
        break;
    }

    this.setState({displayNumber: newVal});
  }

  render () {
    return (
      <Modal animationType="slide" transparent={true} visible={this.props.visible}>
        <View style={styles.screenContainer}>
          <View style={styles.modal}>
            <View style={[styles.titleRow, styles.borderRow]}>
              <TouchableOpacity onPress={() => this.onClose()}><CustomIcon name="black_close" /></TouchableOpacity>
              <Text style={styles.title}>Add Discount</Text>
              <TouchableOpacity onPress={() => this.onClose()}><CustomIcon name="black_add" /></TouchableOpacity>
            </View>
            <View style={[styles.secondRow, styles.borderRow]}>
              <SegmentedControlTab
                values={['%', '$']}
                selectedIndex={this.state.selectedTabIndex}
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
                <Text style={styles.displayText}>{this.state.displayNumber}</Text>
              </View>
            </View>
            <View style={styles.keypadRow}>
              <TouchableOpacity onPress={() => this.showDisplayNumber('5%')} style={[styles.keypad/*, this.state.selectedFuncIndex == 0 ? styles.selectedButton : null*/]}>
                <Text style={[styles.funcText/*, this.state.selectedFuncIndex == 0 ? styles.selectedText : null*/]}>5%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.showDisplayNumber('10%')} style={[styles.keypad/*, this.state.selectedFuncIndex == 1 ? styles.selectedButton : null*/]}>
                <Text style={[styles.funcText/*, this.state.selectedFuncIndex == 1 ? styles.selectedText : null*/]}>10%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.showDisplayNumber('20%')} style={[styles.keypad/*, this.state.selectedFuncIndex == 2 ? styles.selectedButton : null*/]}>
                <Text style={[styles.funcText/*, this.state.selectedFuncIndex == 2 ? styles.selectedText : null*/]}>20%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.showDisplayNumber('30%')} style={[styles.keypad/*, this.state.selectedFuncIndex == 3 ? styles.selectedButton : null*/]}>
                <Text style={[styles.funcText/*, this.state.selectedFuncIndex == 3 ? styles.selectedText : null*/]}>30%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.showDisplayNumber('50%')} style={[styles.keypad/*, this.state.selectedFuncIndex == 4 ? styles.selectedButton : null*/]}>
                <Text style={[styles.funcText/*, this.state.selectedFuncIndex == 4 ? styles.selectedText : null*/]}>50%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onClearDisplay()} style={[styles.keypad]}>
                <Text style={[styles.clearText]}>Clear</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.keypadRow}>
              <TouchableOpacity onPress={() => this.showDisplayNumber('7')} style={[styles.keypad, styles.numKeypad]}>
                <Text style={styles.numText}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.showDisplayNumber('8')} style={[styles.keypad, styles.numKeypad]}>
                <Text style={styles.numText}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.showDisplayNumber('9')} style={[styles.keypad, styles.numKeypad]}>
                <Text style={styles.numText}>9</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.keypadRow}>
              <TouchableOpacity onPress={() => this.showDisplayNumber('4')} style={[styles.keypad, styles.numKeypad]}>
                <Text style={styles.numText}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.showDisplayNumber('5')} style={[styles.keypad, styles.numKeypad]}>
                <Text style={styles.numText}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.showDisplayNumber('6')} style={[styles.keypad, styles.numKeypad]}>
                <Text style={styles.numText}>6</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.keypadRow}>
              <TouchableOpacity onPress={() => this.showDisplayNumber('1')} style={[styles.keypad, styles.numKeypad]}>
                <Text style={styles.numText}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.showDisplayNumber('2')} style={[styles.keypad, styles.numKeypad]}>
                <Text style={styles.numText}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.showDisplayNumber('3')} style={[styles.keypad, styles.numKeypad]}>
                <Text style={styles.numText}>3</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.keypadRow}>
              <TouchableOpacity onPress={() => this.showDisplayNumber('.')} style={[styles.keypad, styles.numKeypad, styles.lastNumKeypad]}>
                <Text style={styles.numText}>.</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.showDisplayNumber('0')} style={[styles.keypad, styles.numKeypad, styles.lastNumKeypad]}>
                <Text style={styles.numText}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onEnter()} style={[styles.keypad, styles.numKeypad, styles.lastNumKeypad]}>
                <Text style={styles.enterText}>Enter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
