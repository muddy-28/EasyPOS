import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native'
import { DrawerActions } from 'react-navigation'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/ActivitesScreenStyle'
import PosAction from '../Redux/PosRedux'
import HeaderInformation from '../Components/HeaderInformation'
import { Images } from '../Themes'

class ActivitesScreen extends Component {
  constructor (props) {
    super(props)

    const { state: {params} } = this.props.navigation.dangerouslyGetParent();

    this.state = {
      company_id: params.company_id,
      register_id: params.register_id,

      selectedReceiptItemId: 1,
      receipts: [
        {date: 'Tuesday, 27 May 2014', items: [
          {id: 1, no: '#ST01_141223_003', price: 43.20, time: '13:42 PM', manager: 'Eric Johnson', products: []},
          {id: 2, no: '#ST01_141223_002', price: 340.80, time: '11:50 PM', manager: 'Eric Johnson', products: [
            {name: 'Strappy jean shoes', description: 'Strappy jean shoes, size 42', price: 175, num: 1},
            {name: 'Bag Denim', description: 'Bag Denim Leather, Black', price: 40, num: 3},
            {name: "Levi's Collection", description: "Levi's collection", price: 45, num: 1},
          ]},
          {id: 3, no: '#ST01_141223_001', price: 43.20, time: '8:28 PM', manager: 'Stanko Markovic', products: []},
        ]},
        {date: 'Monday, 26 May 2014', items: [
          {id: 4, no: '#ST01_141221_003', price: 127.30, time: '10:00 AM', manager: 'Petar Savic', products: []},
          {id: 5, no: '#ST01_141221_002', price: 47.50, time: '9:34 AM', manager: 'Eric Johnson', products: []},
          {id: 6, no: '#ST01_141221_001', price: 86.10, time: '8:10 AM', manager: 'Stanko Markovic', products: []},
        ]},
      ],
    }
  }

  componentWillMount() {
    const token = this.props.user.token;
    this.props.getTransactions(token, {company_id: this.state.company_id, register_id: this.state.register_id});
  }

  onClickMenu() {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }

  renderHeader() {
    return (
      <HeaderInformation
        firstTitle='All Receipts'
        secondTitle='Information'
        firstLeftIcon="menu"
        onClickFirstLeftButton={() => this.onClickMenu()}
      />
    );
  }

