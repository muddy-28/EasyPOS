import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, AsyncStorage, Alert, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'react-native-firebase'
import { DrawerActions } from 'react-navigation'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/MainScreenStyle'
import PosAction from '../Redux/PosRedux'
import { Images, Colors, Metrics } from '../Themes'
import HeaderMain from '../Components/HeaderMain'
import ProductBig from '../Components/ProductBig'
import ModalCategories from '../Components/ModalCategories'
import ModalAddDiscount from '../Components/ModalAddDiscount'
import ModalAddCart from '../Components/ModalAddCart'
import ModalCharge from '../Components/ModalCharge'
import ModalAlert from '../Components/ModalAlert'
import ModalConfirm from '../Components/ModalConfirm'
import ModalPayment from '../Components/ModalPayment'
import { hexToRgba } from '../Lib/helpers'

class MainScreen extends Component {
  constructor (props) {
    super(props)

    const { state: {params} } = this.props.navigation.dangerouslyGetParent();

    const {width, height} = Dimensions.get('window');
    const leftPanelWidth = width * Metrics.bigPanelRate - 2;
    let productWidth = 126 + 24 + 1;
    const numPerRow = Math.floor(leftPanelWidth / productWidth);
    productWidth = leftPanelWidth / numPerRow;

    this.state = {
      company_id: params.company_id,
      register_id: params.register_id,

      showCategoriesModal: false,
      showAddDiscountModal: false,
      showAddCartModal: false,
      showChargeModal: false,
      showAlertModal: false,
      showConfirmModal: false,
      showPaymentModal: false,
      showAddInventoryModal: false,
      searchSelected: false,
      productSearchString: '',
      productComponentWidth: productWidth,
      
      selectedCategoryId: -1,
      selectedProduct: {},
      shoppingCart: [],
      totalPrice: 0,
      subTotalPrice: 0,
      taxPrice: 0,
      overAllDiscountPrice: 0,
      // add discount dialog
      selectedDiscountMethodIndex: 0,
      overAllDiscount: 0,
      // add cart dialog
      productNumber: 1,
      // payment dialog
      paymentMethodSelectedIndex: 0,
      cashAmount: 0,
    }
  }

