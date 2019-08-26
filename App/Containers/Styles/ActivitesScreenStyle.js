import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Metrics } from '../../Themes/';

const {width, height} = Dimensions.get('window');
const leftPanelWidth = width * Metrics.smallPanelRate;
const rightPanelWidth = width * Metrics.bigPanelRate;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftPanelContainer: {
    width: leftPanelWidth,
    borderRightWidth: 1,
    borderColor: Colors.border,
  },
  rightPanelContainer: {
    width: rightPanelWidth,
    backgroundColor: 'white',
  },
  panel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  receiptContainer: {

  },
  endReceiptContainer: {
    borderColor: Colors.border,
    borderBottomWidth: 1,
  },
  dateRow: {
    width: leftPanelWidth,
    height: 24,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderColor: Colors.border,
    marginTop: -1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  itemRow: {
    backgroundColor: 'white',
  },
  selectedItemRow: {
    backgroundColor: Colors.mainColor,
  },
  itemContentsContainer: {
    paddingVertical: 16,
    marginLeft: 32,
    borderColor: Colors.border,
    // borderTopWidth: 0.5,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  startItemContentsContainer: {
    borderTopWidth: 0,
  },
  endItemContentsContainer: {
    borderBottomWidth: 0,
  },
  selectedITemContentsContainer: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  firstInfoRow: {
    width: leftPanelWidth - 32,
    paddingRight: 16,
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text1: {
    fontSize: 12,
    color: Colors.text1,
  },
  text2: {
    fontSize: 11,
    color: Colors.text2,
  },
  selectedText: {
    color: 'white',
  },
  companyInfoBar: {
    width: rightPanelWidth,
    // height: 98,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  },
  text3: {
    fontSize: 16,
  },
  commonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  firstRow: {
    width: rightPanelWidth - 32,
    borderTopWidth: 1,
    marginLeft: 28,
    paddingRight: 24,
    paddingVertical: 15,
  },
  leftCol: {
    flexDirection: 'row',
  },
  labelCol: {
    height: 70,
    justifyContent: 'space-between',
    marginRight: 4,
  },
  rightCol: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qr: {
    width: 70,
    height: 70,
  },
  text4: {
    color: Colors.text2,
  },
  secondRow: {
    width: rightPanelWidth - 32,
    marginLeft: 28,
    paddingRight: 24,
  },
  firstCol: {
    height: 50,
    paddingVertical: 8,
    justifyContent: 'space-between',

  },
  secondCol: {
    flexDirection: 'row',
  },
  text5: {
    color: Colors.text1,
  },
  calcRow: {
    width: rightPanelWidth * 0.5426,
    height: 50,
    paddingRight: 24,
  },
  text6: {
    fontSize: 16,
    fontWeight: 'bold',
  }
})
