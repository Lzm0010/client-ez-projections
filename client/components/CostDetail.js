import _ from 'lodash';
import React, {Component} from 'react';

export default class CostDetail extends Component {
  constructor() {
    super();
    this.renderCostDetail = this.renderCostDetail.bind(this);
  }

  renderCostDetail(key) {
    const product = this.props.products[key];
    const unitsSoldRow = this.props.unitsSold(key);
    const unitsAddedRow = this.props.units(key, unitsSoldRow)[2];
    const unitsOrderedRow = this.props.unitsOrdered(key, unitsAddedRow);
    const totalCostRow = this.props.totalCost(key, unitsOrderedRow);
    const costPerUnitRow = this.props.costPerUnit(key, unitsOrderedRow, totalCostRow);

    return(
      <tbody key={key}>
        <tr>
          <td>Units Ordered</td>
          {
            this.props.unitsOrdered(key, unitsAddedRow)
            .map((month, i) => {
              return <td key={i}>{month}</td>
            })
          }
        </tr>
        <tr>
          <td>Total Cost</td>
          {
            this.props.totalCost(key, unitsOrderedRow)
            .map((month, i) => {
              return <td key={i}>{month}</td>
            })
          }
        </tr>
        <tr>
          <td>Cost/Unit</td>
          {
            this.props.costPerUnit(key, unitsOrderedRow, totalCostRow)
            .map((month, i) => {
              return <td key={i}>{month}</td>
            })
          }
        </tr>
        <tr>
          <td>{product.name}</td>
          {
            this.props.monthlyCost(key, costPerUnitRow, unitsSoldRow)
            .map((month, i) => {
              return <td key={i}>{month}</td>
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
        <h3>Cost Detail</h3>
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
              .map(this.renderCostDetail)
            }
        </table>
      </div>
    );
  }
}
