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
    width: 452,
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
  firstRow: {
    width: 452,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: Colors.background,
  },
  questionText: {
    fontSize: 14,
    color: Colors.text2,
    marginVertical: 20,
  },
  input: {
    width: 420,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 6,
    paddingHorizontal: 20,
  },
  button: {
    width: 420,
    height: 50,
    borderRadius: 6,
    backgroundColor: Colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  }
})
