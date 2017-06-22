import _ from 'lodash';
import React, {Component} from 'react';
import {isEmpty} from '../helpers';

export default class Inventory extends Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
  }

  renderInventory(key) {
    const product = this.props.products[key];
    const fixedAssumptions = this.props.fixedAssumptions;

    return(
      <tbody key={key}>
        <tr>
          <td>{product.name}</td>
          <td key="inventory0" ref="inventory0">{product.unitsPerOrder}</td>
          {/* Loop for 2-36 units remaining */}
          {
            _.times(35, i =>
              <td key={`inventory${i+1}`} ref={`inventory${i+1}`}>i</td>
            )
          }
        </tr>
        <tr>
          <td>Units Sold</td>
          {/* Loop for units per store times (#of fixed stores/product inv t/o)*/}
          {
            _.times(36, i =>
              <td key={`unitssold${i}`}>{product.unitsPerStore * (fixedAssumptions.assumption1.value / product.inventoryTurnoverInMonths)}</td>
            )
          }
        </tr>
        <tr>
          <td>Units Added</td>
        </tr>
        <tr>
          <td>Remaining</td>
        </tr>
      </tbody>
    );
  }

  render() {
    const {products, fixedAssumptions} = this.props;

    if( isEmpty(products) || isEmpty(fixedAssumptions) ) {
      return <div>Missing Products or Assumptions</div>;
    }

    return(
      <div>
        <h3>Inventory</h3>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              {
                _.times(36, i =>
                  <th key={i}>{i+1}</th>
                )
              }
            </tr>
          </thead>
            {
              Object.keys(products)
              .map(this.renderInventory)
            }
        </table>
      </div>
    );
  }
}
