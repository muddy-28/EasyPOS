import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  infoContainer: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.border,
    marginLeft: 20,
    paddingRight: 16,
  },
  name: {
    color: Colors.text1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  limit: {
    color: Colors.text2,
    fontSize: 12,
  },
  limitNum: {
    color: 'red',
    fontSize: 12,
  }
})
