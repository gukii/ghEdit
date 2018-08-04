import React from 'react'
import { hEncode, hDecode } from '../../helpers/hash'

import { NavBar, Icon, List, InputItem, WhiteSpace, WingBlank, Button, SegmentedControl, Modal } from 'antd-mobile'



//import { igExchangePinForToken } from '../../helpers/igApiHelpers'
//import {timeStampExpired, timeStampExpiredByMinutes} from '../login'


//import { createForm } from 'rc-form';





////////////////////////  icon imports /////

//import FaFacebookSquare from 'react-icons/lib/fa/facebook-square'
import FaGithubAlt from 'react-icons/lib/fa/github-alt'
/*import FaImage from 'react-icons/lib/fa/image'
import MdCollections from 'react-icons/lib/md/collections'

import MdHelp from 'react-icons/lib/md/help'
import FaCloudDownload from 'react-icons/lib/fa/cloud-download'
import FaCloudUpload from 'react-icons/lib/fa/cloud-upload'

import FaCodeFork from 'react-icons/lib/fa/code-fork'
import FaSitemap from 'react-icons/lib/fa/sitemap'
import MdTranslate from 'react-icons/lib/md/translate'


import FaEdit from 'react-icons/lib/fa/edit'
import FaEye from 'react-icons/lib/fa/eye'

import FaFileImageO from 'react-icons/lib/fa/file-image-o'
import FaFileMovieO from 'react-icons/lib/fa/file-movie-o'
import FaFileTextO from 'react-icons/lib/fa/file-text-o'

import FaFilter from 'react-icons/lib/fa/filter' */
import FaFolder from 'react-icons/lib/fa/folder'
import FaFolderOpen from 'react-icons/lib/fa/folder-open'

// Tag / FileName / Template
/*import FaTags from 'react-icons/lib/fa/tags' // tag
import FaHashtag from 'react-icons/lib/fa/hashtag' // tag
import FaFileText from 'react-icons/lib/fa/file-text' // for file name?
import FaCogs from 'react-icons/lib/fa/cogs'
import FaCog from 'react-icons/lib/fa/cog' //
import FaCode from 'react-icons/lib/fa/code'  // for template code

import FaUnlock from 'react-icons/lib/fa/unlock'*/
import FaUnlockAlt from 'react-icons/lib/fa/unlock-alt'
import FaLock from 'react-icons/lib/fa/lock'

// app access / page access / personal access token
import MdApps from 'react-icons/lib/md/apps'
import IoDocumentText from 'react-icons/lib/io/document-text'

/*import MdSettingsApplications from 'react-icons/lib/md/settings-applications'
import IoAndroidContact from 'react-icons/lib/io/android-contact'
import MdBlurLinear from 'react-icons/lib/md/blur-linear'


// payment
import IoCard from 'react-icons/lib/io/card'
import IoCash from 'react-icons/lib/io/cash'
import IoSocialBitcoinOutline from 'react-icons/lib/io/social-bitcoin-outline'

// username / password / secret / pageId

import FaUserSecret from 'react-icons/lib/fa/user-secret'*/
import FaUser from 'react-icons/lib/fa/user'




/*
Domain name
Company / Website name
Description
Email + other contact options

*/


class SettingsForm extends React.Component {

