import React, {Component} from 'react';

export default class Dashboard extends Component {
  render(){
    return(
      <div>
        <h2>Dashboard</h2>
        <div>Inventory</div>
        <div>Sales Detail</div>
        <div>Cost Detail</div>
        <div>Profit & Loss</div>
        <div>Balance Sheet</div>
        <div>Cash Flow</div>
      </div>
    );
  }
}
