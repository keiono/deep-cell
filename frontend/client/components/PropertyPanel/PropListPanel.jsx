import React, {Component, PropTypes} from 'react'

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import OpenIcon from 'material-ui/svg-icons/action/open-in-new'


class PropListPanel extends Component {

  render() {

    let properties = this.props.data
    const keys = Object.keys(properties)
    console.log('------- keys -----------')
    console.log(keys)

    return (

      <List>
        <Subheader>Properties:</Subheader>
        {
          keys.map((p, i) => {
            return (
              <ListItem
                key={i}
                hoverColor={'#80CBC4'}
                primaryTogglesNestedList={true}
                primaryText={properties[p]}
                secondaryText={p}
              />
            )
          })
        }
      </List>
    )
  }

  _handleTouchTap = id => {
    window.open('http://www.yeastgenome.org/locus/' + id);
  }

}


export default PropListPanel
