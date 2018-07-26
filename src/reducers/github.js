export const GH_CREATE_FILE_REQ = 'octokat/GH_CREATE_FILE_REQ'
export const GH_CREATE_FILE_SUCCEED = 'octokat/GH_CREATE_FILE_SUCCEED'
export const GH_CREATE_FILE_FAIL = 'octokat/GH_CREATE_FILE_FAIL'


const initialState = {
  busy: false,
  err: null,
  sha: null,
  success: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GH_CREATE_FILE_REQ:
      return {
        ...state,
        busy: true,
        err: null
      }

    case GH_CREATE_FILE_SUCCEED:
      return {
        ...state,

        busy: false,
        sha: action.payload.sha,
        success: action.payload.success,
        err: null
      }

    case GH_CREATE_FILE_FAIL:
      return {
        ...state,
        busy: false,
        success: action.payload.success,
        err: action.payload.err
      }


    default:
      return state
  }
}


/*

export const gh = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    dispatch({
      type: INCREMENT
    })
  }
}

export const incrementAsync = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: INCREMENT
      })
    }, 3000)
  }
}

export const decrement = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    dispatch({
      type: DECREMENT
    })
  }
}

export const decrementAsync = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: DECREMENT
      })
    }, 3000)
  }
}
*/
