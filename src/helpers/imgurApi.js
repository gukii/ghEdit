//igApiHelpers.js

/*
import { 
    igPinForTokenOk, igPinForTokenReq, igPinForTokenFail,
    igTokenRefreshOk, igTokenRefreshFetching, igTokenRefreshFail,
    setIgFolderName,
} from '../reducers/auth'
*/
import {
    igCreateAlbumOk, igCreateAlbumReq, igCreateAlbumFail, 
    igUploadMediaOk, igUploadMediaReq, igUploadMediaFail,
    igListImagesOk, igListImagesFetching, igListImagesFail,
    igDelImgOk, igDelImgReq, igDelImgFail, igSetCredentials, 

    igPinForTokenOk, igPinForTokenReq, igPinForTokenFail,
    igTokenRefreshOk, igTokenRefreshReq, igTokenRefreshFail,
    setIgFolderName,    

} from '../reducers/imgur'

import { storeSaveState } from '../store'




// imgur 
export const apiExchangePinForToken = ({ igPin, igClientId, igClientSecret }) => {

  console.log('apiExchangePinForToken called:', igPin, igClientId, igClientSecret)

  const formData = new FormData()
  formData.append('pin', igPin)
  formData.append('client_id', igClientId)
  formData.append('client_secret', igClientSecret)
  formData.append('grant_type', 'pin')

  return fetch('https://api.imgur.com/oauth2/token', {
    mode: 'cors',
    method: 'POST',
    //headers: {
    //  Authorization: 'Client-ID '+igClientId,
    //},
    body: formData,
  })
  .then( response => Promise.all([response, response.json()]));
}



// imgur 
export const apiExchangeRefreshTokenForNewToken = ({ igRefreshToken, igClientId, igClientSecret }) => {

  console.log('apiExchangeRefreshTokenForNewToken called:', igRefreshToken, igClientId, igClientSecret )

  const formData = new FormData()
  formData.append('refresh_token', igRefreshToken)
  formData.append('client_id', igClientId)
  formData.append('client_secret', igClientSecret)
  formData.append('grant_type', 'refresh_token')

  return fetch('https://api.imgur.com/oauth2/token', {
    mode: 'cors',
    method: 'POST',
    //headers: {
    //  Authorization: 'Client-ID '+igClientId,
    //},
    body: formData,
  })
  .then( response => Promise.all([response, response.json()]));
}  




export const igExchangePinForToken = (props) => {
  console.log('igExchangePinForToken called:', props.igPin)
  return (dispatch) => {
  dispatch(igPinForTokenReq)
  apiExchangePinForToken(props)
    .then((data) => {
      console.log('apiExchangePinForToken returned data:', data)
      if (data && data[0] && data[0].status == 200) {
          console.log('access data:', data[1])
          console.log('data[1].access_token:', data[1].access_token)

          dispatch(igPinForTokenOk(data[1]))

          // save store to localhost
          setTimeout(storeSaveState(),500);

          //igCreateAlbum({ igAlbumTitle: 'TestTitle', igAccessToken: data[1].access_token })
      }
      // dispatch(uploadDataSuccess(data))
      // save the deleteHash to localstorage or redux
    })
    .catch((err) => { 
        console.log('iGPinForToken err:', err)
        dispatch(igPinForTokenFail(err))
    })

  }
}



// imgur 
export const apiCreateAlbum = ({ igAlbumTitle='', igAlbumDesc='', igAccessToken, igPrivacy='public', igLayout='grid' }) => {

  console.log('apiExchangeRefreshTokenForNewToken called: igAlbumTitle:', igAlbumTitle, ' igAlbumDesc:', igAlbumDesc, ' igAccessToken:', igAccessToken, ' igLayout:', igLayout )

  const formData = new FormData()
  formData.append('title', igAlbumTitle)
  formData.append('description', igAlbumDesc)
  formData.append('privacy', igPrivacy)
  formData.append('layout', igLayout)


  return fetch('https://api.imgur.com/3/album', {
    mode: 'cors',
    method: 'POST',
    headers: {
      Authorization: 'Bearer '+igAccessToken,
    },
    body: formData,
  })
  .then( response => Promise.all([response, response.json()]));
}  