	constructor(props) {
		super(props)
		const creds = this.props.credentials
		this.state = { input: {
			// CREDENTIALS:
			//facebook
			fbAppId: creds && creds.fbAppId? hDecode(creds.fbAppId) : '',
			fbAppSecret: creds && creds.fbAppSecret? hDecode(creds.fbAppSecret) : '',
			fbPageId: creds && creds.fbPageId? hDecode(creds.fbPageId) : '',

			// github
			ghUser: creds && creds.ghUser? hDecode(creds.ghUser) : '',
			ghPass: creds && creds.ghPass? hDecode(creds.ghPass) : '',
			ghRepo: creds && creds.ghRepo? hDecode(creds.ghRepo) : '',
			ghFolder: creds && creds.ghFolder? hDecode(creds.ghFolder) : '',

			// imgur
			igClientId: creds && creds.igClientId? hDecode(creds.igClientId) : '',
			igClientSecret: creds && creds.igClientSecret? hDecode(creds.igClientSecret) : '',
			igPin: creds && creds.igPin? hDecode(creds.igPin) : '',
			igFolder: creds && creds.igFolder? hDecode(creds.igFolder) : '',

			// category keywords
			ghKeywords: creds && creds.ghKeywords? hDecode(creds.ghKeywords) : '',

			// SETTINGS:
			//fbImageDownloadDelay: 0, // in ms
			//fbImageDownloadSetDelay: 500,

			//igUploadDelay: 0,

			//activeSegment: 0,
		},
		igLinkClicked: false, // when the user clicks the "authorize imgur" link
		igAuthExpiresIn: props.igAuthExpiresIn? props.igAuthExpiresIn : false, // if igExchangePinForToken worked
    }

    this.handleInputChange = this.handleInputChange.bind(this)

    this.renderInputField = this.renderInputField.bind(this)
    this.callFormSubmit = this.callFormSubmit.bind(this)
  }


  componentDidMount() {
    // this.autoFocusInst.focus();
  }


  handleInputChange(value, field) {

		const obj = {
			[field]: value
		}

		this.setState({ input: {...this.state.input, ...obj}})

  }

  	// for testing SegmentedControl
	onSegmentChange(e) {
		console.log('onSegmentChange', e)
	}

	onSegmentValueChange(e) {
		console.log('onSegmentValueChange', e)
	}



  // this is not using a antd rc- HOC
  callFormSubmit = () => {

  	//console.log('this.state.input unencoded:', this.state.input)

  	const value = this.state.input

  	// for exchanging pin for token
  	//const { igClientId, igClientSecret, igPin } = this.state.input

  	// removing any object key/value pairs that are undefined or otherwise might not qualify
  	let returnObj = {}

		for (var property in value) {
		    if (value.hasOwnProperty(property) && value[property]) {
		        //console.log(property, value[property])
		        returnObj[property] = hEncode(value[property])
		    }
		}


		//console.log('returnObj:', returnObj)
		this.props.onFormSubmit({ values: returnObj, newPin: this.state.igLinkClicked })

  }

/*
  handleAutoFocusClick = () => {
    this.customFocusInst.focus()
  }
*/
  renderInputField({ fieldName, placeholder, label, autoFocus=false, createRef=false }) {

		if (fieldName === undefined) {
			return
		}

		const that = this
		//const { getFieldProps } = this.props.form
		//console.log('this.state.input[fieldName]:', this.state.input[fieldName])
		//console.log('--fieldName:', fieldName)

		return(
				<InputItem
					clear
					placeholder={placeholder}
					//labelNumber="7"
					value={this.state.input[fieldName]}
					onChange={(e) => that.handleInputChange(e, fieldName)}
					name={fieldName}
					key={fieldName}
					ref={ createRef? el => this.customFocusInst = el : '' }
					style={ autoFocus? { background: 'yellow' } : {}}
				>
					{label}
				</InputItem>
			)
  }


  // auto-focuses on a field, e.g. an input field that ll expect input after a action
  // (with imgur this is necessary when coming back from copying the PIN from a website)
  handleIgLinkClicked = () => {

  		// set this to true, so that the background of that input field will change color
  		this.setState({ igLinkClicked: true })

  		// focus on PIN input field for returning user
  		this.customFocusInst.focus()

  }



  createIgAlbum = (fnProps) => {

	const _onIgCreateAlbum = this.props.onIgCreateAlbum
	const _access_token = this.props.igAccessToken
	const creds = this.props.credentials
	const _handleInputChange = this.handleInputChange


    Modal.prompt('Create Album', 'Please input an album name', [
		{ text: 'Cancel' },
		{ text: 'Create', onPress: value => {
				if (value.length > 0) {
					console.log('.. calling ig api over redux..')
					_onIgCreateAlbum({ igAlbumTitle: value, igAlbumDesc:'', igPrivacy: 'public', igAccessToken: _access_token, igLayout:'grid' }) // , igLayout='grid'

					setTimeout(_handleInputChange(creds.igFolder, 'igFolder'),800)

				} else {
					console.log('no album name was entered..')
				}

			}
		},
	  ], 'default', null, ['album name'])


  }


