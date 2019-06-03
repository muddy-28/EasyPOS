import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics } from '../../Themes';

const {width, height} = Dimensions.get('window');
const leftPanelWidth = width * 0.6875;

export default StyleSheet.create({
  screenContainer: {
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  customersModalContainer: {
    top: Metrics.navBarHeight + 14,
    left: leftPanelWidth - 434,
    width: 434,
    flexDirection: 'row',
  },
  customersModal: {
    width: 422,
    backgroundColor: Colors.background,
    borderRadius: 8,
  },
  tailRightImage: {
    width: 12,
    height: 19,
    marginTop: 25,
  },
  customersModalSearchBar: {
    height: 69,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customersModalCustomerBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  customersModalLastCustomerBar: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  customersModalCustomerImage: {
    width: 34,
    height: 34,
    marginHorizontal: 16,
  },
  customersModalCustomerInfoContainer: {
    flex: 1,
    height: 50,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  customersModalLastCustomerInfoContainer: {
    borderBottomWidth: 0,
  },
  customersModalCustomerName: {
    color: Colors.text1,
  },
  customersModalCustomerPhone: {
    marginTop: 2,
    fontSize: 10,
    color: Colors.text2,
  },
  customersModalSearchInputStyle: {
    fontSize: 14,
    color: 'black',
  },
  customersModalSearchContainer: {
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  customersModalSearchInputContainer: {
    borderWidth: 1,
    borderColor: '#d7d7d7',
    borderRadius: 8,
    paddingLeft: 4,
    backgroundColor: 'white',
    width: 390,
    height: 37,
  },
})
