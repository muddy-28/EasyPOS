import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, TextInput, Modal, Image, ScrollView } from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import QRCode from 'react-native-qrcode-svg'
import styles from './Styles/ModalPaymentStyle'
import CustomIcon from './CustomIcon'
import { Colors, Images, ApplicationStyles } from '../Themes'
import { cc_format, ce_format } from '../Lib/helpers';

export default class ModalPayment extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    // subPrice: PropTypes.number,
    // overallDiscountPrice: PropTypes.number,
    // taxPrice: PropTypes.number,
    company_name: PropTypes.string,
    fcmToken: PropTypes.string,
    totalPrice: PropTypes.number,
    selectedTabIndex: PropTypes.number,
    onClose: PropTypes.func,
    onClickTender: PropTypes.func,
    onClickPay: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      cashAmount: '',
      card_number: '',
      card_exp: '',
      card_cvv: '',
      card_amount: '',
      card_type: 'master',
      inputtingCardNumber: false,
      inputtingCardExp: false,
      inputtingCardCvv: false,
      inputtingCardAmount: false,
      cardNumberError: false,
      cardExpError: false,
      cardCvvError: false,
      cardAmountError: false,
    }
  }

  refreshState() {
    this.setState({
      cashAmount: '',
      inputtingCashAmount: false,
      card_number: '',
      card_exp: '',
      card_cvv: '',
      card_amount: '',
      card_type: 'master',
      inputtingCardNumber: false,
      inputtingCardExp: false,
      inputtingCardCvv: false,
      inputtingCardAmount: false,
      cardNumberError: false,
      cardExpError: false,
      cardCvvError: false,
      cardAmountError: false,
    })
  }

  handleIndexChange = index => {
    this.props.onChangeTabIndex(index);
  };

  onClose() {
    this.refreshState();
    this.props.onClose();
  }

  onClickTender() {
    this.props.onClickTender(this.state.cashAmount);
    this.setState({cashAmount: ''})
  }

  onClickPay() {
    this.props.onClickPay(this.state.card_type, this.state.card_number, this.state.card_exp, this.state.card_cvv, this.state.card_amount);
    this.refreshState();
  }

  onChangeCardAmount(card_amount) {
    this.setState({card_amount});
  }

  onChangeCardNumber(number) {
    let cn = cc_format(number);
    this.setState({card_number: cn});
  }

  onChangeCardExp(exp) {
    let ce = ce_format(exp);
    this.setState({card_exp: ce});
  }

  onChangeCardCvv(cvv) {
    let cc = cvv.length > 3 ? cvv.substring(0, 3) : cvv;
    this.setState({card_cvv: cc});
  }

  renderCash() {
    const disabled = !this.state.cashAmount || parseFloat(this.state.cashAmount) < this.props.totalPrice;

    return (
      <View style={styles.secondRow}>
        {/* <View style={styles.buttonsRow}>
          <View style={styles.dotButton}><Text style={styles.dotButtonText}>$152.00</Text></View>
          <View style={styles.dotButton}><Text style={styles.dotButtonText}>$155.00</Text></View>
          <View style={styles.dotButton}><Text style={styles.dotButtonText}>$200.00</Text></View>
        </View> */}
        <View style={styles.cashDisplayBar}>
          <TextInput style={styles.price} value={this.state.cashAmount} onChangeText={(cashAmount) => this.setState({cashAmount})} placeholder="Cash Amount" />
          <TouchableOpacity disabled={disabled} onPress={() => this.onClickTender()} style={styles.tenderButton}>
            <Text style={[styles.tenderButtonText, disabled ? {color: '#cccccc'} : null]}>TENDER</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderExternal() {
    const payAvailable = (this.state.card_amount && this.state.card_number && this.state.card_exp && this.state.card_cvv && !this.state.cardAmountError && !this.state.cardNumberError && !this.state.cardExpError && !this.state.cardCvvError)
    return (
      <View style={styles.secondRow}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity onPress={() => this.setState({card_type: 'master'})} style={[styles.dotButton, this.state.card_type == 'master' ? styles.selectedDotButton : null]}>
            <Text style={[styles.dotButtonText, this.state.card_type == 'master' ? styles.selectedDotButtonText : null]}>Master Card</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({card_type: 'visa'})} style={[styles.dotButton, this.state.card_type == 'visa' ? styles.selectedDotButton : null]}>
            <Text style={[styles.dotButtonText, this.state.card_type == 'visa' ? styles.selectedDotButtonText : null]}>Visa</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({card_type: 'nets'})} style={[styles.dotButton, this.state.card_type == 'nets' ? styles.selectedDotButton : null]}>
            <Text style={[styles.dotButtonText, this.state.card_type == 'nets' ? styles.selectedDotButtonText : null]}>NETS</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.externalDisplayBar}>
          <TextInput style={styles.textInput} placeholder='Input price' placeholderTextColor={Colors.text2} value='$151.80' editable={false} />
          <TextInput style={[styles.textInput, {fontSize: 14}]} placeholder='Input approved code' placeholderTextColor={Colors.text2} />
        </View> */}
        <View style={styles.commonRow}>
          <TextInput 
            style={[styles.textInput, styles.numberInput, this.state.inputtingCardAmount ? styles.selectedTextInput : null]} 
            placeholder='Card Amount' 
            placeholderTextColor={Colors.text2} 
            value={this.state.card_amount} 
            onChangeText={(cardAmount) => this.onChangeCardAmount(cardAmount)} 
            onFocus={() => this.setState({inputtingCardAmount: true})}
            onBlur={() => this.setState({inputtingCardAmount: false})}
          />
        </View>
        <View style={styles.commonRow}>
          <TextInput 
            style={[styles.textInput, styles.numberInput, this.state.inputtingCardNumber ? styles.selectedTextInput : null]} 
            placeholder='Card Number' 
            placeholderTextColor={Colors.text2} 
            value={this.state.card_number} 
            onChangeText={(number) => this.onChangeCardNumber(number)} 
            onFocus={() => this.setState({inputtingCardNumber: true})}
            onBlur={() => this.setState({inputtingCardNumber: false})}
          />
        </View>
        <View style={[styles.commonRow]}>
          <View style={styles.expCol}>
            <Image source={Images.exp} style={styles.expImage} resizeMode='cover' />
            <TextInput 
              style={[styles.textInput, styles.expInput, this.state.inputtingCardExp ? styles.selectedTextInput : null]} 
              placeholder='MM / YY' 
              placeholderTextColor={Colors.text2} 
              value={this.state.card_exp} 
              onChangeText={(exp) => this.onChangeCardExp(exp)} 
              onFocus={() => this.setState({inputtingCardExp: true})}
              onBlur={() => this.setState({inputtingCardExp: false})}
            />
          </View>
          <View style={styles.cvvCol}>
            <Image source={Images.cvv} style={styles.cvvImage} resizeMode='cover' />
            <TextInput 
              style={[styles.textInput, styles.cvvInput, this.state.inputtingCardCvv ? styles.selectedTextInput : null]} 
              value={this.state.card_cvv} 
              onChangeText={(cvv) => this.onChangeCardCvv(cvv)} 
              onFocus={() => this.setState({inputtingCardCvv: true})}
              onBlur={() => this.setState({inputtingCardCvv: false})}
              secureTextEntry={true} 
            />
          </View>
        </View>
        <TouchableOpacity style={[styles.payButton, payAvailable ? ApplicationStyles.shadow : null]} onPress={() => this.onClickPay()} disabled={!payAvailable}>
          <Text style={[styles.payButtonText, payAvailable ? null : {color: '#dddddd'}]}>PAY</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderMobile() {
    // const data = {"amount": 0.1, "order_id": 1, "company_name": this.props.company_name, "to": this.props.fcmToken }
    const data = { amount: this.props.totalPrice, order_id: 1, company_name: this.props.company_name, to: this.props.fcmToken }

    return (
      <View style={styles.qrContainer}>
        <QRCode logo={Images.icon} value={JSON.stringify(data)} size={200} />
      </View>
    );
  }

  render () {
    return (
      <Modal animationType="slide" transparent={true} visible={this.props.visible} supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}>
        <ScrollView>
          <View style={styles.screenContainer}>
            <View style={styles.modal}>
              <View style={[styles.titleRow, styles.borderRow]}>
                <TouchableOpacity onPress={() => this.onClose()}><CustomIcon name="black_close" /></TouchableOpacity>
                <Text style={styles.title}>${this.props.totalPrice.toFixed(2)}</Text>
                <TouchableOpacity><CustomIcon /></TouchableOpacity>
              </View>
              <View style={[styles.firstRow, styles.borderRow]}>
                <SegmentedControlTab
                  values={['Cash', 'Credit / Debit', 'Mobile']}
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
              {this.props.selectedTabIndex == 0 ? this.renderCash() : this.props.selectedTabIndex == 1 ? this.renderExternal() : this.renderMobile()}
            </View>
          </View>
        </ScrollView>
      </Modal>
    )
  }
}
