import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import styles from './Styles/ModalConfirmStyle'

export default class ModalConfirm extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    texts: PropTypes.array,
    buttons: PropTypes.array,
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
            <View style={styles.buttonsContainer}>
              {this.props.buttons.map((button, index) => {
                return (
                  <TouchableOpacity 
                    key={'button_' + index.toString()} 
                    onPress={() => this.props.onClose()} 
                    style={[styles.button, index == 0 ? {borderRightWidth: 1} : null]}
                  >
                    <Text style={[styles.buttonText, {color: button.color}]}>{button.label}</Text>
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
