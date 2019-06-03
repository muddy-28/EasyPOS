import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native'
import styles from './Styles/ModalChargeStyle'
import CustomIcon from './CustomIcon'
import { Colors } from '../Themes'

export default class ModalCharge extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    onClose: PropTypes.func,
    onFinish: PropTypes.func,
  }

  render () {
    return (
      <Modal animationType="slide" transparent={true} visible={this.props.visible}>
        <View style={styles.screenContainer}>
          <View style={styles.modal}>
            <View style={[styles.titleRow, styles.borderRow]}>
              <TouchableOpacity onPress={() => this.props.onClose()}><CustomIcon name="black_close" /></TouchableOpacity>
              <Text style={styles.title}>{this.props.title}</Text>
              <TouchableOpacity><CustomIcon /></TouchableOpacity>
            </View>
            <View style={styles.firstRow}>
              <Text style={styles.questionText}>Do you want to send the receipts?</Text>
              <TextInput style={styles.input} placeholder='Email Receipt' placeholderTextColor={Colors.text2}></TextInput>
              <TouchableOpacity style={styles.button} onPress={() => this.props.onFinish()}>
                <Text style={styles.buttonText}>Finish</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
