import { call, put, takeLatest } from 'redux-saga/effects'  // ,  takeEvery
//import Api from '...'
//import Octokat from 'octokat';
import { writeGhFile } from '../helpers/githubApi'
import { GH_CREATE_FILE_REQ, GH_CREATE_FILE_SUCCEED, GH_CREATE_FILE_FAIL } from '../reducers/github'


const creds = {
  ghRepo: 'buhao',
  ghUser: 'gukii',
  ghPass: '9496505e98eb8ffbeac49bc5b614c74a40e986ed',
  ghFolder: '_temp',
  ghFileName: '',
  fileContents: 'My first file from Saga..'
}



// worker Saga: will be fired on GH_CREATE_FILE_REQ actions
function* ghCreateFile(action) {

  console.log('~~took action:', action)
  const {payload} = action

  const ghFileName = payload && payload.ghFileName ? payload.ghFileName : 'noName.markdown'
  const fileContents = payload && payload.fileContents ? payload.fileContents : 'empty..'

  const myObj = { ...creds, ghFileName, fileContents }
  console.log('myObj:', myObj)


  const resp = yield call (writeGhFile, myObj)

  console.log('resp:', resp)

  if (resp.success) {
    yield put( {type: GH_CREATE_FILE_SUCCEED, payload: resp} )
  } else {
    yield put( {type: GH_CREATE_FILE_FAIL, payload: resp} )
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* githubSagas() {
  yield takeLatest(GH_CREATE_FILE_REQ, ghCreateFile);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
/*
function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}
*/
export default githubSagas
