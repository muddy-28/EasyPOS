import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, Dimensions, ActivityIndicator, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'

// Styles
import styles from './Styles/LoginScreenStyle'
import PosAction from '../Redux/PosRedux'
import { Images, Colors } from '../Themes'
import { shadeColor } from '../Lib/helpers';

const dimensions = Dimensions.get('window');
const rate = 0.459219858;

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    // const { navigation } = this.props
    // const { state: {params}} = navigation
    // this.state = { contest: params.contest, selectedIndex: 0, tab: params.tab }
    this.state = {
      logoWidth: 0, 
      logoHeight: 0, 
      screenMarginTop: dimensions.height * 0.08, 
      // email: 'company@user.com',
      // password: 'password',
      email: 'sasa.savic.upwork@gmail.com',
      password: 'qwerasdf',
      isEmailError: false, 
      isPasswordError: false,
    }
  }

  async componentDidMount() {
    Image.getSize(Image.resolveAssetSource(Images.logo).uri, (width, height) => {
      const scaleFactor = width / dimensions.width;
      const imageHeight = height / scaleFactor;
      this.setState({logoWidth: dimensions.width * rate * 0.88, logoHeight: imageHeight * rate * 0.88});
    });

    await this.checkPermission();
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

  render () {
    const { logoWidth, logoHeight, screenMarginTop, isEmailError, isPasswordError } = this.state;
    const disabledLogin = isEmailError || isPasswordError || this.props.fetching;

    return (
      <ScrollView style={[styles.container, styles.screenContainer]}>
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
            {this.props.fetching ? <ActivityIndicator style={styles.loadingIcon} size="small" color={'white'} /> : <Text style={[styles.loginText, disabledLogin ? styles.disableButtonText : null]}>Sign in</Text>}
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
    fetching: pos.fetching,
    error: pos.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(PosAction.loginRequest(email, password)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
