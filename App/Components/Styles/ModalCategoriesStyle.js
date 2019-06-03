import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics } from '../../Themes';

const {width, height} = Dimensions.get('window');
const leftPanelWidth = width * 0.6875;
const categoriesModalWidth = leftPanelWidth * 0.4019;

export default StyleSheet.create({
  categoriesModalContainer: {
    marginLeft: 12,
    marginTop: Metrics.navBarHeight,
    width: categoriesModalWidth,
    alignItems: 'center',
    flex: 1,
    elevation: 2,
    shadowColor: '#777777',
    shadowRadius: 2,
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 0.5 },
  },
  categoryModalTail: {
    width: 38,
    height: 13,
  },
  categoriesModal: {
    width: categoriesModalWidth,
    paddingBottom: 11,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  categoriesModalTitleRow: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: Colors.background,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesModalTitle: {
    color: 'black',
  },
  categoriesModalRow: {
    height: 44,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  categoriesModalImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginLeft: 16,
    marginRight: 12,
  },
  categoriesModalInfo: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
    paddingRight: 16,
  },
  categoriesModalName: {
    color: '#555555',
  },
  categoriesModalNum: {
    color: '#b0b0b0',
  },
})
