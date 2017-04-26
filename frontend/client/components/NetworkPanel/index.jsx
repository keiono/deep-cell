import React, {Component} from 'react'
import {browserHistory} from 'react-router'

import CyViewer from 'cy-viewer'

import Loading from '../Loading'

import ErrorIcon from 'material-ui/svg-icons/alert/error-outline'
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back'
import FlatButton from 'material-ui/FlatButton'

import style from './style.css'

import {Map} from 'immutable'


class NetworkPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      updating: false
    };
  }


  selectNodes = (nodeIds, nodeProps) => {
    const node = nodeIds[0]
    const props = nodeProps[node]

    console.log('====== Custom node select function called! ========');

    window.setTimeout(()=>{
      const root = this.props.trees[this.props.currentNetwork.id].rootNode

      this.props.eventActions.selected(nodeProps[nodeIds[0]])
      this.props.commandActions.findPath({startId:nodeIds[0].replace(/\:/, '\\:'), endId: root.replace(/\:/, '\\:')})

      const options = this.props.trees[this.props.currentNetwork.id].searchOptions
      this.props.propertyActions.fetchEntry(props.id, options)
    }, 0)
  }

  selectEdges = (edgeIds, edgeProps) => {
    console.log('====== Custom edge select function called! ========');
    console.log('Selected Edge ID: ' + edgeIds)
    console.log(edgeProps)
  }

// Then use it as a custom handler
  getCustomEventHandlers = () => ({
    selectNodes: this.selectNodes,
    selectEdges: this.selectEdges
  })

  handleBack = () => {
    browserHistory.push('/')
  }

  // Initialize
  componentWillMount() {
    const url = this.props.trees[this.props.currentNetwork.id].url
    this.props.networkActions.fetchNetworkFromUrl(url)
  }

  componentWillReceiveProps(nextProps) {
    const nextNet = nextProps.currentNetwork
    const newUrl = nextProps.trees[nextNet.id].url
    const network = this.props.network.get(newUrl)

    if(network === undefined || network === null) {

      // Need to fetch network data
      if(nextNet.id !== this.props.currentNetwork.id) {
        this.props.networkActions.fetchNetworkFromUrl(newUrl)
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {

    if(nextProps.commands.target === 'subnet') {
      return false
    }

    const curNet = this.props.currentNetwork
    const nextNet = nextProps.currentNetwork

    const curNetId = curNet.id
    const nextNetId = nextNet.id

    if(curNetId === nextNetId && nextProps.network.get('loading') === this.props.network.get('loading')) {
      // Check commands difference
      if (this.props.commands !== nextProps.commands) {
        return true
      }

      return false
    }

    const newUrl = nextProps.trees[nextNetId].url
    const network = nextProps.network.get(newUrl)

    if(network === undefined) {
      return false
    }

    return true
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("##################################################################################################################RENDERED!!!!!!!!!")

    this.props.messageActions.setMessage('Neural network browser is ready!')

    window.setTimeout(() => {
      this.props.messageActions.setMessage('Ontology Viewer v0.1')
    }, 3000)
  }

  getError() {
    return (
      <div className={style.container}>
        <h1>A Problem Occurred While Downloading Data</h1>
        <h2>Possible Causes:</h2>
        <h3>Invalid URL</h3>
        <h3>Invalid NDEx ID</h3>
        <h3>Remote server is down</h3>
        <ErrorIcon
          color={'#ff0033'}
          style={{width: '40%', height: '40%'}}
        />

        <FlatButton
          label="Back to Data Source Selector"
          labelPosition='after'
          labelStyle={{fontWeight: 700}}
          icon={<BackIcon/>}
          onClick={this.handleBack}
        />
      </div>
    )
  }

  getVisualStyle = () => ({
    style: [ {
      "selector" : "node",
      "css" : {
        "text-valign" : "center",
        "text-halign" : "right",
        "shape" : "ellipse",
        "color" : "#000000",
        "background-color" : "rgb(204,204,204)",
        "height" : 20,
        "width" : 20,
        "content" : "data(GO_description)",
        "font-size" : '2em',
        "text-opacity" : 1,
        'text-wrap': 'wrap',
        // 'text-max-width': '850px',
        'z-index': 1
      }
    }, {
      "selector" : "node[name = 'GO:00SUPER']",
      "css" : {
        'font-size': '20em',
        'label': 'Root'
      }
    }, {
      "selector" : "node:selected",
      "css" : {
        "background-color" : "red",
        "font-size" : '7em',
        "color" : "red",
        "text-opacity": 0.7,
        'text-max-width': '400px',
        'z-index': 109,
        "min-zoomed-font-size": 0,
        width: 25,
        height: 25
      }
    }, {
      "selector" : "edge",
      "css" : {
        "width" : 5.0,
        'opacity': 1,
        "line-color" : "rgb(132,132,132)",
      }
    }, {
      "selector" : "edge:selected",
      "css" : {
        "line-color" : "red",
        "width": 10,
        'opacity': 1
      }
    }, {
      "selector" : ".focused",
      "css" : {
        "background-color" : "teal",
        "font-size" : '4em',
        "color" : "teal",
        "text-opacity": 1,
        'text-max-width': '500px',
        'z-index': 999,
        "min-zoomed-font-size": 0,
        width: 50,
        height: 50
      }
    }, {
      "selector" : ".faded",
      "css" : {
        "background-color" : "black",
        "line-color" : "black",
        color: "black",
        opacity: 0.2
      }
    } ]
  })


  render() {
    console.log('**** MAIN VIEW ============================================================== Custom node select function called! ========');
    console.log(this.props)

    const loading = this.props.network.get('loading')

    if(loading) {
      return (
        <Loading />
      )
    }

    let commands = this.props.commands
    if(commands.target === 'subnet') {
      console.log("%%%%%ignore")
      commands = Map({
        command: '',
        parameters: {}
      })
    }


    const networkAreaStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    };


    const curNetId = this.props.currentNetwork.id
    const url = this.props.trees[curNetId].url
    const networkProp = this.props.network
    const networkData = networkProp.get(url)


    let style = this.getVisualStyle()

    console.log(style)

    return (
      <CyViewer
        key="mainView"
        network={networkData}
        networkType={'cyjs'}
        style={networkAreaStyle}
        networkStyle={style}
        eventHandlers={this.getCustomEventHandlers()}
        command={commands}
      />
    )
  }
}

export default NetworkPanel
