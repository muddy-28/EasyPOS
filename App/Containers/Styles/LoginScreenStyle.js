import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  screenContainer: {
    backgroundColor: Colors.mainColor,
  },
  logoImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    resizeMode: 'contain',
  },
  inputsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.mainColor,
    height: 36,
    borderRadius: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    marginVertical: 6,
  },
  inputting: {
    borderColor: '#f4b523',
    elevation: 2,
    shadowColor: '#f4b523',
    shadowRadius: 2,
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 0.5 },
  },
  inputtingError: {
    borderColor: '#f41010',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 8,
    backgroundColor: Colors.darkMainColor,
    borderRadius: 4,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  disableButton: {
    color: Colors.cloud,
  },
  textButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  textButton: {
  },
  textButtonText: {
    fontSize: 12,
    color: 'white',
  },
  loadingIcon: {
    
  }
})
