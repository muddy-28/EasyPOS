import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Modal, Image, TouchableOpacity } from 'react-native'
import { SearchBar } from 'react-native-elements'
import styles from './Styles/ModalCustomersStyle'
import { Images, Colors } from '../Themes'

export default class ModalCustomers extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    customers: PropTypes.array,
    customerSearchString: PropTypes.string,
    onChangeCustomerSearchString: PropTypes.func,
    onSelectCustomer: PropTypes.func,
  }

  render () {
    return (
      <Modal animationType="slide" transparent={true} visible={this.props.visible}>
        <View style={styles.screenContainer}>
          <View style={styles.customersModalContainer}>
            <View style={styles.customersModal}>
              <View style={styles.customersModalSearchBar}>
                <SearchBar
                  placeholder="Search Customer"
                  autoCapitalize='none'
                  placeholderTextColor={Colors.text2}
                  value={this.props.customerSearchString}
                  onChangeText={(str) => this.props.onChangeCustomerSearchString(str)}
                  inputStyle={styles.customersModalSearchInputStyle}
                  containerStyle={styles.customersModalSearchContainer}
                  inputContainerStyle={styles.customersModalSearchInputContainer}
                />
              </View>
              {this.props.customers.map((c, i) => {
                return (
                  <TouchableOpacity 
                    key={'mc_' + i.toString()}
                    style={[styles.customersModalCustomerBar, i == this.props.customers.length - 1 ? styles.customersModalLastCustomerBar : null]} 
                    onPress={() => this.props.onSelectCustomer(c.id)}
                  >
                    <Image source={Images.customer} resizeMode='cover' style={styles.customersModalCustomerImage} />
                    <View style={[styles.customersModalCustomerInfoContainer, i == this.props.customers.length - 1 ? styles.customersModalLastCustomerInfoContainer : null]}>
                      <Text style={styles.customersModalCustomerName}>{c.name}</Text>
                      <Text style={styles.customersModalCustomerPhone}>{c.phone}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Image source={Images.tailRight} style={styles.tailRightImage} />
          </View>
        </View>
      </Modal>
    )
  }
}
