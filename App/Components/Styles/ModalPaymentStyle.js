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
    height: 62,
    backgroundColor: Colors.background,
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
    fontSize: 12,
  },
  activeTabStyle: {
    backgroundColor: Colors.mainColor,
    borderColor: Colors.mainColor,
  },
  activeTabTextStyle: {
    color: 'white',
  },
  secondRow: {
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  buttonsRow: {
    width: 452,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  dotButton: {
    width: 126,
    height: 62,
    borderRadius: 8,
    borderColor: Colors.mainColor,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  dotButtonText: {
    color: Colors.mainColor,
    fontSize: 20,
  },
  cashDisplayBar: {
    margin: 16,
    width: 420,
    height: 55,
    paddingLeft: 16,
    paddingRight: 10,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: Colors.text1,
    fontSize: 20,
  },
  tenderButton: {
    width: 92,
    height: 35,
    backgroundColor: Colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  tenderButtonText: {
    color: 'white',
  },
  externalDisplayBar: {
    margin: 16,
    width: 420,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    width: 200,
    height: 55,
    paddingHorizontal: 16,
    color: Colors.text1,
    fontSize: 20,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  payButton: {
    height: 55,
    width: 420,
    backgroundColor: Colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 16,
  },
  payButtonText: {
    fontSize: 20,
    color: 'white',
  },
})
