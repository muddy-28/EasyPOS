import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Modal, Picker } from 'react-native';
import styles from './Styles/ModalPickerStyle';
import CustomIcon from './CustomIcon';
import { Colors } from '../Themes';


export default class ModalPicker extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    data: PropTypes.array,
    onClose: PropTypes.func,
    selectedIndex: PropTypes.number,
    onValueChange: PropTypes.func,
  }

  render () {
    return (
      <Modal animationType="slide" transparent={true} visible={this.props.visible}>
        <View style={styles.screenContainer}>
          <View style={styles.modal}>
            <Picker 
              style={styles.picker}
              selectedValue={this.props.data[this.props.selectedIndex].value}
              onValueChange={(value, index) => this.props.onValueChange(value, index)}
            >
              {
                this.props.data.map((item, index) => {
                  return <Picker.Item key={index.toString()} label={item.label} value={item.value} />
                })
              }
            </Picker>
            <TouchableOpacity style={styles.button} onPress={() => this.props.onClose()}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}
