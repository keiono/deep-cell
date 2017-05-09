import React, {Component} from 'react'

import Title from './Title'
import Footer from './Footer'

import style from './style.css'

export default class TopPage extends Component {

  render() {
    const {ontologies} = this.props

    return (
      <div className={style.top}>

        <Title
          ontologies={ontologies}
         />

        <Footer/>
      </div>
    )
  }
}
