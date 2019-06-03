import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import styles from './Styles/ModalAlertStyle'

export default class ModalAlert extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    texts: PropTypes.array,
    onClose: PropTypes.func,
  }

  render () {
    return (
      <Modal animationType="slide" transparent={true} visible={this.props.visible}>
        <View style={styles.screenContainer}>
          <View style={styles.modal}>
            <View style={styles.textsContainer}>
              {this.props.texts.map((text, index) => {
                return <Text key={'text_' + index.toString()} style={[styles.text, index == 0 ? null : styles.margin]}>{text}</Text>
              })}
            </View>
            <TouchableOpacity onPress={() => this.props.onClose()} style={styles.button}><Text style={styles.buttonText}>OK</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}
