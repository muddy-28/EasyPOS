import { Alert, AsyncStorage } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import { call, put } from 'redux-saga/effects'
import PosActions from '../Redux/PosRedux'

export function * login(api, action) {
  const { email, password } = action
  let param = {email, password}

  const response = yield call(api.login, param)
  console.log("login result", response)

  if (response.ok && !response.data.error) {
    const user = response.data.user

    yield AsyncStorage.setItem('user', JSON.stringify(user))
    yield put(PosActions.loginSuccess({user}))
    yield put(StackActions.reset({index: 0, actions: [NavigationActions.navigate({routeName: 'MainScreen'})]}))
  } else {
    Alert.alert('Error', "Incorrect login. Please check the email and password you entered and try again.", [{text: 'Dismiss'}], {cancelable: false});
    yield put(PosActions.posFailure())
  }
}

export function * getInventories(api, action) {
  const { token, company_id } = action

  const response = yield call(api.getInventories, token, company_id)
  console.log("inventories", response)

  if (response.ok) {
    const inventories = response.data.inventories
    yield put(PosActions.setInventories({ inventories }))
  } else {
    yield put(PosActions.posFailure())
  }
}

export function * getCategories(api, action) {
  const { token } = action

  const response = yield call(api.getCategories, token)
  console.log("categories", response)

  if (response.ok) {
    const categories = response.data.categories
    yield put(PosActions.setCategories({ categories }))
  } else {
    yield put(PosActions.posFailure())
  }
}

export function * getTaxes(api, action) {
  const { token } = action

  const response = yield call(api.getTaxes, token)
  console.log("taxes", response)

  if (response.ok) {
    const taxes = response.data.taxes
    yield put(PosActions.setTaxes({ taxes }))
  } else {
    yield put(PosActions.posFailure())
  }
}

export function * getDiscounts(api, action) {
  const { token } = action

  const response = yield call(api.getDiscounts, token)
  console.log("discounts", response)

  if (response.ok) {
    const discounts = response.data.discounts
    yield put(PosActions.setDiscounts({ discounts }))
  } else {
    yield put(PosActions.posFailure())
  }
}
