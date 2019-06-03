import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 126,
    height: 126,
  },
  productLabel: {
    fontSize: 12,
    marginTop: 8,
    color: Colors.text1,
  }
})
