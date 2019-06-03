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
  keypadRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  keypad: {
    flex: 1,
    height: 60,
    borderTopWidth: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearText: {
    fontSize: 18,
    color: Colors.text1,
  },
  disableClearText: {
    fontSize: 18,
    color: Colors.text2,
  },
  text1: {
    color: Colors.text1,
    fontSize: 32,
  },
  text2: {
    color: Colors.text2,
    fontSize: 32,
  },
  enterText: {
    color: Colors.mainColor,
    fontSize: 18,
  },
  displayContainer: {
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  displayRow: {
    borderRadius: 6,
    borderColor: Colors.border,
    borderWidth: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  displayCol: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: Colors.border,
  },
  text3: {
    fontSize: 32,
    color: '#d4d4d4',
  },
})
