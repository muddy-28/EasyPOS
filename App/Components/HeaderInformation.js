import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'

import styles from './Styles/HeaderInformationStyle'
import CustomIcon from './CustomIcon'
import { shadeColor } from '../Lib/helpers'
import { Colors } from '../Themes'

export default class HeaderInformation extends Component {
  static propTypes = {
    onClickFirstLeftButton: PropTypes.func,
    onClickFirstRightButton: PropTypes.func,
    onClickSecondLeftButton: PropTypes.func,
    onClickSecondRightButton: PropTypes.func,
    firstTitle: PropTypes.string,
    secondTitle: PropTypes.string,
    firstLeftIcon: PropTypes.string,
    firstRightIcon: PropTypes.string,
    secondLeftIcon: PropTypes.string,
    secondRightIcon: PropTypes.string,
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={[styles.partContainer, styles.leftPart, {borderColor: shadeColor(Colors.mainColor, -10)}]}>
          <TouchableOpacity onPress={() => this.props.onClickFirstLeftButton()}>
            <CustomIcon name={this.props.firstLeftIcon} />
          </TouchableOpacity>
          <View style={styles.leftTextContainer}>
            <Text style={styles.leftText}>{this.props.firstTitle}</Text>
          </View>
          <TouchableOpacity onPress={() => this.props.onClickFirstRightButton()}>
            <CustomIcon name={this.props.firstRightIcon} />
          </TouchableOpacity>
        </View>
        <View style={[styles.partContainer, styles.rightPart]}>
          <TouchableOpacity onPress={() => this.props.onClickSecondLeftButton()}>
            <CustomIcon name={this.props.secondLeftIcon} />
          </TouchableOpacity>
          <View style={styles.leftTextContainer}>
            <Text style={styles.leftText}>{this.props.secondTitle}</Text>
          </View>
          <TouchableOpacity onPress={() => this.props.onClickSecondRightButton()}>
            <CustomIcon name={this.props.secondRightIcon} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
