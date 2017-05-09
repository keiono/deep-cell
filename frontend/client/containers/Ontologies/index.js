import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TopPage from '../../components/TopPage'
import * as ontologiesActions from '../../actions/ontologies'

import style from './style.css'


class Ontologies extends Component {

  render() {

    return (
      <MuiThemeProvider>
        <TopPage
          ontologies={this.props.ontologies}
        />
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    ontologies: state.ontologies
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ontologiesActions: bindActionCreators(ontologiesActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ontologies)
