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
    width: 270,
    height: 146,
    borderRadius: 6,
    backgroundColor: 'white',
    margin: 16,
  },
  textsContainer: {
    height: 102,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  margin: {
    marginTop: 2,
  },
  text: {
    color: Colors.text1,
    fontSize: 14,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  buttonText: {
    fontSize: 16,
    color: '#157efb',
  }
})
