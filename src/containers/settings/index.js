import React, { Component } from 'react'
//import { push } from 'react-router-redux'
//import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'//import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

// HOC for fade in/out of component when routing to and from this component
//import FadeWrapper from '../../hoc/FadeWrapper'
//import RenderList from './renderList'

import { Toast } from 'antd-mobile'

import SettingsForm from './form'

import { hDecode } from '../../helpers/hash'

//import { loadState, saveState } from '../../helpers/localStorage'

//import { setCredentials } from '../../reducers/auth'

import { saveToLocalStorage } from '../../helpers/localStorage'
import { storeSaveState } from '../../store'







// redux action creators to be dispatched with different states that login/logout process go thru..

/*
import {
	fbPageAccessTokenFetching,
	fbPageAccessTokenOk,
	fbPageAccessTokenFail,
	fbAppAccessTokenFetching,
	fbAppAccessTokenOk,
	fbAppAccessTokenFail,
	fbSetCredentials,
} from '../../reducers/auth'

import {
	fbPageFeedFetching,
	fbPageFeedOk,
	fbPageFeedFail,
	fbItemAttachmentsFetching,
	fbItemAttachmentsOk,
	fbItemAttachmentsFail,
} from '../../reducers/graph'

*/

//import { uiSetActivePost } from '../../reducers/ui'



class Settings extends Component {

	constructor(props) {
		super(props)

		console.log('this.props.dispatch:', this.props.dispatch)

		//this.onFormSubmit = this.onFormSubmit.bind(this)
	}



	// values come in already encoded (with hEncode / hDecode)
	onFormSubmit = ({values, newPin, newIgAlbum}) => {

		const igClientId = hDecode(values.igClientId)
		const igClientSecret = hDecode(values.igClientSecret)
		const igPin = hDecode(values.igPin)
		console.log('onFormSubmit values, setting Creds, followed by saveState:', values, newPin)


		// are we having a new ghRepo?
		if (values.ghRepo && values.ghRepo.length > 0 &&
			this.props.credentials && this.props.credentials.ghRepo &&
			this.props.credentials.ghRepo !== values.ghRepo) {

			// new ghRepo... probably a new website to be created. reset lastPage localStorage
			saveToLocalStorage('fbPageUntil', '')
			saveToLocalStorage('fbPagingUri', '')

		}

		// setting redux credentials, but not saving yet..
		this.props.setCredentials(values)


		// was imgurAuthorization clicked and a PIN entered? if so, exchange the pin for an access token
		if (newPin) {
			if (values.igPin.length > 0) {
				this.props.igExchangePinForToken({ igClientId, igClientSecret, igPin })
			}
		}


		// waiting a bit to let previous action do its thing before saving state.
		setTimeout(this.props.dispatchSaveState(),500)

		// maybe this will work..
		setTimeout(storeSaveState(),500)

		if (values.fbAppId) {

			// saving this to localstorage because index.html, reads fbAppId when loading FB SDK
			// likely requires app reload, for this to take effect, as FB SDK needs to load with new appId. !!!!

			// also, fbAppId needs to be stored outside redux, and unencoded as i haven t figured out how
			// to import decode libraries before the FB SDK in index.html
			saveToLocalStorage('fbAppId', hDecode(values.fbAppId))

			// wait some time before reloading the app
			//setTimeout(window.location.reload(),500);

		}

		// notify that saving was successful
		// transition user to incoming (tab1) and refresh?

		Toast.success('Saved !!!', 1)

		this.props.changeTab('tab1')

	}


	render() {

		const rdxProps = this.props


		return(
				<SettingsForm
					credentials={this.props.authCredentials}
					onFormSubmit={this.onFormSubmit}
					onIgCreateAlbum={this.props.igCreateAlbum}
					igAccessToken='' // {rdxProps.imgur_access.access_token }
					igAuthExpiresIn='234234' // {this.props.imgur_access && this.props.imgur_access.expires_in? this.props.imgur_access.expires_in : false }
				/>

		)  // return
	}  // render
}  // class





const mapDispatchToProps = (dispatch) => {
  return {

  	setCredentials: (credentials) => {
  		//dispatch(setCredentials(credentials))
  	},

  	igExchangePinForToken: (props) => {
  		//dispatch(igExchangePinForToken(props))
  	},
  	igCreateAlbum: (props) => {
  		console.log(props)
  		//dispatch(igCreateAlbum(props))
  	}

  }
}

// Swift for TensorFlow, #TFDevSummit @rxwei
// tensorflow.org/community/swift


const mapStateToProps = state => ({
    inProgress: state.auth.inProgress,
    authCredentials: state.auth.credentials,
    imgur_access: state.auth.imgur_access,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings))
