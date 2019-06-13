import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

const {width, height} = Dimensions.get('window');
const leftPanelWidth = width * Metrics.bigPanelRate;
const rightPanelWidth = width * Metrics.smallPanelRate;
const productWidth = (leftPanelWidth) / 4;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftPanel: {
    width: leftPanelWidth,
    borderRightWidth: 1,
    borderColor: Colors.border,
    backgroundColor: 'white',
  },
  productsContainer: {
    flexDirection: 'row',
  },
  productContainer: {
    width: productWidth,
    paddingVertical: 14,
    flexDirection: 'row',
  },
  horizontalSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  verticalSeparator: {
    marginVertical: -14,
    width: 1,
    backgroundColor: Colors.border,
  },
  firstProductContainer: {
    borderTopWidth: 0,
  },
  rightPanelContainer: {
    width: rightPanelWidth,
  },
  rightPanel: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commonPart: {
    paddingLeft: 16,
    width: rightPanelWidth,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  customerPart: {
    height: 76,
    marginBottom: 10,
    paddingRight: 16,
    borderTopColor: '#b2b2b2',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  customerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  customerImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 16,
  },
  customerText: {
    fontSize: 14,
    color: Colors.text2,
  },
  customerName: {
    color: Colors.mainColor,
  },
  customerPhone: {
    marginTop: 2,
    fontSize: 12,
    color: Colors.text2,
  },
  customerEmail: {
    fontSize: 10,
    color: Colors.text2,
  },
  iconContainer: {
    paddingTop: 3,
  },
  cashiersPart: {
    width: rightPanelWidth,
    marginBottom: 10,
    height: 228,
  },
  cashierRow: {
    height: 76,
    flexDirection: 'row',
  },
  cashierRightContainer: {
    paddingRight: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.5
  },
  cashierLastRightContainer: {
    borderBottomWidth: 0,
  },
  cashierImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cashierImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 16,
  },
  cashierRedNumContainer: {
    position: 'absolute',
    top: 8,
    left: 24,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cashierRedNum: {
    color: 'white',
    fontSize: 12,
  },
  cashierInfoContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  cashierName: {
    color: 'black',
  },
  cashierDescription: {
    color: Colors.text2,
    fontSize: 12,
    marginTop: 2,
  },
  cashierPrice: {
    color: 'black',
  },
  calcPart: {
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
    borderTopColor: Colors.border,
    borderTopWidth: 0.5,
    height: 50,
  },
  calcTitleRow: {
    borderTopWidth: 0,
  },
  calcTitle: {
    color: Colors.mainColor,
  },
  calcText: {
    color: 'black',
  },
  chargeButton: {
    marginHorizontal: 16,
    marginTop: 90,
    marginBottom: 38,
    backgroundColor: Colors.mainColor,
    borderRadius: 4,
    width: rightPanelWidth - 32,
    height: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  chargeText: {
    fontSize: 16,
    color: 'white',
  },
  priceText: {
    fontSize: 24,
    color: 'white',
  },
  ordersContainer: {
    paddingTop: 18,
    flex: 1,
  },
  ordersRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  order: {
    marginHorizontal: 10,
  },
  firstSmallProduct: {
    marginTop: 16,
  },
  lastSmallProduct: {
    marginBottom: 16,
  }
})
