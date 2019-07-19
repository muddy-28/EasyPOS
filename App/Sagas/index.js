import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { PosTypes } from '../Redux/PosRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { login, getInventories, getCategories, getTaxes, getDiscounts, postTransactions, sendEmail } from './PosSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
const api_pos = API.pos()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    takeLatest(PosTypes.LOGIN_REQUEST, login, api_pos),
    takeLatest(PosTypes.GET_INVENTORIES, getInventories, api_pos),
    takeLatest(PosTypes.GET_CATEGORIES, getCategories, api_pos),
    takeLatest(PosTypes.GET_TAXES, getTaxes, api_pos),
    takeLatest(PosTypes.GET_DISCOUNTS, getDiscounts, api_pos),
    takeLatest(PosTypes.POST_TRANSACTIONS, postTransactions, api_pos),
    takeLatest(PosTypes.SEND_EMAIL, sendEmail, api_pos),
  ])
}
