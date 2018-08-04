import { Modal } from 'antd-mobile'


// props.callback function to return entered filename
export function LaunchFileDialog(callback) {
  return(
    Modal.prompt('Create File', 'Please input a File name', [
    		{ text: 'Cancel' },
    		{ text: 'Create', onPress: value => {

    				if (value.length > 0) {

    					console.log('.. calling create file api over redux..')
              callback({ fileName: value })

    					//setTimeout(_handleInputChange(creds.igFolder, 'igFolder'),800)

    				} else {
    					console.log('no file name was entered..')
    				}

    			}
    		},
      ], 'default', null, ['file name']
    ) // Modal
  ) // return
}
