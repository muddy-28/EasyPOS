import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, TextInput, Modal } from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import styles from './Styles/ModalPaymentStyle'
import CustomIcon from './CustomIcon'
import { Colors } from '../Themes'

export default class ModalPayment extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    selectedTabIndex: PropTypes.number,
    onClose: PropTypes.func,
    onChangeTabIndex: PropTypes.func,
    onClickTender: PropTypes.func,
  }

  handleIndexChange = index => {
    this.props.onChangeTabIndex(index);
  };

  renderCash() {
    return (
      <View style={styles.secondRow}>
        <View style={styles.buttonsRow}>
          <View style={styles.dotButton}><Text style={styles.dotButtonText}>$152.00</Text></View>
          <View style={styles.dotButton}><Text style={styles.dotButtonText}>$155.00</Text></View>
          <View style={styles.dotButton}><Text style={styles.dotButtonText}>$200.00</Text></View>
        </View>
        <View style={styles.cashDisplayBar}>
          <Text style={styles.price}>$151.80</Text>
          <TouchableOpacity onPress={() => this.props.onClickTender()} style={styles.tenderButton}>
            <Text style={styles.tenderButtonText}>TENDER</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderExternal() {
    return (
      <View style={styles.secondRow}>
        <View style={styles.buttonsRow}>
          <View style={styles.dotButton}><Text style={styles.dotButtonText}>Master Card</Text></View>
          <View style={styles.dotButton}><Text style={styles.dotButtonText}>Visa</Text></View>
          <View style={styles.dotButton}><Text style={styles.dotButtonText}>NETS</Text></View>
        </View>
        <View style={styles.externalDisplayBar}>
          <TextInput style={styles.textInput} placeholder='Input price' placeholderTextColor={Colors.text2} value='$151.80' />
          <TextInput style={[styles.textInput, {fontSize: 14}]} placeholder='Input approved code' placeholderTextColor={Colors.text2} />
        </View>
        <TouchableOpacity style={styles.payButton}><Text style={styles.payButtonText}>PAY</Text></TouchableOpacity>
      </View>
    );
  }

  render () {
    return (
      <Modal animationType="slide" transparent={true} visible={this.props.visible}>
        <View style={styles.screenContainer}>
          <View style={styles.modal}>
            <View style={[styles.titleRow, styles.borderRow]}>
              <TouchableOpacity onPress={() => this.props.onClose()}><CustomIcon name="black_close" /></TouchableOpacity>
              <Text style={styles.title}>$ 151.80</Text>
              <TouchableOpacity><CustomIcon /></TouchableOpacity>
            </View>
            <View style={[styles.firstRow, styles.borderRow]}>
              <SegmentedControlTab
                values={['Cash', 'External Terminal']}
                selectedIndex={this.props.selectedTabIndex}
                onTabPress={this.handleIndexChange}
                borderRadius={4}
                allowFontScaling={true}
                tabsContainerStyle={styles.tabsContainerStyle}
                tabStyle={styles.tabStyle}
                tabTextStyle={styles.tabTextStyle}
                activeTabStyle={styles.activeTabStyle}
                activeTabTextStyle={styles.activeTabTextStyle}
              />
            </View>
            {this.props.selectedTabIndex == 0 ? this.renderCash() : this.renderExternal()}
          </View>
        </View>
      </Modal>
    )
  }
}
