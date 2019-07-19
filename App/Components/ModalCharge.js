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

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      isEmailError: true,
    }
  }

  refreshState() {
    this.setState({email: '', isEmailError: true})
  }

  validateEmail(text) {
    this.setState({email: text});
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({isEmailError: true});
    } else {
      this.setState({isEmailError: false});
    }
  }

  onCLickFinish() {
    this.props.onFinish(this.state.email);
    this.refreshState();
  }

  onClickClose() {
    this.props.onClose();
    this.refreshState();
  }

  render () {
    const disabled = this.state.isEmailError;

    return (
      <Modal animationType="slide" transparent={true} visible={this.props.visible}>
        <View style={styles.screenContainer}>
          <View style={styles.modal}>
            <View style={[styles.titleRow, styles.borderRow]}>
              <TouchableOpacity onPress={() => this.onClickClose()}><CustomIcon name="black_close" /></TouchableOpacity>
              <Text style={styles.title}>{this.props.title}</Text>
              <TouchableOpacity><CustomIcon /></TouchableOpacity>
            </View>
            <View style={styles.firstRow}>
              <Text style={styles.questionText}>Do you want to send the receipts?</Text>
              <TextInput 
                style={styles.input} 
                placeholder='Email Receipt' 
                placeholderTextColor={Colors.text2}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType="email-address"
                value={this.state.email}
                onChangeText={(text) => this.validateEmail(text)}
              />
              <TouchableOpacity disabled={disabled} style={styles.button} onPress={() => this.onCLickFinish()}>
                <Text style={[styles.buttonText, disabled ? {color: '#cccccc'} : null]}>Finish</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