  renderLeftPanel() {
    return (
      <ScrollView style={styles.leftPanelContainer}>
        <View style={styles.panel}>
          {
            this.state.receipts.map((receipt, index) => {
              return (
                <View key={'Receipt_' + index.toString()} style={[styles.receiptContainer, index == this.state.receipts.length - 1 ? styles.endReceiptContainer : null]}>
                  <View style={styles.dateRow}>
                    <Text style={styles.text1}>{receipt.date}</Text>
                  </View>
                  {
                    receipt.items.map((item, i) => {
                      return (
                        <TouchableOpacity 
                          key={'Item_' + index.toString() + '_' + i.toString()} 
                          style={[styles.itemRow, item.id == this.state.selectedReceiptItemId ? styles.selectedItemRow : null]}
                          onPress={() => this.setState({selectedReceiptItemId: item.id})}
                        >
                          <View style={[styles.itemContentsContainer, item.id == this.state.selectedReceiptItemId ? styles.selectedITemContentsContainer : i == receipt.items.length - 1 ? styles.endItemContentsContainer : i == 0 ? styles.startItemContentsContainer : null]}>
                            <View style={styles.firstInfoRow}>
                              <Text style={[styles.text1, item.id == this.state.selectedReceiptItemId ? styles.selectedText : null]}>{item.no}</Text>
                              <Text style={[styles.text1, item.id == this.state.selectedReceiptItemId ? styles.selectedText : null]}>{item.time}</Text>
                            </View>
                            <View style={styles.secondInfoRow}>
                              <Text style={[styles.text2, item.id == this.state.selectedReceiptItemId ? styles.selectedText : null]}>{'$ ' + item.price.toFixed(2)}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })
                  }
                </View>
              );
            })
          }
        </View>
      </ScrollView>
    );
  }

  renderRightPanel() {
    let selectedItem;
    let selectedReceipt;

    this.state.receipts.forEach((receipt) => {
      receipt.items.forEach((item) => {
        if (item.id == this.state.selectedReceiptItemId) {
          selectedReceipt = receipt;
          selectedItem = item;
        }
      })
    })

    return (
      <ScrollView style={styles.rightPanelContainer}>
        <View style={styles.panel}>
          <View style={styles.companyInfoBar}>
            <Text style={styles.text3}>EASYPOS RETAILS</Text>
            <Text style={[styles.text2, {marginTop: 8}]}>Address: 1101 WestLake Avenue, Suite 200 Seattle, WA 98121, USA</Text>
            <Text style={[styles.text2, {marginTop: 2,}]}>Phone: +84 0905 07 00 17  -  Email: sales@easypos.com</Text>
          </View>
          <View style={[styles.commonRow, styles.firstRow]}>
            <View style={styles.leftCol}>
              <View style={styles.labelCol}>
                <Text style={[styles.text4]}>Receipt # :</Text>
                <Text style={[styles.text4]}>Manager :</Text>
                <Text style={[styles.text4]}>Date :</Text>
              </View>
              <View style={styles.labelCol}>
                <Text>{selectedItem.no}</Text>
                <Text>{selectedItem.manager}</Text>
                <Text>{selectedReceipt.date}</Text>
              </View>
            </View>
            <View style={styles.rightCol}>
              <Image source={Images.qr} resizeMode='cover' style={styles.qr} />
            </View>
          </View>
          {
            selectedItem.products.map((product, index) => {
              return (
                <View key={"Product_" + index.toString()} style={[styles.commonRow, styles.secondRow]}>
                  <View style={styles.firstCol}>
                    <Text style={styles.text5}>{product.name}</Text>
                    <Text style={styles.text2}>{product.description}</Text>
                  </View>
                  <View style={styles.secondCol}>
                    {product.num > 1 ? <Text style={styles.text4}>{product.num.toString() + " X " + "$" + product.price.toFixed(2) + " = "}</Text> : null}
                    <Text>{"$" + (product.num * product.price).toFixed(2)}</Text>
                  </View>
                </View>
              );
            })
          }
          <View style={[styles.commonRow, styles.calcRow]}>
            <Text style={styles.text4}>Discount (10%)</Text>
            <Text>$17.00</Text>
          </View>
          <View style={[styles.commonRow, styles.calcRow]}>
            <Text style={styles.text4}>Sub Total</Text>
            <Text>$340.00</Text>
          </View>
          <View style={[styles.commonRow, styles.calcRow]}>
            <Text style={styles.text4}>VAT (10%)</Text>
            <Text>$34.00</Text>
          </View>
          <View style={[styles.commonRow, styles.calcRow]}>
            <Text style={styles.text4}>Service Charge (10%)</Text>
            <Text>$34.00</Text>
          </View>
          <View style={[styles.commonRow, styles.calcRow]}>
            <Text style={styles.text6}>TOTAL</Text>
            <Text style={styles.text6}>$391.00</Text>
          </View>
          <View style={[styles.commonRow, styles.calcRow]}>
            <Text style={styles.text4}>Cash</Text>
            <Text>$91.00</Text>
          </View>
          <View style={[styles.commonRow, styles.calcRow, {borderBottomWidth: 0}]}>
            <Text style={styles.text4}>Visa</Text>
            <Text>$300.00</Text>
          </View>
        </View>
      </ScrollView>
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

const mapStateToProps = ({pos}) => {
  return {
    user: pos.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTransactions: (token, params) => dispatch(PosAction.getTransactions(token, params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitesScreen)
