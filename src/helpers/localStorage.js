// localStorage.js for redux storage, from Abramov's video:
// https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage

export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('state')
		if (serializedState === null) {
			return undefined
		}
		return JSON.parse(serializedState)
	} catch (err) {
		return undefined
	}
}

export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state)
		localStorage.setItem('state', serializedState)
	} catch (err) {
		// ignore write errors for now..
		return undefined
	}
}


// helper functions to save / load to / from localstorage
// used for imgur data

export const loadFromLocalStorage = (key) => {
	try {
		const serializedState = localStorage.getItem(key)
		if (serializedState === null) {
			return undefined
		}
		return JSON.parse(serializedState)
	} catch (err) {
		return undefined
	}
}

export const saveToLocalStorage = (key, value) => {
	try {
		const serializedState = JSON.stringify(value)
		localStorage.setItem(key, serializedState)
	} catch (err) {
		// ignore write errors for now..
		return undefined
	}
}

// keep is an array of keys to keep from being delete from localstorage
export const clearAllLocalStorageBut = (keep) => {

  for (var i = 0; i < localStorage.length; i++) {
  	const key = localStorage.key(i).toLowerCase()
  	if (keep.includes(key)) {
  		// keep item
  	} else {
  		localStorage.removeItem(key)
  	}
  }
}

// got hEncrypt / hDecrypt helpers, if i want to encrypt here..
