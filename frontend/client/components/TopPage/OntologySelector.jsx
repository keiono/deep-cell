import React, {Component} from 'react'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import style from './style.css'

class OntologySelector extends Component {

  state = {
    value: 1
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div>
        <div>
        <SelectField floatingLabelText="Select an ontology" value={this.state.value} onChange={this.handleChange} autoWidth={true}>
          <MenuItem value={1} primaryText="FanGO"/>
          <MenuItem value={2} primaryText="Ontology 1"/>
          <MenuItem value={3} primaryText="Ontology 2"/>
        </SelectField>
        </div>
        <TextField hintText="URL of ontology" floatingLabelText="Or, enter ontology URL"/>
      </div>
    )
  }
}

export default OntologySelector
