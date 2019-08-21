import React, { Component } from 'react';
import { View, ScrollView, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

// Styles
import styles from './Styles/InventoryScreenStyle';
import HeaderInformation from '../Components/HeaderInformation';
import { Images, Colors } from '../Themes';
import CustomIcon from '../Components/CustomIcon';

class InventoryScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      data: [
        {label: 'Product', icon: 'tag'},
        {label: 'Package', icon: 'dropbox'},
        {label: 'Discount', icon: 'cut_dollar'},
      ],
      products: [
        {name: "Strappy jean shoes", description: "Strappy jean shoes, size 42", cost: 175, num: 1},
        {name: "Bag Denim", description: "Bag Denim Leather, Black", cost: 40, num: 3},
        {name: "Levi's Collection", description: "Levi's Collection", cost: 45, num: 1},
      ],
    }
  }

  renderHeader() {
    return (
      <HeaderInformation
        firstTitle='Inventory'
        secondTitle={this.state.data[this.state.selectedIndex].label}
        firstLeftIcon="menu"
        firstRightIcon=""
        secondLeftIcon=""
        secondRightIcon="mail"
        onClickFirstLeftButton={() => this.setState()}
        onClickFirstRightButton={() => this.setState()}
        onClickSecondLeftButton={() => this.setState({})}
        onClickSecondRightButton={() => this.setState({})}
      />
    );
  }

  renderLeftPanel() {
    return (
      <ScrollView style={styles.leftPanelContainer}>
        <View style={styles.panel}>
          <View style={[styles.tableContainer, {marginTop: 16,}]}>
            {/* <FlatList
              data={this.state.data}
              renderItem={(item, index) => this.renderRow(item, index)}
              keyExtractor={item => item.label}
              ItemSeparatorComponent={this.renderSeparator}
            /> */}
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

  renderRow ({item, index}) {
    return (
      <TouchableOpacity 
        onPress={() => this.setState({selectedIndex: index})}
        style={[styles.commonRow, styles.itemRow, this.state.selectedIndex == index ? styles.selectedRow : null]}
      >
        <CustomIcon name={this.state.selectedIndex == index ? item.icon : 'black_' + item.icon} />
        <Text style={[this.state.selectedIndex == index ? styles.text2 : styles.text1, {marginLeft: 4}]}>{item.label}</Text>
      </TouchableOpacity>
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
            {this.state.selectedIndex == 0 ? this.renderProducts() : null}
          </View>
        </View>
      </ScrollView>
    );
  }

  renderProducts() {
    return (
      <FlatList 
        data={this.state.products}
        renderItem={(item, index) => this.renderProductRow(item, index)}
        keyExtractor={item => item.name}
      />
    );
  }

  renderProductRow({item, index}) {
    return (
      <View style={[styles.commonRow, styles.productRow]}>
        <View style={styles.productFirstCol}>
          <Image source={Images.product} style={styles.productImage} resizeMode='cover' />
        </View>
        <View style={[styles.productSecondCol, index == this.state.products.length - 1 ? {borderBottomWidth: 0} : null]}>
          <View style={styles.productInfoCol}>
            <Text style={styles.text1}>{item.name}</Text>
            <Text style={[styles.text3, {marginVertical: 8}]}>{item.description}</Text>
          </View>
          <View style={styles.productCostCol}>
            {/* {item.num > 1 ? <Text style={styles.text2}>{item.num.toString() + " X " + "$" + item.cost.toFixed(2) + " = "}</Text> : null} */}
            {item.num == 1 ? <Text style={styles.text1}>{"$" + item.cost.toFixed(2)}</Text> : null}
          </View>
          <View style={styles.productCostCol}>
            <Text style={styles.text1}>{"$" + (item.num * item.cost).toFixed(2)}</Text>
          </View>
        </View>
      </View>
);
  }

  render () {
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

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryScreen)
