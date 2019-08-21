import React, { Component } from 'react'
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'
import { Dimensions } from 'react-native'

import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'
import MainScreen from '../Containers/MainScreen'
import InventoryScreen from '../Containers/InventoryScreen'
import ActivitesScreen from '../Containers/ActivitesScreen'

import Menu from '../Components/Menu'

import styles from './Styles/NavigationStyles'

const InventoryNav = createStackNavigator({
  InventoryScreen: { screen: InventoryScreen },
}, {
  headerMode: 'none',
  initialRouteName: 'InventoryScreen',
  navigationOptions: {
    drawerLabel: 'Inventories',
  },
})

const OrderNav = createStackNavigator({
  OrderScreen: { screen: ActivitesScreen },
}, {
  headerMode: 'none',
  initialRouteName: 'OrderScreen',
  navigationOptions: {
    drawerLabel: 'Orders',
  },
})

const MainNav = createStackNavigator({
  MainScreen: { screen: MainScreen },
}, {
  headerMode: 'none',
  initialRouteName: 'MainScreen',
  navigationOptions: {
    drawerLabel: 'Home',
  },
})

const MenuNav = createDrawerNavigator({
  MainScreen: { screen: MainNav },
  OrderScreen: { screen: OrderNav },
  InventoryScreen: { screen: InventoryNav },
}, {
  headerMode: 'none',
  initialRouteName: 'MainScreen',
  contentComponent: (props) => (
    <Menu props={props} />
  ),
  drawerWidth: Dimensions.get('window').width * 0.3
})

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  MenuScreen: { screen: MenuNav },
  LoginScreen: { screen: LoginScreen }, 
  LaunchScreen: { screen: LaunchScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
