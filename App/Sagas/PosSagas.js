import { Alert, AsyncStorage } from 'react-native'
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
    let inventories = response.data.inventories
    if (inventories && inventories.length > 0) {
      inventories = inventories.sort(function(a, b) {
        return a.id - b.id
      })
    }

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
    const discounts = response.data.discounts.filter(d => d.on_off == "true" || d.on_off == "1")
    yield put(PosActions.setDiscounts({ discounts }))
  } else {
    yield put(PosActions.posFailure())
  }
}

export function * postTransaction(api, action) {
  const { token, params } = action

  const response = yield call(api.postTransaction, token, {transaction: params})
  console.log("post transaction", response)

  if (response.ok) {
    const transaction = response.data.transaction

    yield put(PosActions.postTransactionSuccess({ transaction }))
  } else {
    yield put(PosActions.posFailure())
  }
}

export function * sendEmail(api, action) {
  const { token, params } = action

  const response = yield call(api.sendEmail, token, params)
  console.log("send email", response)

  if (response.ok) {
    yield put(PosActions.posSuccess())
  } else {
    yield put(PosActions.posFailure())
  }
}

export function * getRegisters(api, action) {
  const { token } = action

  const response = yield call(api.getRegisters, token)
  console.log("registers", response)

  if (response.ok) {
    const registers = response.data.registers
    yield put(PosActions.setRegisters({ registers }))
  } else {
    yield put(PosActions.posFailure())
  }
}

export function * getTransactions(api, action) {
  const { token, params } = action

  const response = yield call(api.getTransactions, token, {transaction: params})
  console.log("get transactions", response)

  if (response.ok) {
    const transactions = response.data.transactions

    yield put(PosActions.setTransactions({ transactions }))
  } else {
    yield put(PosActions.posFailure())
  }
}
