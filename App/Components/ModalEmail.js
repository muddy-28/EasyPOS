import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import styles from './Styles/ModalEmailStyle';
import CustomIcon from './CustomIcon';
import { Colors } from '../Themes';

export default class ModalEmail extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onClickSend: PropTypes.func,
  }

  render () {
    return (
      <Modal animationType="slide" transparent={true} visible={this.props.visible} supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}>
        <View style={styles.screenContainer}>
          <View style={styles.modal}>
            <View style={[styles.titleRow, styles.borderRow]}>
              <TouchableOpacity onPress={() => this.props.onClose()}><CustomIcon name="black_close" /></TouchableOpacity>
              <Text style={styles.title}>Email Drawer Report</Text>
              <TouchableOpacity><CustomIcon /></TouchableOpacity>
            </View>
            <View style={styles.bodyContainer}>
              <View style={styles.emailBar}>
                <CustomIcon name='green_mail' />
                <Text style={[styles.email, styles.text1]}>Email</Text>
                <TouchableOpacity onPress={() => this.props.onClickSend()} style={styles.button}>
                  <Text style={styles.text2}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
