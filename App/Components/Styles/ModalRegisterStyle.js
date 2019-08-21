import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../Themes';

const {width, height} = Dimensions.get('window');
const modal_width = 360;

export default StyleSheet.create({
  screenContainer: {
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: modal_width,
    height: 200,
    borderRadius: 6,
    backgroundColor: 'white',
    margin: 16,
    paddingTop: 16,
  },
  dropdown: {
    marginVertical: 8,
    marginLeft: 24,
    paddingLeft: 16,
    paddingRight: 12,
    paddingTop: 10,
    width: modal_width - 48,
    height: 42,
    borderColor: Colors.text1,
    borderWidth: 2,
    borderRadius: 4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: Colors.text1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    color: 'black',
  }
})
