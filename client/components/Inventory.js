import _ from 'lodash';
import {round} from '../helpers';
import React, {Component} from 'react';

export default class Inventory extends Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
  }

  renderInventory(key) {
    const product = this.props.products[key];
    const unitsSoldRow = this.props.unitsSold(key);
    const unitsRow = this.props.units(key,unitsSoldRow);

    return(
      <tbody key={key}>
        <tr>
          <td>{product.name}</td>
          {
            this.props.units(key, unitsSoldRow)[0]
            .map((month, i) => {
              return <td key={i}>{round(month, 0)}</td>
            })
          }
        </tr>
        <tr>
          <td>Units Sold</td>
          {
            this.props.unitsSold(key)
            .map((month, i) => {
              return <td key={i}>{round(month, 0)}</td>
            })
          }
        </tr>
        <tr>
          <td>Units Added</td>
          {
            this.props.units(key, unitsSoldRow)[2]
            .map((month, i) => {
              return <td key={i}>{round(month, 0)}</td>
            })
          }
        </tr>
        <tr>
          <td>Remaining</td>
          {
            this.props.units(key, unitsSoldRow)[1]
            .map((month, i) => {
              return <td key={i}>{round(month,0)}</td>
            })
          }
        </tr>
      </tbody>
    );
  }

  render() {
    const {products} = this.props;

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
