
//const initialState = {}




const initialState = {
  err: null,

  isConnected: false,
  inProgress: false,

  token: null,
  authResponse: null,
  
  credentials: {},
}


export default (state = initialState, action) => {
  return state
}
/*
export const SET_CREDENTIALS = 'auth/SET_CREDENTIALS'


// IMGUR AUTH FOR OAUTH2
export const IG_PIN_FOR_TOKEN_REQ = 'auth/IG_PIN_FOR_TOKEN_REQ'
export const IG_PIN_FOR_TOKEN_OK = 'auth/IG_PIN_FOR_TOKEN_OK'
export const IG_PIN_FOR_TOKEN_FAIL = 'auth/IG_PIN_FOR_TOKEN_FAIL'

export const IG_TOKEN_REFRESH_REQ = 'auth/IG_TOKEN_REFRESH_REQ'
export const IG_TOKEN_REFRESH_OK = 'auth/IG_TOKEN_REFRESH_OK'
export const IG_TOKEN_REFRESH_FAIL = 'auth/IG_TOKEN_REFRESH_FAIL'
*/