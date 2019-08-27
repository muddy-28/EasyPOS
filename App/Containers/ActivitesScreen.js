import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native'
import { DrawerActions, withNavigationFocus } from 'react-navigation'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/ActivitesScreenStyle'
import PosAction from '../Redux/PosRedux'
import HeaderInformation from '../Components/HeaderInformation'
import { splitDateTime } from '../Lib/helpers';

class ActivitesScreen extends Component {
  constructor (props) {
    super(props)

    const { state: {params} } = this.props.navigation.dangerouslyGetParent();

    this.state = {
      company_id: params.company_id,
      register_id: params.register_id,
      selectedTransaction: { inventory_transactions: [] },
    }
  }

  componentWillMount() {
    this.getTransactions();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isFocused && this.props.isFocused) {
      this.getTransactions();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.transactions && nextProps.transactions.length > 0 && !this.state.selectedTransaction.id) {
      this.setState({selectedTransaction: nextProps.transactions[0]});
    }
  }

  getTransactions() {
    const token = this.props.user.token;
    this.props.getTransactions(token, {company_id: this.state.company_id, register_id: this.state.register_id});
  }

  getProductDiscount(id) {
    const discounts = this.props.discounts.filter(d => d.inventory_id == id);
    return discounts.length > 0 ? parseFloat(discounts[0].discount_value) : 0;
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
    let exDate;
    return (
      <ScrollView style={styles.leftPanelContainer}>
        <View style={styles.panel}>
          {
            this.props.transactions.map((te, ti) => {
              const {date, time} = splitDateTime(te.created_at);
              const newRow = exDate != date;
              exDate = date;
              const selected = te.id == this.state.selectedTransaction.id;

              return (
                <View key={ti.toString()}>
                  {newRow ? <View style={styles.dateRow}><Text style={styles.text1}>{date}</Text></View> : null}
                  <TouchableOpacity style={[styles.itemRow, selected ? styles.selectedItemRow : null]} onPress={() => this.setState({selectedTransaction: te})}>
                    <View style={[styles.itemContentsContainer, selected ? styles.selectedITemContentsContainer : null]}>
                      <View style={styles.firstInfoRow}>
                        <Text style={[styles.text1, selected ? styles.selectedText : null]}>{te.order_number}</Text>
                        <Text style={[styles.text1, selected ? styles.selectedText : null]}>{time}</Text>
                      </View>
                      <View style={styles.secondInfoRow}>
                        <Text style={[styles.text2, selected ? styles.selectedText : null]}>{'$ ' + te.transaction_total}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    );
  }

  renderRightPanel() {
    const company_name = this.props.user.companies.filter(c => c.id == this.state.company_id)[0].name_of_company;

    return (
      <ScrollView style={styles.rightPanelContainer}>
        <View style={styles.panel}>
          <View style={styles.companyInfoBar}>
            <Text style={styles.text3}>EASYPOS RETAILS</Text>
            {/* <Text style={[styles.text2, {marginTop: 8}]}>Address: 1101 WestLake Avenue, Suite 200 Seattle, WA 98121, USA</Text>
            <Text style={[styles.text2, {marginTop: 2,}]}>Phone: +84 0905 07 00 17  -  Email: sales@easypos.com</Text> */}
          </View>
          <View style={[styles.commonRow, styles.firstRow]}>
            <View style={styles.leftCol}>
              <View style={styles.labelCol}>
                <Text style={[styles.text4]}>Receipt # :</Text>
                <Text style={[styles.text4]}>Manager :</Text>
                <Text style={[styles.text4]}>Date :</Text>
              </View>
              <View style={styles.labelCol}>
                <Text>{this.state.selectedTransaction.order_number}</Text>
                <Text>{company_name}</Text>
                <Text>{splitDateTime(this.state.selectedTransaction.created_at).date}</Text>
              </View>
            </View>
            <View style={styles.rightCol}>
              {/* <Image source={Images.qr} resizeMode='cover' style={styles.qr} /> */}
            </View>
          </View>
          {
            this.state.selectedTransaction.inventory_transactions.map((product, index) => {
              let inventory = this.props.inventories.filter(inv => inv.id == product.inventory_id)[0];
              let price = parseFloat(inventory.price) * (1 - this.getProductDiscount(inventory.id) / 100);
              return (
                <View key={"Product_" + index.toString()} style={[styles.commonRow, styles.secondRow]}>
                  <View style={styles.firstCol}>
                    <Text style={styles.text5}>{inventory.title}</Text>
                    <Text style={styles.text2}>{inventory.upc_plu_sku}</Text>
                  </View>
                  <View style={styles.secondCol}>
                    {product.quantity > 1 ? <Text style={styles.text4}>{product.quantity + " X " + "$" + price + " = "}</Text> : null}
                    <Text>{"$" + (product.quantity * price).toFixed(2)}</Text>
                  </View>
                </View>
              );
            })
          }
          <View style={[styles.commonRow, styles.calcRow]}>
            <Text style={styles.text4}>Discount</Text>
            <Text>${this.state.selectedTransaction.discount_value}</Text>
          </View>
          <View style={[styles.commonRow, styles.calcRow]}>
            <Text style={styles.text4}>Sub Total</Text>
            <Text>${this.state.selectedTransaction.value}</Text>
          </View>
          <View style={[styles.commonRow, styles.calcRow]}>
            <Text style={styles.text4}>VAT</Text>
            <Text>${this.state.selectedTransaction.tax_value}</Text>
          </View>
          <View style={[styles.commonRow, styles.calcRow]}>
            <Text style={styles.text6}>TOTAL</Text>
            <Text style={styles.text6}>${this.state.selectedTransaction.transaction_total}</Text>
          </View>
          {/* <View style={[styles.commonRow, styles.calcRow]}>
            <Text style={styles.text4}>Cash</Text>
            <Text>$91.00</Text>
          </View>
          <View style={[styles.commonRow, styles.calcRow, {borderBottomWidth: 0}]}>
            <Text style={styles.text4}>Visa</Text>
            <Text>$300.00</Text>
          </View> */}
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
    transactions: pos.transactions,
    inventories: pos.inventories,
    discounts: pos.discounts,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTransactions: (token, params) => dispatch(PosAction.getTransactions(token, params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigationFocus(ActivitesScreen))
