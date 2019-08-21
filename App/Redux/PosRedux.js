import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  posRequest: ['data'],
  posSuccess: ['payload'],
  posFailure: null,
  loginRequest: ['email', 'password'],
  loginSuccess: ['user'],
  getInventories: ['token', 'company_id'],
  setInventories: ['inventories'],
  getCategories: ['token'],
  setCategories: ['categories'],
  getTaxes: ['token'],
  setTaxes: ['taxes'],
  getDiscounts: ['token'],
  setDiscounts: ['discounts'],
  postTransactions: ['token', 'params'],
  sendEmail: ['token', 'params'],
  getRegisters: ['token'],
  setRegisters: ['registers'],
})

export const PosTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  user: {},
  inventories: [],
  categories: [],
  taxes: [],
  discounts: [],
  registers: [],
})

/* ------------- Selectors ------------- */

export const PosSelectors = {
  getData: state => state.data,
  getUser: state => state.user,
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const loginSuccess = (state, { user }) => 
  state.merge({ fetching: false, user: user.user, error: null })

export const setInventories = (state, { inventories }) => 
  state.merge({ fetching: false, inventories: inventories.inventories, error: null })

export const setCategories = (state, { categories }) => 
  state.merge({ fetching: false, categories: categories.categories, error: null })

export const setTaxes = (state, { taxes }) => 
  state.merge({ fetching: false, taxes: taxes.taxes, error: null })

export const setDiscounts = (state, { discounts }) => 
  state.merge({ fetching: false, discounts: discounts.discounts, error: null })

export const setRegisters = (state, { registers }) =>
  state.merge({ fetching: false, registers: registers.registers, error: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POS_REQUEST]: request,
  [Types.POS_SUCCESS]: success,
  [Types.POS_FAILURE]: failure,
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.GET_INVENTORIES]: request,
  [Types.SET_INVENTORIES]: setInventories,
  [Types.GET_CATEGORIES]: request,
  [Types.SET_CATEGORIES]: setCategories,
  [Types.GET_TAXES]: request,
  [Types.SET_TAXES]: setTaxes,
  [Types.GET_DISCOUNTS]: request,
  [Types.SET_DISCOUNTS]: setDiscounts,
  [Types.POST_TRANSACTIONS]: request,
  [Types.SEND_EMAIL]: request,
  [Types.GET_REGISTERS]: request,
  [Types.SET_REGISTERS]: setRegisters,
})
