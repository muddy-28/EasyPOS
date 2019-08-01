import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import styles from './Styles/ModalAddInventoryStyle'
import CustomIcon from './CustomIcon'
import { ApplicationStyles } from '../Themes';

export default class ModalAddInventory extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onClickAdd: PropTypes.func,
  }

  render () {
    return (
      <Modal animationType="slide" transparent={true} visible={this.props.visible} supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}>
        <View style={styles.screenContainer}>
          <View style={styles.modal}>
            <View style={styles.titleRow}>
              <TouchableOpacity onPress={() => this.props.onClose()}><CustomIcon name="black_close" /></TouchableOpacity>
              <Text style={styles.title}>Add New Inventory</Text>
              <TouchableOpacity onPress={() => this.props.onClickAdd()}><CustomIcon name="black_add" /></TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <View style={styles.itemRow}>
              <View style={styles.labelCol}><Text style={styles.labelText}>Company</Text></View>
              <View style={styles.valueCol}></View>
            </View>
            <View style={styles.itemRow}>
              <View style={styles.labelCol}><Text style={styles.labelText}>Category</Text></View>
              <View style={styles.valueCol}></View>
            </View>
            <View style={styles.itemRow}>
              <View style={styles.labelCol}><Text style={styles.labelText}>Title</Text></View>
              <View style={styles.valueCol}></View>
            </View>
            <View style={styles.itemRow}>
              <View style={styles.labelCol}><Text style={styles.labelText}>Upc plu sku</Text></View>
              <View style={styles.valueCol}></View>
            </View>
            <View style={styles.itemRow}>
              <View style={styles.labelCol}><Text style={styles.labelText}>Description of item</Text></View>
              <View style={styles.valueCol}></View>
            </View>
            <View style={styles.itemRow}>
              <View style={styles.labelCol}><Text style={styles.labelText}>Price</Text></View>
              <View style={styles.valueCol}></View>
            </View>
            <View style={styles.itemRow}>
              <View style={styles.labelCol}><Text style={styles.labelText}>Supplier</Text></View>
              <View style={styles.valueCol}></View>
            </View>
            <View style={styles.itemRow}>
              <View style={styles.labelCol}><Text style={styles.labelText}>Image</Text></View>
              <View style={styles.valueCol}></View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
