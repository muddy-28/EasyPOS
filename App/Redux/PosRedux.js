import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  posRequest: ['data'],
  posSuccess: ['payload'],
  posFailure: null,
  loginRequest: ['email', 'password'],
  loginSuccess: ['user'],
  getInventories: ['token'],
  setInventories: ['inventories'],
  getCategories: ['token'],
  setCategories: ['categories'],
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
})
