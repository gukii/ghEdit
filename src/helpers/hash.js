
import hash from 'hashids'
//import hash from 'hashids/lib/hashids'

const hashids = new hash()
//const hashids = new hash('my test hash')

export const hEncode = (myStr) => {
	const hex = Buffer(myStr).toString('hex')
	return hashids.encodeHex(hex)
}

export const hDecode = (myStr) => {
	const plainHex = hashids.decodeHex(myStr)
	return hexToString(plainHex)
	//return Buffer(plainHex).toString('utf8')
}


// not sure why toString('utf8') is not decoding to plain ascii..., so here s a hack..
function hexToString (hex) {
    var string = '';
    for (var i = 0; i < hex.length; i += 2) {
      string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return string;
}
