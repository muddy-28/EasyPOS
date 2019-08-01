import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import styles from './Styles/ModalPasscodeStyle';
import CustomIcon from './CustomIcon';

export default class ModalPasscode extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    passcode: PropTypes.array,
    onClickNumKey: PropTypes.func,
    onClickClear: PropTypes.func,
    onClickEnter: PropTypes.func,
  }

  render () {
    let clickable = this.props.passcode.length < 4;
    let clearable = this.props.passcode.length != 0;
    let enterable = this.props.passcode.length == 4;

    return (
      <Modal animationType="slide" transparent={true} visible={this.props.visible} supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}>
        <View style={styles.screenContainer}>
          <View style={styles.modal}>
            <View style={[styles.titleRow, styles.borderRow]}>
              <TouchableOpacity onPress={() => this.props.onClose()}><CustomIcon name="black_back" /></TouchableOpacity>
              <Text style={styles.title}>Enter passcode</Text>
              <TouchableOpacity><CustomIcon /></TouchableOpacity>
            </View>
            <View style={styles.displayContainer}>
              <View style={styles.displayRow}>
                <View style={styles.displayCol}>
                  <Text style={styles.text3}>{this.props.passcode.length > 0 ? this.props.passcode[0].toString() : '_'}</Text>
                </View>
                <View style={styles.displayCol}>
                  <Text style={styles.text3}>{this.props.passcode.length > 1 ? this.props.passcode[1].toString() : '_'}</Text>
                </View>
                <View style={styles.displayCol}>
                  <Text style={styles.text3}>{this.props.passcode.length > 2 ? this.props.passcode[2].toString() : '_'}</Text>
                </View>
                <View style={[styles.displayCol, {borderRightWidth: 0}]}>
                  <Text style={styles.text3}>{this.props.passcode.length > 3 ? this.props.passcode[3].toString() : '_'}</Text>
                </View>
              </View>
            </View>
            <View style={styles.keypadRow}>
              <TouchableOpacity disabled={!clickable} onPress={() => this.props.onClickNumKey(7)} style={[styles.keypad, styles.numKeypad]}>
                <Text style={clickable ? styles.text1 : styles.text2}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={!clickable} onPress={() => this.props.onClickNumKey(8)} style={[styles.keypad, styles.numKeypad]}>
                <Text style={clickable ? styles.text1 : styles.text2}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={!clickable} onPress={() => this.props.onClickNumKey(9)} style={[styles.keypad, styles.numKeypad]}>
                <Text style={clickable ? styles.text1 : styles.text2}>9</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.keypadRow}>
              <TouchableOpacity disabled={!clickable} onPress={() => this.props.onClickNumKey(4)} style={[styles.keypad, styles.numKeypad]}>
                <Text style={clickable ? styles.text1 : styles.text2}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={!clickable} onPress={() => this.props.onClickNumKey(5)} style={[styles.keypad, styles.numKeypad]}>
                <Text style={clickable ? styles.text1 : styles.text2}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={!clickable} onPress={() => this.props.onClickNumKey(6)} style={[styles.keypad, styles.numKeypad]}>
                <Text style={clickable ? styles.text1 : styles.text2}>6</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.keypadRow}>
              <TouchableOpacity disabled={!clickable} onPress={() => this.props.onClickNumKey(1)} style={[styles.keypad, styles.numKeypad]}>
                <Text style={clickable ? styles.text1 : styles.text2}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={!clickable} onPress={() => this.props.onClickNumKey(2)} style={[styles.keypad, styles.numKeypad]}>
                <Text style={clickable ? styles.text1 : styles.text2}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={!clickable} onPress={() => this.props.onClickNumKey(3)} style={[styles.keypad, styles.numKeypad]}>
                <Text style={clickable ? styles.text1 : styles.text2}>3</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.keypadRow}>
              <TouchableOpacity disabled={!clearable} onPress={() => this.props.onClickClear()} style={[styles.keypad, styles.numKeypad]}>
                <Text style={clearable ? styles.clearText : styles.disableClearText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={!clickable} onPress={() => this.props.onClickNumKey(0)} style={[styles.keypad, styles.numKeypad]}>
                <Text style={clickable ? styles.text1 : styles.text2}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={!enterable} onPress={() => this.props.onClickEnter()} style={[styles.keypad, styles.numKeypad]}>
                <Text style={enterable ? styles.enterText : styles.disableClearText}>Enter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
