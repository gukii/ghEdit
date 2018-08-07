export const IG_SET_CREDENTIALS = 'ig/IG_SET_CREDENTIALS'

// IMGUR AUTH FOR OAUTH2
export const IG_PIN_FOR_TOKEN_REQ = 'ig/IG_PIN_FOR_TOKEN_REQ'
export const IG_PIN_FOR_TOKEN_OK = 'ig/IG_PIN_FOR_TOKEN_OK'
export const IG_PIN_FOR_TOKEN_FAIL = 'ig/IG_PIN_FOR_TOKEN_FAIL'

export const IG_TOKEN_REFRESH_REQ = 'ig/IG_TOKEN_REFRESH_REQ'
export const IG_TOKEN_REFRESH_OK = 'ig/IG_TOKEN_REFRESH_OK'
export const IG_TOKEN_REFRESH_FAIL = 'ig/IG_TOKEN_REFRESH_FAIL'




export const IG_CREATE_ALBUM_REQ = 'ig/IG_CREATE_ALBUM_REQ'
export const IG_CREATE_ALBUM_OK = 'ig/IG_CREATE_ALBUM_OK'
export const IG_CREATE_ALBUM_FAIL = 'ig/IG_CREATE_ALBUM_FAIL'

export const IG_UPLOAD_MEDIA_REQ = 'ig/IG_UPLOAD_MEDIA_REQ'
export const IG_UPLOAD_MEDIA_OK = 'ig/IG_UPLOAD_MEDIA_OK'
export const IG_UPLOAD_MEDIA_FAIL = 'ig/IG_UPLOAD_MEDIA_FAIL'

export const IG_LIST_MEDIA_REQ = 'ig/IG_LIST_MEDIA_REQ'
export const IG_LIST_MEDIA_OK = 'ig/IG_LIST_MEDIA_OK'
export const IG_LIST_MEDIA_FAIL = 'ig/IG_LIST_MEDIA_FAIL'

export const IG_DEL_MEDIA_REQ = 'ig/IG_DEL_MEDIA_REQ'
export const IG_DEL_MEDIA_OK = 'ig/IG_DEL_MEDIA_OK'
export const IG_DEL_MEDIA_FAIL = 'ig/IG_DEL_MEDIA_FAIL'

export const IG_DOWN_UPLOAD_OK = 'ig/IG_DOWN_UPLOAD_OK'


//const initialState = {}


const initialState = {
    err: null,
  
    isConnected: false,
    inProgress: false,
  
    token: null,
    authResponse: null,
    
    credentials: {},    // 
  }
  
  
  export default (state = initialState, action) => {

    switch (action.type) {

        //case IG_SET_FOLDER_NAME:
        case IG_SET_CREDENTIALS:
        return ({
            ...state,
            credentials: { ...state.credentials, ...action.payload },
        })


        // Imgur Pin for token

        case IG_PIN_FOR_TOKEN_OK:
        return ({
            ...state,
            inProgress: false,
            imgur_access: { ...state.imgur_access, ...action.payload },
            credentials: { ...state.credentials, igPin: '' },
        }) 

        case IG_PIN_FOR_TOKEN_FAIL:
            return ({
            ...state,         
            inProgress: false,
            err: action.payload,
            imgur_access: {},
            }) 


        // Imgur Token Refresh

        case IG_TOKEN_REFRESH_OK:
        return ({
            ...state,
            inProgress: false,
            imgur_access: { ...state.imgur_access, ...action.payload },
            credentials: { ...state.credentials, igPin: '' },
        }) 

        case IG_TOKEN_REFRESH_FAIL:
            return ({
            ...state,         
            inProgress: false,
            err: action.payload,
            imgur_access: {},
            })  

        default:     
            return state

    } // switch
}
  


// action creators:

  
  export function igPinForTokenReq() {
    return { type: IG_PIN_FOR_TOKEN_REQ }
  }
  
  export function igTokenRefreshReq() {
    return { type: IG_TOKEN_REFRESH_REQ }
  }
  
  export function igCreateAlbumReq() {
    return { type: IG_CREATE_ALBUM_REQ }
  }  

  export function igUploadMediaReq() {
    return { type: IG_UPLOAD_MEDIA_REQ }
  }
  
  

  
  export function igPinForTokenOk(response) {
    return { type: IG_PIN_FOR_TOKEN_OK, payload: response, newTimeStamp: Date.now() }
  }
  
  export function igTokenRefreshOk(response) {
    return { type: IG_TOKEN_REFRESH_OK, payload: response, newTimeStamp: Date.now() }
  }
  
  export function igCreateAlbumOk(payload) {
    return { type: IG_CREATE_ALBUM_OK, payload }
  }  

  export function igUploadMediaOk(payload) {
    return { type: IG_UPLOAD_MEDIA_OK, payload }
  }
    
  

  
  export function igPinForTokenFail(err) {
    return { type: IG_PIN_FOR_TOKEN_FAIL, payload: err }
  }
  
  export function igTokenRefreshFail(err) {
    return { type: IG_TOKEN_REFRESH_FAIL, payload: err }
  }
  
  export function igCreateAlbumFail(payload) {
    return { type: IG_CREATE_ALBUM_FAIL, payload }
  }  
  

  
  export function igSetCredentials(credentials) {
    return { type: IG_SET_CREDENTIALS, payload: credentials }
  }

  export function igUploadMediaFail(payload) {
    return { type: IG_UPLOAD_MEDIA_FAIL, payload }
  }
  
  

  /*
  export function igSetFolderName(folderName) {
    return { type: IG_SET_FOLDER_NAME, payload: folderName}
  }
  */
    
  
