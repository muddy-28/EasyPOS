import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/LoginScreenStyle'
import PosAction from '../Redux/PosRedux'
import { Images, Colors } from '../Themes'

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
      email: 'comapany@user.com',
      password: 'password',
      isEmailError: false, 
      isPasswordError: false,
    }
  }

  componentDidMount() {
    Image.getSize(Image.resolveAssetSource(Images.logo).uri, (width, height) => {
      const scaleFactor = width / dimensions.width;
      const imageHeight = height / scaleFactor;
      this.setState({logoWidth: dimensions.width * rate * 0.88, logoHeight: imageHeight * rate * 0.88});
    });
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
          <Image source={Images.logo} style={[styles.logoImage, {width: logoWidth, height: logoHeight}]} resizeMode='stretch' />
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
            style={[styles.loginButton, {width: dimensions.width * rate}]} 
            disabled={disabledLogin}
            onPress={() => this.onClickLogin()}
          >
            {this.props.fetching ? <ActivityIndicator style={styles.loadingIcon} size="small" color={'white'} /> : <Text style={[styles.loginText, disabledLogin ? styles.disableButton : null]}>Sign in</Text>}
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