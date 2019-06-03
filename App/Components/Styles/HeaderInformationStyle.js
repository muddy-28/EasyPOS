import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Colors, Metrics } from '../../Themes';

const paddingTop = (Platform.OS === 'ios') ? 20 : 10;
const {width, height} = Dimensions.get('window');
const rightPanelWidth = width * Metrics.bigPanelRate;
const leftPanelWidth = width * Metrics.smallPanelRate;

export default StyleSheet.create({
  container: {
    width: width,
    height: Metrics.navBarHeight,
    backgroundColor: Colors.mainColor,
    flexDirection: 'row',
  },
  partContainer: {
    paddingTop: paddingTop,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftPart: {
    width: leftPanelWidth,
    borderRightWidth: 1,
    borderColor: Colors.headerBorder,
  },
  rightPart: {
    width: rightPanelWidth,
  },
  leftTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftText: {
    fontSize: 16,
    color: 'white',
  }
})
