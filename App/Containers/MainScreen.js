import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

// Styles
import styles from './Styles/MainScreenStyle';
import PosAction from '../Redux/PosRedux'
import { Images, Colors } from '../Themes';
import HeaderMain from '../Components/HeaderMain';
import ProductBig from '../Components/ProductBig';
import ProductSmall from '../Components/ProductSmall';
import OrderCard from '../Components/OrderCard';
import ModalCustomers from '../Components/ModalCustomers';
import ModalCategories from '../Components/ModalCategories';
import ModalAddDiscount from '../Components/ModalAddDiscount';
import ModalAddProduct from '../Components/ModalAddProduct';
import ModalCharge from '../Components/ModalCharge';
import ModalAlert from '../Components/ModalAlert';
import ModalConfirm from '../Components/ModalConfirm';
import ModalPayment from '../Components/ModalPayment';

class MainScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showCustomersModal: false,
      showCategoriesModal: false,
      showAddDiscountModal: false,
      showAddProductModal: false,
      showChargeModal: false,
      showAlertModal: false,
      showConfirmModal: false,
      showPaymentModal: false,
      productSelected: true,
      productsListSelected: false,
      searchSelected: false,
      productSearchString: '',
      productsNumOfRow: 4,
      customers: [
        {id: 1, name: 'Hoang Thai', phone: '+84 0905 070 017', email: 'hoang8x.pts@gmail.com'},
        {id: 2, name: 'Eric Johnson', phone: '+123 456 789 0032', email: 'eric8x.pts@gmail.com'},
        {id: 3, name: 'Kristyn Miguez', phone: '+1 234 567 890', email: 'kristyn8x.pts@gmail.com'},
      ],
      orders: [
        [
          {kind: 'green', no: '14876', price: 28, name: 'James'},
          {kind: 'orange', no: '14877', price: 24, name: 'John'},
          {kind: 'orange', no: '14878', price: 35, name: 'John'},
          {kind: 'orange', no: '14879', price: 42, name: 'John'},
          {kind: 'green', no: '14880', price: 28, name: 'James'},
          {kind: 'green', no: '14881', price: 43, name: 'James'},
        ],
        [
          {kind: 'green', no: '14882', price: 21, name: 'James'},
          {kind: 'green', no: '14883', price: 26, name: 'James'},
          {kind: 'blue', no: '14884', price: 38, name: ''},
          {kind: 'orange', no: '14885', price: 32, name: ''},
          {kind: 'blue', no: '14886', price: 28, name: ''},
          {kind: 'green', no: '14887', price: 31, name: 'James'},
        ],
      ],
      customerSelectedId: -1,
      customerSearchString: '',
      cashiers: [
        {customerId: 1, name: "Strappy jean shoes", description: "Strappy jean shoes, size 42", price: "$175.00", redNum: 1},
        {customerId: 1, name: "Bag Denim", description: "Bag Denim Leather, Black", price: "$120.00", redNum: 3},
        {customerId: 1, name: "Levi's Collection", description: "Levi's Collection", price: "$45.00", redNum: 1},
      ],
      selectedCategoryId: -1,
      // add discount dialog
      calcMethodSelectedIndex: 0,
      displayNumber: 0,
      selectedFuncIndex: -1,
      selectedNumIndex: -1,
      // add product dialog
      productNumber: 0,
      productSizes: ['S', 'M', 'X', 'L', 'XL', 'XXL'],
      productColors: ['Red', 'Green', 'Blue', 'White', 'Yellow', 'Orange', 'Violet', 'Purple', 'Brown', 'Black', 'Gold', 'Silver'],
      productAvailableNumber: 20,
      productPrice: 20,
      productSelectedSizeIndex: 1,
      productSelectedColorIndex: 1,
      // payment dialog
      paymentMethodSelectedIndex: 0,
    }
  }

  componentWillMount() {
    this.props.getInventories(this.props.user.auth_token);
    this.props.getCategories(this.props.user.auth_token);
  }

  renderHeader() {
    return (
      <HeaderMain 
        productSelected={this.state.productSelected}
        searchSelected={this.state.searchSelected} 
        searchString={this.state.productSearchString}
        onClickProduct={() => this.setState({productSelected: true})} 
        onClickOrders={() => this.setState({productSelected: false})} 
        onClickSearch={() => this.setState({searchSelected: true})}
        onClickExpand={() => this.setState({showCategoriesModal: true, productSelected: true})}
        onClickList={() => this.setState({productsListSelected: !this.state.productsListSelected})}
        onChangeSearchText={(productSearchString) => this.setState({productSearchString})}
        onClearSearchText={()=>this.setState({searchSelected: false, productSearchString: ''})}
        onClickAddProduct={() => this.setState({showAddProductModal: true})}
        cartNum={0}
      />
    );
  }

  renderLeftPanel() {
    return (
      <ScrollView style={styles.leftPanel}>
        {this.state.productSelected ? this.state.productsListSelected ? this.renderSmallProducts() : this.renderBigProducts() : this.renderOrders()}
      </ScrollView>
    );
  }

  renderBigProducts() {
    const inventories = this.props.inventories.filter((inv) => (this.state.selectedCategoryId == -1 ? true : inv.category_id == this.state.selectedCategoryId) && (inv.upc_plu_sku.toLowerCase().indexOf(this.state.productSearchString.toLowerCase()) != -1));
    
    return inventories.map((ps, i) => {
      if (i % this.state.productsNumOfRow == 0) {
        return (
          <View key={'row_' + i.toString()} style={styles.productsContainer}>
            {
              inventories.filter((pp, ii) => ii >= i && ii < i + this.state.productsNumOfRow).map((product, index) => {
                return (
                  <View key={'p_' + index.toString()} style={[styles.productContainer, i == 0 ? styles.firstProductContainer : null]}>
                    <ProductBig productImage={product.image} productLabel={product.upc_plu_sku} />
                  </View>
                );
              })
            }
          </View>
        );
      }
    });
  }

  renderSmallProducts() {
    const inventories = this.props.inventories.filter((inv) => (this.state.selectedCategoryId == -1 ? true : inv.category_id == this.state.selectedCategoryId) && (inv.upc_plu_sku.toLowerCase().indexOf(this.state.productSearchString.toLowerCase()) != -1));

    return inventories.map((product, index) => {
      return (
        <View 
          key={'product_' + index.toString()} 
          style={index == 0 ? styles.firstSmallProduct : index == inventories.length - 1 ? styles.lastSmallProduct : null}
        >
          <ProductSmall productImage={product.image} productLabel={product.upc_plu_sku} productNum={product.sub_quantity} />
        </View>
      );
    })
  }

  renderOrders() {
    return (
      <View style={styles.ordersContainer}>
        {
          this.state.orders.map((os, i) => {
            return (
              <View key={'orders_row_' + i.toString()} style={styles.ordersRow}>
                {os.map((order, index) => {
                  return (
                    <View key={'order_' + index.toString()} style={styles.order}>
                      <OrderCard order={order} />
                    </View>
                  );
                })}
              </View>
            );
          })
        }
      </View>
    );
  }

  renderRightPanel() {
    return (
      <ScrollView style={styles.rightPanelContainer}>
        <View style={styles.rightPanel}>
          {this.renderCustomer()}
          {this.renderCashiers()}
          {this.renderCalc()}
          <TouchableOpacity onPress={() => this.setState({showPaymentModal: true})} style={[styles.chargeButton]}>
            <Text style={styles.chargeText}>Charge</Text>
            <Text style={styles.priceText}>$0.00</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  renderCustomer() {
    return (
      <View style={[styles.commonPart, styles.customerPart]}>
        <View style={styles.customerContainer}>
          <Image source={Images.customer} resizeMode='cover' style={styles.customerImage} />
          {this.state.customerSelectedId == -1 ? 
            <Text style={styles.customerText}>Add Customer</Text> : 
            <View>
              <Text style={styles.customerName}>{this.state.customers.filter((c) => c.id == this.state.customerSelectedId)[0].name}</Text>
              <Text style={styles.customerPhone}>{this.state.customers.filter((c) => c.id == this.state.customerSelectedId)[0].phone}</Text>
              <Text style={styles.customerEmail}>{this.state.customers.filter((c) => c.id == this.state.customerSelectedId)[0].email}</Text>
            </View>
          }
        </View>
        <TouchableOpacity style={styles.iconContainer} onPress={() => this.state.customerSelectedId == -1 ? this.setState({showCustomersModal: true}) : this.setState({customerSelectedId: -1})}>
          <Icon name={this.state.customerSelectedId == -1 ? 'plus-circle-outline' : 'minus-circle-outline'} size={24} color='#dadada' />
        </TouchableOpacity>
      </View>
    );
  }

  renderCashiers() {
    return (
      <View style={[styles.commonPart, styles.cashiersPart]}>
        {this.state.cashiers.filter(c => c.customerId == this.state.customerSelectedId).map((c, index) => {
          return (
            <View key={'cashier_' + index.toString()} style={styles.cashierRow}>
              <View style={styles.cashierImageContainer}>
                <Image source={Images.product} resizeMode="cover" style={styles.cashierImage} />
                {c.redNum > 1 ? <View style={styles.cashierRedNumContainer}><Text style={styles.cashierRedNum}>{c.redNum}</Text></View> : null}
              </View>
              <View style={[styles.cashierRightContainer, index == this.state.cashiers.filter(c => c.customerId == this.state.customerSelectedId).length - 1 ? styles.cashierLastRightContainer : null]}>
                <View style={styles.cashierInfoContainer}>
                  <Text style={styles.cashierName}>{c.name}</Text>
                  <Text style={styles.cashierDescription}>{c.description}</Text>
                </View>
                <Text style={styles.cashierPrice}>{c.price}</Text>
              </View>
            </View>
          );
        })}

      </View>
    );
  }

  renderCalc() {
    return (
      <View style={[styles.commonPart, styles.calcPart]}>
        <TouchableOpacity onPress={() => this.setState({showAddDiscountModal: true})} style={[styles.calcRow, styles.calcTitleRow]}>
          <Text style={styles.calcTitle}>Add Discount</Text>
          <View style={styles.iconContainer}><Icon name='plus-circle-outline' size={24} color={Colors.mainColor} /></View>
        </TouchableOpacity>
        <View style={[styles.calcRow]}>
          <Text style={styles.calcText}>Subtotal</Text>
          <Text style={styles.calcText}>$0.00</Text>
        </View>
        <View style={[styles.calcRow]}>
          <Text style={styles.calcText}>Taxes (0%)</Text>
          <Text style={styles.calcText}>$0.00</Text>
        </View>
      </View>
    );
  }

  renderCustomersModal() {
    return (
      <ModalCustomers 
        visible={this.state.showCustomersModal} 
        customers={this.state.customers}
        customerSearchString={this.state.customerSearchString}
        onChangeCustomerSearchString={(customerSearchString) => this.setState({customerSearchString})}
        onSelectCustomer={(id) => this.setState({customerSelectedId: id, showCustomersModal: false})}
      />
    );
  }

  renderCategoriesModal() {
    let categories = [{category: 'All', id: -1, num: this.props.inventories.length}];
    this.props.categories.forEach(c => {
      const num = this.props.inventories.filter((inv) => inv.category_id == c.id).length;
      categories.push({category: c.category, id: c.id, num});
    });
    return (
      <ModalCategories
        visible={this.state.showCategoriesModal}
        categories={categories}
        selectedId={this.state.selectedCategoryId}
        onSelectCategory={(id) => this.setState({showCategoriesModal: false, selectedCategoryId: id})}
      />
    );
  }

  renderAddDiscountModal() {
    return (
      <ModalAddDiscount
        visible={this.state.showAddDiscountModal}
        onClose={() => this.setState({showAddDiscountModal: false})}
        selectedTabIndex={this.state.calcMethodSelectedIndex}
        onChangeTabIndex={(index) => this.setState({calcMethodSelectedIndex: index})}
        displayNumber={this.state.displayNumber}
        selectedFuncIndex={this.state.selectedFuncIndex}
        onChangeFuncIndex={(index) => this.setState({selectedFuncIndex: index})}
        onClearDisplay={() => this.setState({selectedFuncIndex: -1, displayNumber: 0})}
        onChangeNumIndex={(index) => this.setState({selectedNumIndex: index})}
        onCalcNums={() => this.setState()}
      />
    );
  }

  renderAddProductModal() {
    return (
      <ModalAddProduct
        visible={this.state.showAddProductModal}
        onClose={() => this.setState({showAddProductModal: false})}
        productNumber={this.state.productNumber}
        onProcProductNumber={(st) => this.setState({productNumber: this.state.productNumber + st})}
        productSizes={this.state.productSizes}
        productColors={this.state.productColors}
        productAvailableNumber={this.state.productAvailableNumber}
        productSelectedSizeIndex={this.state.productSelectedSizeIndex}
        productSelectedColorIndex={this.state.productSelectedColorIndex}
        productPrice={this.state.productPrice}
        onChangeProductSelectedSizeIndex={(index) => this.setState({productSelectedSizeIndex: index})}
        onChangeProductSelectedColorIndex={(index) => this.setState({productSelectedColorIndex: index})}
      />
    );
  }

  renderPaymentModal() {
    return (
      <ModalPayment
        visible={this.state.showPaymentModal}
        onClose={() => this.setState({showPaymentModal: false})}
        selectedTabIndex={this.state.paymentMethodSelectedIndex}
        onChangeTabIndex={(index) => this.setState({paymentMethodSelectedIndex: index})}
        onClickTender={() => this.setState({showPaymentModal: false, showChargeModal: true})}
      />
    );
  }

  renderChargeModal() {
    return (
      <ModalCharge
        visible={this.state.showChargeModal}
        title='$48.20 Change out of $200.00'
        onClose={() => this.setState({showChargeModal: false, showPaymentModal: true})}
        onFinish={() => this.setState({showChargeModal: false, showAlertModal: true})}
      />
    );
  }

  renderAlertModal() {
    return (
      <ModalAlert
        visible={this.state.showAlertModal}
        texts={["There is no network connection.", "Email will be sent later."]}
        onClose={() => this.setState({showAlertModal: false, showConfirmModal: true})}
      />
    );
  }

  renderConfirmModal() {
    return (
      <ModalConfirm
        visible={this.state.showConfirmModal}
        texts={['Are you sure you want to cancel payment process?']}
        buttons={[
          {label: 'Yes', color: Colors.mainColor}, 
          {label: 'No', color: Colors.text1},
        ]}
        onClose={() => this.setState({showConfirmModal: false, showPaymentModal: true})}
      />
    );
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderCustomersModal()}
        {this.renderCategoriesModal()}
        {this.renderAddDiscountModal()}
        {this.renderAddProductModal()}
        {this.renderPaymentModal()}
        {this.renderChargeModal()}
        {this.renderAlertModal()}
        {this.renderConfirmModal()}
        <View style={styles.bodyContainer}>
          {this.renderLeftPanel()}
          {this.renderRightPanel()}
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ pos }) => {
  return {
    fetching: pos.fetching,
    error: pos.error,
    user: pos.user,
    inventories: pos.inventories,
    categories: pos.categories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInventories: (token) => dispatch(PosAction.getInventories(token)),
    getCategories: (token) => dispatch(PosAction.getCategories(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)



// products: [
//   {label: "Sport Shoes for Man", limit: 20}, 
//   {label: "Levi's collection", limit: 24}, 
//   {label: "Strappy Jean", limit: 28}, 
//   {label: "Jean Shoes", limit: 32},
//   {label: "Today Pigeon", limit: 21}, 
//   {label: "Bag Denim", limit: 25}, 
//   {label: "Leather Shoes", limit: 29}, 
//   {label: "Plain Long", limit: 33},
//   {label: "Clock 24:01", limit: 22}, 
//   {label: "Burton Menswear", limit: 26}, 
//   {label: "Jean Digan", limit: 30}, 
//   {label: "Menswear", limit: 34},
//   {label: "Basic Leather", limit: 23}, 
//   {label: "Levi's collection", limit: 27}, 
//   {label: "Strappy Jean", limit: 31}, 
//   {label: "Jean coat", limit: 35},
// ],
