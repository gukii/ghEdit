import { call, put, takeLatest, takeEvery, all } from 'redux-saga/effects'  // ,  takeEvery
//import Api from '...'
//import Octokat from 'octokat';
//import { writeGhFile } from '../helpers/githubApi'
import { igPinForTokenOk, igPinForTokenReq, igPinForTokenFail, IG_PIN_FOR_TOKEN_REQ } from '../reducers/imgur'
import { apiExchangePinForToken, apiExchangeRefreshTokenForNewToken } from '../helpers/imgurApi'
import { apiUploadPhoto } from '../helpers/imgurApi'
import { IG_UPLOAD_MEDIA_REQ, IG_UPLOAD_MEDIA_OK, IG_UPLOAD_MEDIA_FAIL } from '../reducers/imgur'


const creds = {
  ghRepo: 'buhao',
  ghUser: 'gukii',
  ghPass: '9496505e98eb8ffbeac49bc5b614c74a40e986ed',
  ghFolder: '_temp',
  ghFileName: '',
  fileContents: 'My first file from Saga..'
}



// worker Saga: will be fired on IG_UPLOAD_MEDIA_REQ actions
function* igExchangePinForToken(action) {
    // yield put( { type: SPINNER_START, payload: "uploading media to IG" } )

    console.log('~~took action:', action)
    console.log('~~with payload:', action.payload)

    try {
        // blocking call
        const resp = yield call (apiExchangePinForToken, action.payload)

        const { data } = resp
        if (data && data[0] && data[0].status == 200) {

            yield put( igPinForTokenOk(data[1] ) )
            
            // save store to localhost
            // setTimeout(storeSaveState(),500);            
        } 
    }
    catch (err) {
        console.log('iGPinForToken err:', err)
        yield put( igPinForTokenFail(err) )
    }
}




// worker Saga: will be fired on IG_UPLOAD_MEDIA_REQ actions
function* igUploadMedia(action) {
    // yield put( { type: SPINNER_START, payload: "uploading media to IG" } )

    console.log('~~took action:', action)
    console.log('~~with payload:', action.payload)

    try {
        // blocking call
        const resp = yield call (apiUploadPhoto, action.payload)

        const { data } = resp
        if (data && data[0] && data[0].status == 200) {

            yield put( { type: IG_UPLOAD_MEDIA_OK, payload: data[1]} )
            // maybe also save the deleteHash to localstorage or redux
        } 
    }
    catch (err) {
        console.log('upload err:', err)
        yield put( { type: IG_UPLOAD_MEDIA_FAIL, payload: err } )
    }
}




/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* imgurSagas() {

    // use yield fork for async operation
    // or use a channel
    yield all([    
        yield takeEvery(IG_UPLOAD_MEDIA_REQ, igUploadMedia),
        yield takeEvery(IG_PIN_FOR_TOKEN_REQ, igExchangePinForToken),
    ])
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/

export default imgurSagas