  render() {

	// variables used to authorize imgur, showing a PIN in a new window
	const igClientId = this.state.input.igClientId
	const igResponseType = 'pin'
	const igAppState = 'testState'
	const igUri = 'https://api.imgur.com/oauth2/authorize?client_id='+igClientId+'&response_type='+igResponseType+'&state='+igAppState

	const showAutoFocus = this.state.igLinkClicked

	const screenHeight = window.innerHeight-55-50 // because of the tabbar and the menu

    return (
	  <div>
	  
		<NavBar
		mode="dark"
		leftContent="Back"
		rightContent={
			<Button
			type={'warning'}
			inline={true}
			size={'small'}
			onClick={this.callFormSubmit}
		>
			Save
		</Button>			
		}
		>NavBar</NavBar>	  

      	<WingBlank style={{ paddingTop: 0, backgroundColor: 'white', height: screenHeight, textAlign: 'center', overflowY:'scroll' }}>





		  <List.Item>
				Settings:
				<SegmentedControl
					selectedIndex={this.state.activeSegment}
					values={['GH', 'IG', 'FB', 'Web']}
					onChange={this.onSegmentChange}
					onValueChange={this.onSegmentValueChange}
				/>
	  		</List.Item>


			<List renderHeader={() => 'Github Settings'}>

				{this.renderInputField({
						fieldName: 'ghUser',
						placeholder: 'Github Username',
						label: <span><FaGithubAlt style={{ width: '22px', height: '22px'}} />
						<FaUser style={{ width: '22px', height: '22px'}} /></span>,
					})
				}

				{this.renderInputField({
						fieldName: 'ghPass',
						placeholder: 'Github Password',
						label: <span><FaGithubAlt style={{ width: '22px', height: '22px'}} />
						<FaUnlockAlt style={{ width: '22px', height: '22px'}} /></span>,
					})
				}

				{this.renderInputField({
						fieldName: 'ghRepo',
						placeholder: 'Github Repo',
						label: <span><FaGithubAlt style={{ width: '22px', height: '22px'}} />
						<FaFolderOpen style={{ width: '22px', height: '22px'}} /></span>,
					})
				}

				{this.renderInputField({
						fieldName: 'ghFolder',
						placeholder: 'Github Folder',
						label: <span><FaGithubAlt style={{ width: '22px', height: '22px'}} />
						<FaFolder style={{ width: '22px', height: '22px'}} /></span>,
					})
				}


			</List>
			<WhiteSpace/>



			<List renderHeader={() => 'Imgur Settings'}>

				{this.renderInputField({
						fieldName: 'igClientId',
						placeholder: 'Imgur Client Id',
						label: <span>ig <MdApps style={{ width: '22px', height: '22px'}} /></span>,
					})
				}

				{this.renderInputField({
						fieldName: 'igFolder',
						placeholder: 'Imgur Folder',
						label: <span>ig <FaFolder style={{ width: '22px', height: '22px'}} /></span>,
					})
				}

				{this.renderInputField({
						fieldName: 'igClientSecret',
						placeholder: 'Imgur Secret',
						label: <span>ig <FaLock style={{ width: '22px', height: '22px'}} /></span>,
					})
				}

				{this.renderInputField({
						fieldName: 'igPin',
						placeholder: 'Imgur Pin',
						label: <span>ig PIN</span>,
						autoFocus: this.state.igLinkClicked,
						createRef: true,
					})
				}
				<WhiteSpace/>
				<WhiteSpace/>

				<a href={igUri} onClick={ this.handleIgLinkClicked } target="_blank">Get Imgur PIN</a>
				
				<WhiteSpace/>
				<WhiteSpace/>




				<Button
					type={'ghost'}
					size={'small'}
					onClick={this.createIgAlbum}
				>
					Create New Album
				</Button>

			</List>
			<WhiteSpace/>



	    </WingBlank>

      </div>
    )
  }
}


export default SettingsForm

//const SettingsFormWrapper = createForm()(SettingsForm);

//export default SettingsFormWrapper
