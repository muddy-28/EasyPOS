import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Colors, Metrics } from '../../Themes';

const paddingTop = (Platform.OS === 'ios') ? 20 : 10;
const {width, height} = Dimensions.get('window');
const leftPanelWidth = width * Metrics.bigPanelRate;
const rightPanelWidth = width * Metrics.smallPanelRate;

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
  buttonsContainer: {
    flexDirection: 'row'
  },
  iconContainer: {
    marginRight: 16,
  },
  leftButtons: {

  },
  rightButtons: {

  },
  button: {
    marginTop: 8,
    paddingBottom: 8,
    width: 109,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectedButton: {
    backgroundColor: 'white',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  selectedButtonText: {
    color: Colors.mainColor,
  },
  expandIcon: {
    marginTop: 3,
    marginRight: -6,
    marginLeft: 2,
  },
  searchContainer: {
    margin: 0,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchInputContainer: {
    marginVertical: 4,
    paddingLeft: 4,
    borderRadius: 4,
    backgroundColor: 'white',
    width: 335,
    height: 30,
  },
  searchInputStyle: {
    fontSize: 14,
    color: 'black',
  },
  rightTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightText: {
    fontSize: 16,
    color: 'white',
  }
})
