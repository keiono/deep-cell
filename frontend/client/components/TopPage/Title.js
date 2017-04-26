import React, {Component} from 'react'
import {browserHistory} from 'react-router'

import FlatButton from 'material-ui/FlatButton';
import * as Colors from 'material-ui/styles/colors'

import OntologySelector from './OntologySelector'

import style from './style.css'


export default class Title extends Component {

  handleStart = () => {
    browserHistory.push('/app')
  }

  render() {
    return (
      <div className={style.title}>

        <div className={style.col2}>
          <section className={style.titleText}>
            Ontology Viewer &beta;
          </section>

          <section className={style.description}>
            Universal browser for hierarchical data sets
          </section>


          <OntologySelector />
          
          <section className={style.start}>

            <FlatButton
              className={style.startButton}
              backgroundColor={Colors.teal500}
              hoverColor={Colors.teal300}
              label="Start"
              onClick={this.handleStart}
            />
          </section>
        </div>
      </div>
    )
  }
}
