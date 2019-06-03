import { StyleSheet, Dimensions } from 'react-native';
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
    width: 300,
    height: 250,
    borderRadius: 6,
    backgroundColor: 'white',
    margin: 16,
  },
  picker: {
    height: 200,
  },
  button: {
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.mainColor,
  },
})
