// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import * as config from '../Config/AppConfig'

// our "constructor"
const create = (baseURL = 'https://api.github.com/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser
  }
}


const pos = (baseURL = config.serverUrl) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    timeout: 60000
  })

  const login = (param) => api.post('/company_users/signin', param)
  const getInventories = (token, company_id) => api.get(`/companies/${company_id}/inventory_list`, null, { headers: {'ACCESS_TOKEN': token} })
  const getCategories = (token) => api.get('/categories', null, { headers: {'ACCESS_TOKEN': token} })
  const getTaxes = (token) => api.get('/taxes', null, { headers: { 'ACCESS_TOKEN': token } })
  const getDiscounts = (token) => api.get('/discounts', null, { headers: { 'ACCESS_TOKEN': token } })
  const postTransactions = (token, params) => api.post('/transactions', params, { headers: {'ACCESS_TOKEN': token } })
  const sendEmail = (token, params) => api.post('/emails', params, { headers: {'ACCESS_TOKEN': token } })
  const getRegisters = (token) => api.get('/registers', null, { headers: { 'ACCESS_TOKEN': token } })
  // const update = (token, id, param) => api.patch(`users/${id}/`, param, { headers: {'Authorization': token} })
  // const forgotPassword = (param) => api.post('users/forgot_password', param)

  return {
    login,
    getInventories,
    getCategories,
    getTaxes,
    getDiscounts,
    postTransactions,
    sendEmail,
    getRegisters,
  }
}


// let's return back our create method as the default.
export default {
  create,
  pos,
}
