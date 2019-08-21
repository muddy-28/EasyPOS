import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native'
import { DrawerItems } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'

import styles from './Styles/MenuStyle'
import { Images } from '../Themes'
import PosAction from '../Redux/PosRedux'

class Menu extends Component {
  static propTypes = {
    props: PropTypes.object,
  }

  logout() {
    this.props.props.navigation.closeDrawer();
    // this.props.logout(this.props.student.activation_token);
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.clearButton} onPress={() => this.props.props.navigation.closeDrawer()}>
            <Icon name='close' size={32} color={'white'} style={styles.icon} />
          </TouchableOpacity>
          {/* <View style={styles.profileContainer}>
            <Image source={Images.avatar} resizeMode='cover' style={styles.profileImage} />
            <View style={styles.infoCol}>
              <Text style={styles.text1}>{this.props.student.first ? this.props.student.first + ' ' + this.props.student.last : 'Full Name'}</Text>
              <Text style={styles.text2}>Student</Text>
            </View>
          </View> */}
        </View>
        <ScrollView style={styles.bodyContainer}>
          <DrawerItems 
            {...this.props.props}
            labelStyle={{fontSize: 20, color: 'white'}}
            iconContainerStyle={{width: 36, height: 36, marginRight: 0}}
          />
          <TouchableOpacity style={{height: 56, alignItems: 'center', marginTop: -4, flexDirection: 'row'}} onPress={() => this.logout()}>
            {/* <Image source={Images.logout} resizeMode='cover' style={{width: 36, height: 36, marginHorizontal: 16}} /> */}
            <Text style={{marginLeft: 16, fontSize: 20, color: 'white', fontWeight: 'bold'}}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({ pos }) => {
  return {
    user: pos.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // logout: (token) => dispatch(PosAction.logout(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
