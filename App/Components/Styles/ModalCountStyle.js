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
    width: 512,
    borderRadius: 6,
    backgroundColor: 'white',
    margin: 16,
  },
  titleRow: {
    height: 58,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  borderRow: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 16,
    color: Colors.text1,
  },
  bodyContainer: {
    padding: 16,
    backgroundColor: Colors.background,
    justifyContent: 'space-between',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  inputs: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.border,
    backgroundColor: 'white',
  },
  inputRow: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text1: {
    color: Colors.text2,
  },
  text2: {
    color: Colors.text1,
  },
  text3: {
    color: 'white',
  },
  text4: {
    color: '#d4d4d4',
  },
  button: {
    marginTop: 16,
    height: 46,
    backgroundColor: Colors.mainColor,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
