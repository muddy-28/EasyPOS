import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, Dimensions, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import { NavigationActions, StackActions } from 'react-navigation'

// Styles
import styles from './Styles/LoginScreenStyle'
import PosAction from '../Redux/PosRedux'
import { Images, Colors } from '../Themes'
import { shadeColor } from '../Lib/helpers';
import ModalRegister from '../Components/ModalRegister';

const dimensions = Dimensions.get('window');
const rate = 0.48;
const org_logo_width = 564;
const org_logo_height = 259;

class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      logoWidth: 0, 
      logoHeight: 0, 
      screenMarginTop: dimensions.height * 0.08, 
      logoWidth: dimensions.width * rate * 0.88,
      logoHeight: dimensions.width * rate * 0.88 / org_logo_width * org_logo_height,

      // email: 'company@user.com',
      // password: 'password',
      email: 'sasa.savic.upwork@gmail.com',
      password: 'qwerasdf',
      isEmailError: false, 
      isPasswordError: false,

      showModalRegister: false,
      showModalEnterCode: false,
    }
  }

  async componentDidMount() {
    await this.checkPermission();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.email && this.props.user.email != nextProps.user.email) {
      this.props.getRegisters(nextProps.user.token);
    }
    if (this.props.registers != nextProps.registers) {
      this.setState({ showModalRegister: true });
    }
  }

  componentWillUnmount() {
    this.setState({ showModalRegister: false, showModalEnterCode: false })
  }

  async createNotificationListeners() {
    console.log("zzz", "start");
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      console.log("zzz", "received");
      const { title, body } = notification;
      this.showAlert(title, body);
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

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log("zzz token", fcmToken);
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  validateEmail(text) {
    this.setState({email: text});
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({isEmailError: true});
    } else {
      this.setState({isEmailError: false});
    }
  }

  validatePassword(text) {
    this.setState({password: text});
    if (text.length > 0) {
      this.setState({isPasswordError: false});
    } else {
      this.setState({isPasswordError: true});
    }
  }

  onClickLogin = () => {
    this.props.login(this.state.email, this.state.password);
  }

  onClickOkay = (companyId, registerId) => {
    this.setState({showModalRegister: false})
    this.props.goMainScreen(companyId, registerId);
  }

  renderModalRegister() {
    return (
      <ModalRegister
        visible={this.state.showModalRegister}
        companies={this.props.user.companies}
        registers={this.props.registers}
        onClickOkay={(company_id, register_id) => this.onClickOkay(company_id, register_id)}
      />
    )
  }

  render () {
    const { logoWidth, logoHeight, screenMarginTop, isEmailError, isPasswordError } = this.state;
    const disabledLogin = isEmailError || isPasswordError;

    return (
      <ScrollView style={[styles.container, styles.screenContainer]}>
        {this.renderModalRegister()}
        <View style={[styles.logoImageContainer, {marginTop: screenMarginTop}]}>
          <Image source={Images.logo} style={{width: logoWidth, height: logoHeight}} resizeMode='stretch' />
        </View>
        <View style={styles.inputsContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#cccccc"
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType="email-address"
            onFocus={() => this.setState({inputtingEmail: true})}
            onBlur={() => this.setState({inputtingEmail: false})}
            value={this.state.email}
            onChangeText={(text) => this.validateEmail(text)}
            style={[styles.input, isEmailError ? styles.inputtingError: null, this.state.inputtingEmail ? styles.inputting : null, {width: dimensions.width * rate}]}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#cccccc"
            secureTextEntry={true}
            onFocus={() => this.setState({inputtingPassword: true})}
            onBlur={() => this.setState({inputtingPassword: false})}
            value={this.state.password}
            onChangeText={(text) => this.validatePassword(text)}
            style={[styles.input, isPasswordError ? styles.inputtingError: null, this.state.inputtingPassword ? styles.inputting : null, {width: dimensions.width * rate}]}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={[styles.loginButton, {width: dimensions.width * rate, backgroundColor: shadeColor(Colors.mainColor, -40)}]} 
            disabled={disabledLogin}
            onPress={() => this.onClickLogin()}
          >
            <Text style={[styles.loginText, disabledLogin ? styles.disableButtonText : null]}>Sign in</Text>
          </TouchableOpacity>

          <View style={[styles.textButtonsContainer, {width: dimensions.width * rate}]}>
            <TouchableOpacity style={styles.textButton}>
              <Text style={styles.textButtonText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textButton}>
              <Text style={styles.textButtonText}>Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ pos }) => {
  return {
    user: pos.user,
    registers: pos.registers,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(PosAction.loginRequest(email, password)),
    getRegisters: (token) => dispatch(PosAction.getRegisters(token)),
    goMainScreen: (company_id, register_id) => dispatch(StackActions.reset({index: 0, actions: [NavigationActions.navigate({routeName: 'MainScreen', params: {company_id, register_id}})]})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
