import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainColor,
  },
  headerContainer: {
    paddingTop: 16,
    paddingLeft: 16,
    height: 120,
  },
  clearButton: {
  },
  profileContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  infoCol: {
    height: 64,
    justifyContent: 'space-between',
  },
  text1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  text2: {
    fontSize: 20,
    color: 'white',
  },
  text3: {

  },
  bodyContainer: {
    
  }
})
