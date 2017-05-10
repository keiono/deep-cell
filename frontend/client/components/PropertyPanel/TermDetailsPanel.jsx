import React, {Component} from 'react'

import {List, ListItem} from 'material-ui/List';

import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import TitleBar from './TitleBar'

import RawInteractionPanel from './RawInteractionPanel'
import GeneList from './GeneList'
import PropListPanel from './PropListPanel'

import Immutable from 'immutable'
import FilterPanel from './FilterPanel'

import SimpleGeneList from './SimpleGeneList'

import Loading from '../Loading'
import OpenIcon from 'material-ui/svg-icons/action/open-in-new'

import * as d3Scale from 'd3-scale'
import * as d3ScaleChromatic from 'd3-scale-chromatic'

const colorFunction = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeDark2)

const descriptionStyle = {
  background: '#BEBEB4',
  padding: '0.2em'
}

const disabledStyle = {
  background: '#999999'
}

class TermDetailsPanel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      subtree: {},
      scoreFilter: 1.0,
      subnet: {}
    };
  }

  componentDidMount() {}

  setScore = (val) => {
    this.setState({scoreFilter: val})
    console.log('New Score: ' + val)

    this.props.commandActions.filter({
      options: {
        type: 'numeric',
        range: 'edge[score > ' + val + ']'
      },
      target: 'subnet'
    })
  }

  render() {
    console.log("%%%%%%%%%%%%%%%% Rendering Term Panel")
    console.log(this.props)
    console.log("Raw interactions:")
    const raw = this.props.rawInteractions.toJS();

    const interactions = raw.interactions

    // Term property
    const details = this.props.currentProperty
    if (details === undefined || details === null || details.id === null || details.id === undefined) {
      console.log("%%%%%%%%%%%%%%%% EMPTY---------------Panel")
      return (
        <div></div>
      )
    }

    // Loading
    if (details.loading) {
      return (<Loading style={descriptionStyle}/>)
    }

    const data = details.data

    let entry = {}

    let subnet = null

    let nodeList = []
    if (data === undefined) {
      entry = {}
    } else {
      entry = data
      subnet = interactions

      if(subnet !== null && subnet !== undefined) {
        nodeList = subnet.elements.nodes.map(node=>(node.data.name))
      }
    }

    const keys = Object.keys(data)


    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@ render PANEL @@@@@@@@@@@@@@@@@@@@")
    console.log(nodeList)


    return (
      <div>
        <RawInteractionPanel
          subnet={interactions}
          selectedTerm={this.props.currentProperty.id}
          handleClose={this.props.handleClose}
          commandActions={this.props.commandActions}
          loading={this.props.currentProperty.loading}
        />

        <FilterPanel colorFunction={colorFunction} setScore={this.setScore}/>

        <TitleBar title={entry.name}/>

        <Divider/>

        <PropListPanel data={entry}/>

        <SimpleGeneList genes={nodeList}/>


      </div>
    )
  }

  _handleTouchTap = id => {
    window.open('http://amigo.geneontology.org/amigo/term/' + id);
  }
}

export default TermDetailsPanel