  async componentWillMount() {
    this.props.getInventories(this.props.user.token, this.state.company_id);
    this.props.getCategories(this.props.user.token);
    this.props.getTaxes(this.props.user.token);
    this.props.getDiscounts(this.props.user.token);
    this.fcmToken = await AsyncStorage.getItem('fcmToken');
    this.createNotificationListeners();
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.createdTransaction) {
      await this.setState({ shoppingCart: [], selectedProduct: {}, overAllDiscount: 0 });
      this.calcTotalPrice();
    }
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification(async (notification) => {
      console.log("zzz", "received");
      const { title, body } = notification;
      this.showAlert(title, body);
      if (title === 'Succeed') {
        await this.setState({showPaymentModal: false, shoppingCart: [], selectedProduct: {}, overAllDiscount: 0});
        this.calcTotalPrice();
      }
    });
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      console.log("zzz", "received 2");
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    });
  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      console.log("zzz", "received 3");
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log("zzz", JSON.stringify(message));
    });
  }
  
  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  doPayWithCash(email) {
    this.setState({showChargeModal: false})

    let inventories = [];
    let inventory_names = '';
    this.state.shoppingCart.forEach((sc, index) => {
      inventories.push({id: sc.product.id, quantity: sc.redNum});
      let surffix = index == this.state.shoppingCart.length - 1 ? "" : ", ";
      inventory_names += sc.product.title + surffix;
    })

    let params = { 
      company_id: this.state.company_id,
      inventories,
      register_id: this.state.register_id,
      value: this.state.subTotalPrice.toFixed(2),
      tax_value: this.state.taxPrice.toFixed(2),
      discount_value: this.state.overAllDiscountPrice.toFixed(2),
      transaction_total: this.state.totalPrice.toFixed(2),
      transaction_type: "cash",
      // "publisher-name": "pnpdemo",
      transaction_mode: "cash",
    }

    this.props.postTransaction(this.props.user.token, params);
    this.props.sendEmail(this.props.user.token, {email, message: `total: $${params.transaction_total}, inventory item: ${inventory_names}`});
  }

  doPayWithCard(card_type, card_number, card_exp, card_cvv, card_amount) {
    this.setState({showPaymentModal: false});

    let inventories = [];
    this.state.shoppingCart.forEach((sc) => {
      inventories.push({id: sc.product.id, quantity: sc.redNum});
    })

    let params = { 
      company_id: this.state.company_id,
      inventories,
      register_id: this.state.register_id,
      value: this.state.subTotalPrice.toFixed(2),
      tax_value: this.state.taxPrice.toFixed(2),
      discount_value: this.state.overAllDiscountPrice.toFixed(2),
      transaction_total: this.state.totalPrice.toFixed(2),
      transaction_type: "card",
      transaction_mode: "card",
      // "publisher-name": "pnpdemo",
      // "card-number": card_number,
      "card-number": "3566000020000410",
      "card-name": card_type,
      "card-amount": card_amount,
      "card-exp": card_exp,
      "card-cvv": card_cvv,
    }

    this.props.postTransaction(this.props.user.token, params);
  }

  getTax() {
    let tax = 0;
    let taxes = this.props.taxes.filter((t) => t.company_id == this.state.company_id);
    if (taxes.length > 0) {
      tax = parseFloat(taxes[0].tax_value);
    }
    return tax;
  }

  calcTotalPrice() {
    let subTotalPrice = 0;
    let tax = this.getTax();

    this.state.shoppingCart.forEach((sc) => {
      const discount = this.getProductDiscount(sc.product.id);
      subTotalPrice += parseFloat(sc.product.price) * sc.redNum * (1 - discount / 100);
    })

    let overAllDiscountPrice = (this.state.selectedDiscountMethodIndex == 0) ? subTotalPrice * this.state.overAllDiscount / 100 : this.state.overAllDiscount;
    let specialPrice = subTotalPrice - overAllDiscountPrice > 0 ? subTotalPrice - overAllDiscountPrice : 0;
    let taxPrice = specialPrice * tax / 100;
    let totalPrice = specialPrice + taxPrice;

    this.setState({overAllDiscountPrice, taxPrice, totalPrice, subTotalPrice});
  }

  async setDiscount(tabIndex, num) {
    await this.setState({selectedDiscountMethodIndex: tabIndex, overAllDiscount: parseFloat(num), showAddDiscountModal: false});
    this.calcTotalPrice();
  }

  addCart() {
    let shoppingCart = this.state.shoppingCart;

    let existIndex = -1;
    shoppingCart.forEach((sc, i) => {
      if (this.state.selectedProduct.id == sc.product.id) existIndex = i;
    });

    if (existIndex == -1) {
      shoppingCart.push({product: this.state.selectedProduct, redNum: this.state.productNumber, sizeIndex: this.state.selectedProductSizeIndex, colorIndex: this.state.selectedProductColorIndex});
    } else {
      let exist = shoppingCart[existIndex];
      exist.redNum += this.state.productNumber;
      shoppingCart[existIndex] = exist;
    }

    this.setState({showAddCartModal: false, shoppingCart});
    this.calcTotalPrice();
  }

  getProductDiscount(id) {
    const discounts = this.props.discounts.filter(d => d.inventory_id == id);
    return discounts.length > 0 ? parseFloat(discounts[0].discount_value) : 0;
  }

  showOneModal(name) {
    this.setState({
      showCategoriesModal: name == 'category',
      showAddDiscountModal: name == 'addDiscount',
      showAddCartModal: name == 'addCart',
      showAlertModal: name == 'alert',
      showChargeModal: name == 'charge',
      showConfirmModal: name == 'confirm',
      showPaymentModal: name == 'payment',
    });
  }

  onClickMenu() {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }

  onClickExpand() {
    this.showOneModal('category');
  }

  onClickAddCart() {
    if (this.props.inventories.length == 0) {
      alert("Please select an inventory.");
      return;
    }

    if (this.state.selectedProduct.id == undefined) {
      alert("Please select an inventory.");
      return;
    }

    const inventories = this.props.inventories.filter((inv) => {
      return  (this.state.selectedCategoryId == -1 ? true : inv.category_id == this.state.selectedCategoryId) && 
              inv.id == this.state.selectedProduct.id && 
              (inv.title.toLowerCase().indexOf(this.state.productSearchString.toLowerCase()) != -1)
    })

    if (inventories.length == 0) {
      alert("Please select an inventory.");
      return;
    }

    this.showOneModal('addCart');
    this.setState({productNumber: 1})
  }

  renderHeader() {
    return (
      <HeaderMain 
        searchSelected={this.state.searchSelected} 
        searchString={this.state.productSearchString}
        onClickMenu={() => this.onClickMenu()}
        onClickSearch={() => this.setState({searchSelected: true})}
        onClickExpand={() => this.onClickExpand()}
        onChangeSearchText={(productSearchString) => this.setState({productSearchString})}
        onClearSearchText={()=>this.setState({searchSelected: false, productSearchString: ''})}
        onClickAddCart={() => this.onClickAddCart()}
        cartNum={this.state.shoppingCart.length}
      />
    );
  }

  renderLeftPanel() {
    return (
      <ScrollView style={styles.leftPanel}>
        {this.renderBigProducts()}
      </ScrollView>
    );
  }

  renderBigProducts() {
    const inventories = this.props.inventories.filter((inv) => (this.state.selectedCategoryId == -1 ? true : inv.category_id == this.state.selectedCategoryId) && (inv.title.toLowerCase().indexOf(this.state.productSearchString.toLowerCase()) != -1));

    return (
      <View style={styles.productsContainer}>
        {
          inventories.map((product, i) => {
            return (
              <View 
                key={'p_' + i.toString()} 
                style={[styles.productContainer, {width: this.state.productComponentWidth}, this.state.selectedProduct.id == product.id ? {backgroundColor: hexToRgba(Colors.mainColor, 0.3),} : null]}
              >
                <ProductBig productImage={product.image} productLabel={product.title} onPress={() => this.setState({selectedProduct: product})} />
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
        </View>
      </ScrollView>
    );
  }

  renderCustomer() {
    const user = this.props.user;

    return (
      <View style={[styles.commonPart, styles.customerPart]}>
        <View style={styles.customerContainer}>
          <Image source={Images.customer} resizeMode='cover' style={styles.customerImage} />
          <View>
            <Text style={styles.customerName}>{user.first_name + " " + user.last_name}</Text>
            <Text style={styles.customerPhone}>{user.phone_number}</Text>
            <Text style={styles.customerEmail}>{user.email}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon size={24} color='#dadada' />
        </TouchableOpacity>
      </View>
    );
  }

  renderCashiers() {
    return (
      <ScrollView style={[styles.commonPart, styles.cashiersPart]}>
        {this.state.shoppingCart.map((sc, index) => {
          const discount = this.getProductDiscount(sc.product.id);

          return (
            <View key={'cashier_' + index.toString()} style={styles.cashierRow}>
              <View style={styles.cashierImageContainer}>
                <Image source={sc.product.image && sc.product.image.url ? {uri: sc.product.image.url} : Images.product} resizeMode="cover" style={styles.cashierImage} />
                {sc.redNum > 1 ? <View style={styles.cashierRedNumContainer}><Text style={styles.cashierRedNum}>{sc.redNum}</Text></View> : null}
              </View>
              <View style={[styles.cashierRightContainer, index == this.state.shoppingCart.length - 1 ? styles.cashierLastRightContainer : null]}>
                <View style={styles.cashierInfoContainer}>
                  <Text style={styles.cashierName}>{sc.product.title}</Text>
                  <Text style={styles.cashierDescription}>{sc.product.description_of_item}</Text>
                </View>
                <Text style={styles.cashierPrice}>{'$' + (parseFloat(sc.product.price) * sc.redNum * (1 - discount / 100)).toFixed(2)}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  }

  renderCalc() {
    let tax = this.getTax();
    const enableChange = this.state.shoppingCart && this.state.shoppingCart.length > 0;

    return (
      <View>
        <View style={[styles.commonPart, styles.calcPart]}>
          <TouchableOpacity onPress={() => this.setState({showAddDiscountModal: true})} style={[styles.calcRow, styles.calcTitleRow]}>
            <Text style={styles.calcTitle}>Set Discount</Text>
            {/* <View style={styles.iconContainer}><Icon name='plus-circle-outline' size={24} color={Colors.mainColor} /></View> */}
            <View style={[styles.iconContainer, {marginTop: 4}]}><Icon name='border-color' size={24} color={Colors.mainColor} /></View>
          </TouchableOpacity>
          <View style={[styles.calcRow]}>
            <Text style={styles.calcText}>Subtotal</Text>
            <Text style={styles.calcText}>{'$' + this.state.subTotalPrice.toFixed(2)}</Text>
          </View>
          <View style={[styles.calcRow]}>
            <Text style={styles.calcText}>Discount{this.state.selectedDiscountMethodIndex == 0 ? " (" + this.state.overAllDiscount.toFixed(0) + "%)" : null}</Text>
            <Text style={styles.calcText}>{'$' + this.state.overAllDiscountPrice.toFixed(2)}</Text>
          </View>
          <View style={[styles.calcRow]}>
            <Text style={styles.calcText}>Taxes ({tax.toFixed(0)}%)</Text>
            <Text style={styles.calcText}>{'$' + this.state.taxPrice.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity disabled={!enableChange} onPress={() => this.setState({showPaymentModal: true})} style={[styles.chargeButton]}>
          <Text style={[styles.chargeText, enableChange ? null : styles.disableButtonText]}>Charge</Text>
          <Text style={[styles.priceText, enableChange ? null : styles.disableButtonText]}>${this.state.totalPrice.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderCategoriesModal() {
    let categories = [{category: 'All', id: -1, num: this.props.inventories.length}];
    this.props.categories.forEach(c => {
      const num = this.props.inventories.filter((inv) => inv.category_id == c.id).length;
      categories.push({category: c.category, id: c.id, num, image: c.image});
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
        selectedTabIndex={this.state.selectedDiscountMethodIndex}
        displayNumber={this.state.overAllDiscount}
        onEnter={(tabIndex, num) => this.setDiscount(tabIndex, num)}
      />
    );
  }

  renderAddCartModal() {
    if (!this.state.showAddCartModal) return;

    const product = this.state.selectedProduct;
    const discount = this.getProductDiscount(product.id);

    return (
      <ModalAddCart
        visible={this.state.showAddCartModal}
        onClose={() => this.setState({showAddCartModal: false})}
        onClickAdd={() => this.addCart()}
        productNumber={this.state.productNumber}
        onProcProductNumber={(st) => this.setState({productNumber: this.state.productNumber + st})}
        productAvailableNumber={product.sub_quantity}
        productPrice={parseFloat(product.price) * this.state.productNumber * (1 - discount / 100)}
      />
    );
  }

  renderPaymentModal() {
    const company_name = this.props.user.companies.filter(c => c.id == this.state.company_id)[0].name_of_company;
    return (
      <ModalPayment
        visible={this.state.showPaymentModal}
        totalPrice={this.state.totalPrice}
        company_name={company_name}
        fcmToken={this.fcmToken}
        onClose={() => this.setState({showPaymentModal: false})}
        selectedTabIndex={this.state.paymentMethodSelectedIndex}
        onChangeTabIndex={(index) => this.setState({paymentMethodSelectedIndex: index})}
        onClickTender={(amount) => this.setState({cashAmount: amount, showPaymentModal: false, showChargeModal: true})}
        onClickPay={(card_type, card_number, card_exp, card_cvv, card_amount) => this.doPayWithCard(card_type, card_number, card_exp, card_cvv, card_amount)}
      />
    );
  }

  renderChargeModal() {
    return (
      <ModalCharge
        visible={this.state.showChargeModal}
        // title='$48.20 Change out of $200.00'
        title={'$' + (parseFloat(this.state.cashAmount) - this.state.totalPrice).toFixed(2) + ' Change out of $' + this.state.totalPrice.toFixed(2)}
        onClose={() => this.setState({showChargeModal: false, showPaymentModal: true})}
        onFinish={(email) => this.doPayWithCash(email)}
      />
    );
  }

  renderAlertModal() {
    return (
      <ModalAlert
        visible={this.state.showAlertModal}
        texts={["There is no network connection.", "Email will be sent later."]}
        onClose={() => this.setState({showAlertModal: false})}
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

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {/* {this.renderCustomersModal()} */}
        {this.renderCategoriesModal()}
        {this.renderAddDiscountModal()}
        {this.renderAddCartModal()}
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
    user: pos.user,
    inventories: pos.inventories,
    categories: pos.categories,
    taxes: pos.taxes,
    discounts: pos.discounts,
    createdTransaction: pos.createdTransaction,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInventories: (token, company_id) => dispatch(PosAction.getInventories(token, company_id)),
    getCategories: (token) => dispatch(PosAction.getCategories(token)),
    getTaxes: (token) => dispatch(PosAction.getTaxes(token)),
    getDiscounts: (token) => dispatch(PosAction.getDiscounts(token)),
    postTransaction: (token, params) => dispatch(PosAction.postTransaction(token, params)),
    sendEmail: (token, params) => dispatch(PosAction.sendEmail(token, params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)


// showCustomersModal: false,
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
// customers: [
//   {id: 1, name: 'Hoang Thai', phone: '+84 0905 070 017', email: 'hoang8x.pts@gmail.com'},
//   {id: 2, name: 'Eric Johnson', phone: '+123 456 789 0032', email: 'eric8x.pts@gmail.com'},
//   {id: 3, name: 'Kristyn Miguez', phone: '+1 234 567 890', email: 'kristyn8x.pts@gmail.com'},
// ],
// customerSelectedId: -1,
// customerSearchString: '',
// cashiers: [
//   {customerId: 1, name: "Strappy jean shoes", description: "Strappy jean shoes, size 42", price: "$175.00", redNum: 1},
//   {customerId: 1, name: "Bag Denim", description: "Bag Denim Leather, Black", price: "$120.00", redNum: 3},
//   {customerId: 1, name: "Levi's Collection", description: "Levi's Collection", price: "$45.00", redNum: 1},
// ],


  /*renderCustomersModal() {
    return (
      <ModalCustomers 
        visible={this.state.showCustomersModal} 
        customers={this.state.customers}
        customerSearchString={this.state.customerSearchString}
        onChangeCustomerSearchString={(customerSearchString) => this.setState({customerSearchString})}
        onSelectCustomer={(id) => this.setState({customerSelectedId: id, showCustomersModal: false})}
      />
    );
  }*/

  /*renderCustomer() {
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
  }*/

  /*renderCashiers() {
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
  }*/

  
  /*renderOrders() {
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
  }*/

