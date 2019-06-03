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
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  emailBar: {
    height: 54,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  email: {
    flex: 1,
  },
  button: {
    width: 92,
    height: 35,
    backgroundColor: Colors.mainColor,
    borderRadius: 6,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    color: Colors.text2,
  },
  text2: {
    color: 'white',
  },
})
