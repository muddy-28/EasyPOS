import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import styles from './Styles/ModalCountStyle'
import CustomIcon from './CustomIcon';
import { Colors } from '../Themes';

export default class ModalCount extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onClickDrawer: PropTypes.func,
  }

  render () {
    return (
      <Modal animationType="slide" transparent={true} visible={this.props.visible}>
        <View style={styles.screenContainer}>
          <View style={styles.modal}>
            <View style={[styles.titleRow, styles.borderRow]}>
              <TouchableOpacity onPress={() => this.props.onClose()}><CustomIcon name="black_close" /></TouchableOpacity>
              <Text style={styles.title}>Count in Drawer</Text>
              <TouchableOpacity><CustomIcon /></TouchableOpacity>
            </View>
            <View style={styles.bodyContainer}>
              <View style={styles.inputs}>
                <View style={[styles.inputRow, styles.borderRow]}>
                  <Text style={styles.text1}>Expected in Drawer</Text>
                  <Text style={styles.text2}>$20.00</Text>
                </View>
                <View style={[styles.inputRow, styles.borderRow]}>
                  <Text style={styles.text1}>Actual</Text>
                  <Text style={styles.text4}>Enter Amout</Text>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.text1}>Different</Text>
                  <Text style={styles.text2}>$0.00</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => this.props.onClickDrawer()} style={styles.button}>
                <Text style={styles.text3}>Close Drawer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
