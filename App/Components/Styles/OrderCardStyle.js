import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: 95,
    height: 95,
    borderRadius: 4,
    borderWidth: 1,
  },
  greenBorder: {
    borderColor: '#48bc20',
  },
  greenBackground: {
    backgroundColor: '#48bc20',
  },
  blueBorder: {
    borderColor: '#0678be',
  },
  blueBackground: {
    backgroundColor: '#0678be',
  },
  redBorder: {
    borderColor: '#e10101',
  },
  redBackground: {
    backgroundColor: '#e10101',
  },
  orangeBorder: {
    borderColor: '#ff6511',
  },
  orangeBackground: {
    backgroundColor: '#ff6511',
  },
  infoRow: {
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameRow: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  orderNo: {
    fontSize: 14,
    color: Colors.text1,
  },
  orderPrice: {
    marginTop: 8,
    fontSize: 12,
    color: '#aaaaaa',
  },
  orderName: {
    fontSize: 11,
    color: 'white',
  }
})
