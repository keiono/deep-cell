import {Client} from 'elasticsearch'
import config from '../assets/config.json'

const client = new Client({
  host: config.backendServices.db,
  log: 'info'
});



export const FETCH_PROPERTY = 'FETCH_PROPERTY'
const fetchProperty = (id, options) => {
  return {
    type: FETCH_PROPERTY,
    id,
    options
  }
}


export const RECEIVE_PROPERTY = 'RECEIVE_PROPERTY'
const receiveProperty = (id, json) => {

  console.log("*** Fetch Result ***")
  console.log(json)

  return {
    type: RECEIVE_PROPERTY,
    id,
    data: json
  }
}

const fetchProp = (id, options) => {

  options.id = id
  return client.get(options)
}

export const fetchEntry = (id, options) => {

  return dispatch => {
    dispatch(fetchProperty(id, options))

    return fetchProp(id, options)
      .then(json =>
        dispatch(receiveProperty(id, json))
      )
  }
}

export const setProperty = (id, props) => {
  console.log("*** Props for the term ***")
  console.log(props)

  return {
    type: RECEIVE_PROPERTY,
    id,
    data: props
  }

}

export const CLEAR_PROPERTY = 'CLEAR_PROPERTY'
export const clearProperty = () => {
  return {
    type: CLEAR_PROPERTY,
    id: null,
    options: {}
  }
}
