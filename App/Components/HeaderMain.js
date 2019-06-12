import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SearchBar } from 'react-native-elements'
import styles from './Styles/HeaderMainStyle'
import CustomIcon from './CustomIcon'
import { Colors } from '../Themes'

export default class HeaderMain extends Component {
  static propTypes = {
    productSelected: PropTypes.bool,
    searchSelected: PropTypes.bool,
    onClickProduct: PropTypes.func,
    onClickOrders: PropTypes.func,
    onClickSearch: PropTypes.func,
    onClickExpand: PropTypes.func,
    searchString: PropTypes.string,
    onChangeSearchText: PropTypes.func,
    onClearSearchText: PropTypes.func,
    cartNum: PropTypes.number,
    onClickAddProduct: PropTypes.func,
    onClickList: PropTypes.func,
  }

  renderSearchIcon() {
    return (
      <TouchableOpacity onPress={()=> this.props.onClickSearch()}>
        <CustomIcon name="search" />
      </TouchableOpacity>
    );
  }

  renderSearchTextBox() {
    return (
      <SearchBar
        placeholder="Search Product"
        autoCapitalize='none'
        // searchIcon={false}
        placeholderTextColor={Colors.text1}
        value={this.props.searchString}
        onChangeText={(str) => this.props.onChangeSearchText(str)}
        onClear={()=>this.props.onClearSearchText()}
        inputStyle={styles.searchInputStyle}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
      />
    );
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={[styles.partContainer, styles.leftPart]}>
          <View style={[styles.buttonsContainer, styles.leftButtons]}>
            <View style={styles.iconContainer}>
              <CustomIcon name="menu" />
            </View>
            <TouchableOpacity onPress={() => this.props.onClickProduct()} style={[styles.button, this.props.productSelected ? styles.selectedButton : null]}>
              <Text style={[styles.buttonText, this.props.productSelected ? styles.selectedButtonText : null]}>Product</Text>
              <TouchableOpacity onPress={() => this.props.onClickExpand()} style={styles.expandIcon}>
                <Icon name='chevron-down' size={24} color={this.props.productSelected ? Colors.mainColor : 'white'} />
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.onClickOrders()} style={[styles.button, this.props.productSelected ? null : styles.selectedButton]}>
              <Text style={[styles.buttonText, this.props.productSelected ? null : styles.selectedButtonText]}>Orders</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.buttonsContainer, styles.rightButtons]}>
            {this.props.searchSelected ? this.renderSearchTextBox() : this.renderSearchIcon()}
          </View>
        </View>
        <View style={[styles.partContainer, styles.rightPart]}>
          <TouchableOpacity onPress={() => this.props.onClickList()} style={[styles.buttonsContainer, styles.leftButtons]}>
            <CustomIcon name="list" />
          </TouchableOpacity>
          <View style={styles.rightTextContainer}>
            <Text style={styles.rightText}>Cart ({this.props.cartNum.toString()})</Text>
          </View>
          <TouchableOpacity onPress={() => this.props.onClickAddProduct()} style={[styles.buttonsContainer, styles.rightButtons]}>
            <CustomIcon name="add" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}