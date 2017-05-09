import {handleActions} from 'redux-actions'
import {Map} from 'immutable'
import {ADD_ONTOLOGY, REMOVE_ONTOLOGY} from '../actions/ontologies'

const defaultState = new Map({
  'FanGO': 'http://ndexbio.org/#/newNetwork/f6aa4772-297b-11e7-8f50-0ac135e8bacf',
  'CLIXO': 'https://gist.githubusercontent.com/keiono/9cc1186549b0f29b2ab427f6cf9edfae/raw/97269392e54907fbdb9e59423a05b24b6449ec17/clixo-tree.cyjs'
})


export default handleActions({
  ADD_ONTOLOGY: (state, action) => (
    state.set(action.payload.url, action.payload)
  ),

  REMOVE_ONTOLOGY: (state, action) => (
    state.delete(action.payload.url)
  )
}, defaultState)
