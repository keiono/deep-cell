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

    const ontologies = this.props.ontologies.toJS()
    const names = Object.keys(ontologies)

    return (
      <div className={style.dataSource}>
        <div className={style.source}>
          <SelectField floatingLabelText="Select an ontology" value={this.state.value} onChange={this.handleChange} autoWidth={true}>
            {
              names.map(
                (val, i) => {
                  return <MenuItem key={i} value={val} primaryText={val}/>
                })
            }

          </SelectField>
        </div>
        <TextField className={style.source} hintText="Ontology Name:" floatingLabelText=""/>
        <TextField className={style.source} hintText="URL of ontology:" floatingLabelText=""/>
      </div>
    )
  }
}

export default OntologySelector
