import React, { Component } from 'react'
import { View, ScrollView, FlatList, Text, TouchableOpacity, Image } from 'react-native'
import { DrawerActions } from 'react-navigation'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/InventoryScreenStyle'
import HeaderInformation from '../Components/HeaderInformation'
import { Images, Colors } from '../Themes'
import CustomIcon from '../Components/CustomIcon'

class InventoryScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      data: [
        {label: 'Product', icon: 'tag'},
        {label: 'Discount', icon: 'cut_dollar'},
      ],
    }
  }

  onClickMenu() {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }

  renderHeader() {
    return (
      <HeaderInformation
        firstTitle='Inventory'
        secondTitle={this.state.data[this.state.selectedIndex].label}
        firstLeftIcon="menu"
        onClickFirstLeftButton={() => this.onClickMenu()}
      />
    );
  }

  renderLeftPanel() {
    return (
      <ScrollView style={styles.leftPanelContainer}>
        <View style={styles.panel}>
          <View style={[styles.tableContainer, {marginTop: 16,}]}>
            {
              this.state.data.map((item, index) => {
                return (
                  <View key={index.toString()}>
                    <TouchableOpacity 
                      onPress={() => this.setState({selectedIndex: index})}
                      style={[styles.commonRow, styles.itemRow, this.state.selectedIndex == index ? styles.selectedRow : null]}
                    >
                      <CustomIcon name={this.state.selectedIndex == index ? item.icon : 'black_' + item.icon} />
                      <Text style={[this.state.selectedIndex == index ? styles.text2 : styles.text1, {marginLeft: 4}]}>{item.label}</Text>
                    </TouchableOpacity>
                    {index != this.state.data.length - 1 ? this.renderSeparator() : null}
                  </View>
                );
              })
            }
          </View>
        </View>
      </ScrollView>
    );
  }

  renderSeparator() {
    return <View style={{backgroundColor: Colors.border, height: 1}} />
  }

  renderRightPanel() {
    return (
      <ScrollView style={styles.rightPanelContainer}>
        <View style={styles.panel}>
          <View style={styles.tableContainer}>
            {this.state.selectedIndex == 0 ? this.renderProducts() : this.renderDiscounts()}
          </View>
        </View>
      </ScrollView>
    );
  }

  renderProducts() {
    return (
      <FlatList 
        data={this.props.inventories}
        renderItem={(item, index) => this.renderProductRow(item, index)}
        keyExtractor={item => item.id.toString()}
      />
    );
  }

  renderProductRow({item, index}) {
    return (
      <View style={[styles.commonRow, styles.productRow]}>
        <View style={styles.productFirstCol}>
          <Image source={item.image && item.image.url ? {uri: item.image.url} : Images.product} style={styles.productImage} resizeMode='cover' />
        </View>
        <View style={[styles.productSecondCol, index == this.props.inventories.length - 1 ? {borderBottomWidth: 0} : null]}>
          <View style={styles.productInfoCol}>
            <Text style={styles.text1}>{item.title}</Text>
            <Text style={[styles.text3, {marginVertical: 8}]}>{item.upc_plu_sku}</Text>
          </View>
          <View style={styles.productCostCol}>
            <Text style={styles.text1}>{"$" + parseFloat(item.price).toFixed(2)}</Text>
          </View>
          <View style={styles.productQuantityCol}>
            <Text style={styles.text1}>{item.sub_quantity}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderDiscounts() {
    return (
      <FlatList 
        data={this.props.discounts}
        renderItem={(item, index) => this.renderDiscountRow(item, index)}
        keyExtractor={item => item.id.toString()}
      />
    );
  }

  renderDiscountRow({item, index}) {
    const inventories = this.props.inventories.filter((inv) => inv.id === item.inventory_id) || [{}]

    return (
      <View style={[styles.commonRow, styles.discountRow, index == this.props.discounts.length - 1 ? {borderBottomWidth: 0} : {borderBottomWidth: 1}]}>
        <Text style={styles.inventoryLabelCol}>{inventories[0].title}</Text>
        <Text style={styles.inventorySkuCol}>{inventories[0].upc_plu_sku}</Text>
        <Text style={styles.discountLabelCol}>{item.discount_name}</Text>
        <Text style={styles.discountValueCol}>{item.discount_value + "%"}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <View style={styles.bodyContainer}>
          {this.renderLeftPanel()}
          {this.renderRightPanel()}
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({pos}) => {
  return {
    inventories: pos.inventories,
    discounts: pos.discounts,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryScreen)
