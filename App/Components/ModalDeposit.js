import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import styles from './Styles/ModalDepositStyle';
import CustomIcon from './CustomIcon';
import { Colors } from '../Themes';

export default class ModalDeposit extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    modalTitle: PropTypes.string,
    onClose: PropTypes.func,
    onClickSave: PropTypes.func,
  }

  render () {
    return (
      <Modal animationType="slide" transparent={true} visible={this.props.visible} supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}>
        <View style={styles.screenContainer}>
          <View style={styles.modal}>
            <View style={[styles.titleRow, styles.borderRow]}>
              <TouchableOpacity onPress={() => this.props.onClose()}><CustomIcon name="black_close" /></TouchableOpacity>
              <Text style={styles.title}>{this.props.modalTitle}</Text>
              <TouchableOpacity onPress={() => this.props.onClickSave()}><CustomIcon name="black_save" /></TouchableOpacity>
            </View>
            <View style={styles.bodyContainer}>
              <View style={[styles.inputRow, styles.borderRow]}>
                <Text style={styles.text1}>Amount</Text>
                <Text style={styles.text2}>$0.00</Text>
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.text1}>Description</Text>
                <Text style={styles.text2}></Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
