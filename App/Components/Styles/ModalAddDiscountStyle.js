import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../../Themes';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  screenContainer: {
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 512,
    borderRadius: 6,
    backgroundColor: 'white',
    margin: 16,
  },
  borderRow: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  titleRow: {
    height: 58,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 18,
    color: Colors.text1,
  },
  secondRow: {
    height: 67,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainerStyle:{
    width: 260,
    height: 30,
  },
  tabStyle: {
    borderColor: Colors.mainColor,
  },
  tabTextStyle: {
    color: Colors.mainColor,
    fontSize: 14,
  },
  activeTabStyle: {
    backgroundColor: Colors.mainColor,
    borderColor: Colors.mainColor,
  },
  activeTabTextStyle: {
    color: 'white',
  },
  thirdRow: {
    height: 88,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calcBar: {
    width: 475,
    height: 50,
    backgroundColor: Colors.background,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  displayText: {
    fontSize: 32,
    color: Colors.text1,
  },
  keypadRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  keypad: {
    flex: 1,
    height: 52,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: Colors.mainColor,
    borderColor: Colors.mainColor,
  },
  funcText: {
    color: Colors.text1,
    fontSize: 24,
  },
  selectedText: {
    color: 'white',
  },
  clearText: {
    color: '#e10101',
    fontSize: 18,
  },
  numKeypad: {
    height: 70,
    borderTopWidth: 0,
    backgroundColor: 'transparent',
  },
  lastNumKeypad: {
    borderBottomWidth: 0,
  },
  numText: {
    color: Colors.text1,
    fontSize: 32,
  },
  enterText: {
    color: Colors.mainColor,
    fontSize: 18,
  }
})
