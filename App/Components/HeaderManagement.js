import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Styles/HeaderManagementStyle';
import CustomIcon from './CustomIcon';

export default class HeaderManagement extends Component {
  static propTypes = {
    onClickEmail: PropTypes.func,
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={[styles.partContainer, styles.leftPart]}>
          <TouchableOpacity >
            <CustomIcon name="menu" />
          </TouchableOpacity>
          <View style={styles.leftTextContainer}>
            <Text style={styles.leftText}>Date Time</Text>
          </View>
          <TouchableOpacity>
            <CustomIcon />
          </TouchableOpacity>
        </View>
        <View style={[styles.partContainer, styles.rightPart]}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity>
              <CustomIcon />
            </TouchableOpacity>
            <TouchableOpacity>
              <CustomIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.leftTextContainer}>
            <Text style={styles.leftText}>Drawer Summary</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => this.props.onClickEmail()}>
              <CustomIcon name="mail" />
            </TouchableOpacity>
            <TouchableOpacity>
              <CustomIcon name="print" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
