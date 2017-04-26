import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import * as networkSourceActions from '../../reducers/currentnetwork'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TopPage from '../../components/TopPage'

import style from './style.css'
import presets from '../../assets/preset-styles.json'

const PRESET_STYLES_LOCATION = '../../assets/preset-styles.json'


class Ontologies extends Component {

  componentWillMount() {
    // Extract query params
    const queryParams = this.props.location.query
    const networkId = queryParams.url
    const styleName = queryParams.style
  }

  render() {

    const {currentNetwork, networkSourceActions, datasourceActions, datasource} = this.props

    return (
      <MuiThemeProvider>
        <TopPage
          currentNetwork={currentNetwork}
          networkSourceActions={networkSourceActions}
          datasourceActions={datasourceActions}
          datasource={datasource}
        />
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentNetwork: state.app_manager.current_network,
    datasource: state.app_manager.datasource,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    networkSourceActions: bindActionCreators(networkSourceActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ontologies)
