import React, {Component} from 'react';
import Inventory from './Inventory';
import SalesDetail from './SalesDetail';
import CostDetail from './CostDetail';
import ProfitLossStatement from './ProfitLossStatement';
import BalanceSheet from './BalanceSheet';
import CashFlow from './CashFlow';

export default class Dashboard extends Component {

  render(){
    return(
      <div>
        <h2>Dashboard</h2>
        <Inventory
          products={this.props.products}
          fixedAssumptions={this.props.fixedAssumptions}
        />
        <SalesDetail />
        <CostDetail />
        <ProfitLossStatement />
        <BalanceSheet />
        <CashFlow />
      </div>
    );
  }
}
