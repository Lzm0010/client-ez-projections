import React, {Component} from 'react';
import AddAssumptionForm from './AddAssumptionForm';

export default class FixedAssumptionTable extends Component {
  constructor() {
    super();
    this.renderFixedAssumptionTable = this.renderFixedAssumptionTable.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    const fixedAssumption = this.props.fixedAssumptions[key];

    const updatedAssumption = {
      ...fixedAssumption,
      [e.target.name]: e.target.value
    }
    this.props.updateAssumption(key, updatedAssumption);
  }

  renderFixedAssumptionTable(key) {
    const fixedAssumption = this.props.fixedAssumptions[key];
    return(
      <tr className="assumption-edit" key={key}>
        <td><input name="name" type="text" value={fixedAssumption.name} placeholder="Assumption" onChange={(e) => this.handleChange(e, key)}/></td>
        <td><input name="value" type="number" value={fixedAssumption.value} placeholder="Value" onChange={(e) => this.handleChange(e, key)}/></td>
        <td><input name="category" type="text" value={fixedAssumption.category} placeholder="Category" onChange={(e) => this.handleChange(e, key)}/></td>
        <td><button onClick={() => this.props.removeAssumption(key)}>Remove Assumption</button></td>
      </tr>
    );
  }

  render(){
    return(
      <div>
        <h2>Fixed Assumptions</h2>
        <table>
          <thead>
            <tr>
              <th>Assumption</th>
              <th>Value</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(this.props.fixedAssumptions)
              .map(this.renderFixedAssumptionTable)
            }
          </tbody>
        </table>
        <AddAssumptionForm addAssumption={this.props.addAssumption} />
        <button onClick={this.props.loadSampleAssumptions}>Load Sample Assumptions</button>
      </div>
    );
  }
}