// props: igAlbumTitle='', igAlbumDesc='', igAccessToken, igPrivacy='public'
export const igCreateAlbum = (props) => {
  console.log('igCreateAlbum called:', props.igAlbumTitle)
  return (dispatch) => {
  dispatch( igCreateAlbumReq() )

  apiCreateAlbum(props)
    .then((data) => {
      console.log('apiCreateAlbum returned data OK:', data)
      
      if (data && data[0] && data[0].status == 200) {
        console.log('album data:', data[1])


        dispatch( igSetCredentials({ igFolderName: data[1].id }) )  // not sure about .id !!!!
        dispatch(igCreateAlbumOk(data[1]))
        
        //dispatch(setIgFolderName(data[1]))
        //dispatch(igSetCredentials({ igFolderName: data[1] } ))

        //dispatch(igCreateAlbumOk(data[1]))   // now i have the problem that the "busy" flag is not turned off..
      }
      // save the deleteHash to localstorage or redux
    })
    .catch((err) => { 
        console.log('ig album creation err:', err)
        dispatch(igCreateAlbumFail(err))
    })

  }
}





// imgur 
export const apiUploadPhoto = ({ 
      igPhotoTitle='', 
      igPhotoDesc='', 
      igPhotoName='',
      igAlbumId='', 
      igAccessToken='', 
      igPhotoBlob='',
}) => {

  console.log('apiUploadPhoto called:', igAlbumId, igPhotoTitle, igPhotoDesc, igAccessToken )

  const formData = new FormData()
  formData.append('title', igAlbumId)
  formData.append('description', igPhotoDesc)
  formData.append('name', igPhotoName)
  formData.append('album', igAlbumId)
  formData.append('image', igPhotoBlob)
  //formData.append('type', 'file/base4/URL')

  return fetch('https://api.imgur.com/3/image', {
    mode: 'cors',
    method: 'POST',
    headers: {
      Authorization: 'Bearer '+igAccessToken,
    },
    body: formData,
  })
  .then( response => Promise.all([response, response.json()]));
}  





export const igUploadPhoto = (props) => {

  console.log('igUploadPhoto called:', props.igAlbumId, props.igPhotoTitle)

  return (dispatch) => {
  dispatch(igUploadMediaReq())

  apiUploadPhoto(props)
    .then((data) => {
      console.log('apiUploadPhoto returned data:', data)
      
      if (data && data[0] && data[0].status == 200) {
      //	console.log('access data:', data[1])
      //}
          dispatch(igUploadMediaOk(data[1]))
      // save the deleteHash to localstorage or redux
      }
    })
    .catch((err) => { 
        console.log('upload err:', err)
        dispatch(igUploadMediaFail(err))
    })

  }
}


////////////////// NO TOKEN - ANONYMOUS ACCESS FUNCTION END in ...NT /////////////////




// used n tested
export const apiUploadImageToAlbumNT = ({imageBlob, album, clientId, uri='https://api.imgur.com/3/image'}) => {

  //const fileInput = event.target.querySelector('input');
  //const imageBlob = fileInput.files[0];

  console.log('apiUploadImageToAlbumNT called blob/album:', imageBlob, album)


  //const uri = 'https://api.imgur.com/3/image'
  //const clientId = 'd8b652d0980d055'

  const formData = new FormData()
  formData.append('image', imageBlob)
  formData.append('album', album)
  // other formData that can be set:
  // name, title, description
  // type (base64, file, URL)

  return fetch(uri, {
    mode: 'cors',
    method: 'POST',
    headers: {
      Authorization: 'Client-ID '+clientId,
    },
    body: formData,
  })
  .then( response => Promise.all([response, response.json()]));
}



export const igUploadImageToAlbumNT = (props) => {
  console.log('igUploadImageToAlbumNT called:', props.imageBlob)
  return (dispatch) => {
  //dispatch(getData())
  apiUploadImageToAlbumNT(props)
    .then((data) => {
      console.log('apiUploadImageToAlbum returned data:', data)
      // dispatch(uploadDataSuccess(data))
      // save the deleteHash to localstorage or redux
    })
    .catch((err) => console.log('upload err:', err))
  }
}


/*  // apiExchangeRefreshTokenForToken response:
{
"access_token":"5c3118ebb73fbb275945ab340be60b610a3216d6",
"refresh_token":"d36b474c95bb9ee54b992c7c34fffc2cc343d0a7",
"expires_in":3600,
"token_type":"Bearer",
"account_username":"saponifi3d"
}
*/