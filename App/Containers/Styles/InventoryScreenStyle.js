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
  },
  panel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableContainer: {
    backgroundColor: 'white',
    borderColor: Colors.border,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  commonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  selectedRow: {
    backgroundColor: Colors.mainColor,
  },
  itemRow: {
    width: leftPanelWidth,
    paddingHorizontal: 8,
  },
  productRow: {
    width: rightPanelWidth,
    height: 76,
  },
  productFirstCol: {
    paddingHorizontal: 16,
  },
  productSecondCol: {
    height: 76,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfoCol: {
    flex: 1,
  },
  productCostCol: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  productImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  text1: {
    color: Colors.text1,
  },
  text2: {
    color: 'white',
  },
  text3: {
    color: Colors.text2,
    fontSize: 12,
  }
})
