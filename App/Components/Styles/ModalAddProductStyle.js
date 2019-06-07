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
    paddingBottom: 12,
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
  commonRow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondRow: {
    height: 84,
    flexDirection: 'row',
  },
  setCountButton: {
    width: 96,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
    borderRadius: 8,
  },
  displayNumberContainer: {
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 8,
    borderColor: Colors.border,
    borderWidth: 0.5,
    marginHorizontal: 16,
  },
  displayNumber: {
    color: Colors.text1,
    fontSize: 28,
  },
  thirdRow: {
    height: 125,
  },
  productPrice: {
    fontSize: 48,
    color: Colors.text1,
  },
  productAvailableRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  productAvailableLabel: {
    color: Colors.text2,
  },
  productAvailableNumber: {
    color: Colors.mainColor,
  },
  size: {
    marginTop: 18,
    marginLeft: 16,
    marginBottom: 10,
    color: Colors.mainColor,
  },
  buttonsRow: {
    marginHorizontal: 16,
    marginVertical: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    borderWidth: 0.5,
    borderRadius: 6,
    borderColor: Colors.mainColor,
    width: 68,
    height: 30,
  },
  buttonText: {
    color: Colors.mainColor,
  },
  selectedButton: {
    backgroundColor: Colors.mainColor
  },
  selectedButtonText: {
    color: 'white',
  },
  color: {
    marginTop: 14,
    color: '#555555',
  },
  lastButtonsRow: {
    marginTop: 8,
    marginBottom: 20,
  }
})
