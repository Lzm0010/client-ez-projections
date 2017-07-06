import _ from 'lodash';
import React, {Component} from 'react';

export default class BalanceSheet extends Component {
  constructor(){
    super();

    this.filterSales = this.filterSales.bind(this);
    this.filterExpenses = this.filterExpenses.bind(this);
    this.getExpensesArray = this.getExpensesArray.bind(this);
    this.renderAR = this.renderAR.bind(this);
    this.renderAP = this.renderAP.bind(this);
    this.renderInv = this.renderInv.bind(this);
    this.renderCapitalStock = this.renderCapitalStock.bind(this);
    this.renderRetainedEarnings = this.renderRetainedEarnings.bind(this);
    this.renderTotalEquity = this.renderTotalEquity.bind(this);
    this.renderTotalLiabilityAndEquity = this.renderTotalLiabilityAndEquity.bind(this);
    this.renderCash = this.renderCash.bind(this);
    this.renderCurrentAssets = this.renderCurrentAssets.bind(this);
  }

  //EXPENSE FILTERING METHODS
  filterSales(key) {
    const fixedAssumption = this.props.fixedAssumptions[key];
    return fixedAssumption.category === "sales" ? fixedAssumption : null;
  }

  filterExpenses(key) {
    const fixedAssumption = this.props.fixedAssumptions[key];
    return fixedAssumption.category === "expense" ? fixedAssumption : null;
  }

  getExpensesArray(key) {
    const fixedAssumption = this.props.fixedAssumptions[key];
    const expArray = [];
    _.times(36, i => {
      expArray.push(fixedAssumption.value)
    });

    return expArray;
  }

  //RENDERING METHODS

  renderCash(){
    const totalIncomeRow = this.props.totalIncome();
    const arRow = this.props.actRec(totalIncomeRow);
    const changeInArRow = this.props.changeInAR(arRow);
    const cashInRow = this.props.totalCashInflows(changeInArRow, totalIncomeRow)

    const costOfAllRow = this.props.costOfAll();
    const invRow = this.props.inv(costOfAllRow);
    const changeInvRow = this.props.changeInInv(invRow);

    const totalExpensesRow = this.props.totalExpenses(this.filterExpenses, this.getExpensesArray);
    const apRow = this.props.actPay(costOfAllRow, totalExpensesRow);
    const changeApRow = this.props.changeInAP(apRow);
    const cashOutRow = this.props.totalCashOutFlows(changeInvRow, changeApRow, costOfAllRow, totalExpensesRow);
    const netCashRow = this.props.netCashFlow(cashInRow, cashOutRow);

    const equityRow = this.props.equityFinancing();

    return(
      this.props.cash(netCashRow, equityRow)[1]
      .map((month, i) => {
        return <td key={i}>{month}</td>
      })
    )
  }

  renderAR() {
    const totalIncomeRow = this.props.totalIncome();

    return(
      this.props.actRec(totalIncomeRow)
      .map((month, i) => {
        return <td key={i}>{month}</td>
      })
    )
  }

  renderInv(){
    const costOfAllRow = this.props.costOfAll();

    return(
      this.props.inv(costOfAllRow)
      .map((month, i) => {
        return <td key={i}>{month}</td>
      })
    )
  }

  renderCurrentAssets(){
    const totalIncomeRow = this.props.totalIncome();
    const arRow = this.props.actRec(totalIncomeRow);
    const changeInArRow = this.props.changeInAR(arRow);
    const cashInRow = this.props.totalCashInflows(changeInArRow, totalIncomeRow)

    const costOfAllRow = this.props.costOfAll();
    const invRow = this.props.inv(costOfAllRow);
    const changeInvRow = this.props.changeInInv(invRow);

    const totalExpensesRow = this.props.totalExpenses(this.filterExpenses, this.getExpensesArray);
    const apRow = this.props.actPay(costOfAllRow, totalExpensesRow);
    const changeApRow = this.props.changeInAP(apRow);
    const cashOutRow = this.props.totalCashOutFlows(changeInvRow, changeApRow, costOfAllRow, totalExpensesRow);

    const netCashRow = this.props.netCashFlow(cashInRow, cashOutRow);
    const equityRow = this.props.equityFinancing();
    const cashRow = this.props.cash(netCashRow, equityRow)[1];

    return(
      this.props.totalCurrentAssets(cashRow, arRow, invRow)
      .map((month, i) => {
        return <td key={i}>{month}</td>
      })
    )
  }

  renderAP(){
    const costOfAllRow = this.props.costOfAll();
    const totalExpensesRow = this.props.totalExpenses(this.filterExpenses, this.getExpensesArray);

    return(
      this.props.actPay(costOfAllRow, totalExpensesRow)
      .map((month, i) => {
        return <td key={i}>{month}</td>
      })
    )
  }

  renderCapitalStock(){
    const equityRow = this.props.equityFinancing();

    return(
      this.props.capitalStock(equityRow)
      .map((month, i) => {
        return <td key={i}>{month}</td>
      })
    )
  }

  renderRetainedEarnings(){
    const totalIncomeRow = this.props.totalIncome();
    const costOfAllRow = this.props.costOfAll();
    const grossMarginRow = this.props.grossMargin(totalIncomeRow, costOfAllRow);
    const totalExpensesRow = this.props.totalExpenses(this.filterExpenses, this.getExpensesArray);
    const ebitdaRow = this.props.ebitda(grossMarginRow, totalExpensesRow);

    return(
      this.props.retainedEarnings(ebitdaRow)
      .map((month, i) => {
        return <td key={i}>{month}</td>
      })
    )
  }

  renderTotalEquity(){
    const equityRow = this.props.equityFinancing();
    const capitalStockRow = this.props.capitalStock(equityRow);

    const totalIncomeRow = this.props.totalIncome();
    const costOfAllRow = this.props.costOfAll();
    const grossMarginRow = this.props.grossMargin(totalIncomeRow, costOfAllRow);
    const totalExpensesRow = this.props.totalExpenses(this.filterExpenses, this.getExpensesArray);
    const ebitdaRow = this.props.ebitda(grossMarginRow, totalExpensesRow);
    const retainedEarningsRow = this.props.retainedEarnings(ebitdaRow);

    return(
      this.props.totalEquity(capitalStockRow, retainedEarningsRow)
      .map((month, i) => {
        return <td key={i}>{month}</td>
      })
    )
  }

  renderTotalLiabilityAndEquity(){
    const costOfAllRow = this.props.costOfAll();
    const totalExpensesRow = this.props.totalExpenses(this.filterExpenses, this.getExpensesArray);
    const totalLiabilityRow = this.props.actPay(costOfAllRow, totalExpensesRow);

    const equityRow = this.props.equityFinancing();
    const capitalStockRow = this.props.capitalStock(equityRow);

    const totalIncomeRow = this.props.totalIncome();
    const grossMarginRow = this.props.grossMargin(totalIncomeRow, costOfAllRow);
    const ebitdaRow = this.props.ebitda(grossMarginRow, totalExpensesRow);
    const retainedEarningsRow = this.props.retainedEarnings(ebitdaRow);
    const totalEquityRow = this.props.totalEquity(capitalStockRow, retainedEarningsRow);


    return (
      this.props.totalLiabilityAndEquity(totalLiabilityRow, totalEquityRow)
      .map((month, i) => {
        return <td key={i}>{month}</td>
      })
    )
  }

  render() {
    const {products} = this.props;

    return(
      <div>
        <h3>Balance Sheet</h3>
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
          <tbody>
            <tr>
              <td>Assets</td>
            </tr>
            <tr>
              <td>Cash</td>
              {this.renderCash()}
            </tr>
            <tr>
              <td>AR</td>
              {this.renderAR()}
            </tr>
            <tr>
              <td>Inventory</td>
              {this.renderInv()}
            </tr>
            <tr>
              <td>Other Current</td>
            </tr>
            <tr>
              <td>Total Current Assets</td>
              {this.renderCurrentAssets()}
            </tr>
            <tr>
              <td>Total Assets</td>
              {this.renderCurrentAssets()}
            </tr>
            <tr>
              <td>Liabilities & Owner's Equity</td>
            </tr>
            <tr>
              <td>Liabilities</td>
            </tr>
            <tr>
              <td>AP</td>
              {this.renderAP()}
            </tr>
            <tr>
              <td>Total Liabilities</td>
              {this.renderAP()}
            </tr>
            <tr>
              <td>Owner's Equity</td>
            </tr>
            <tr>
              <td>Capital Stock</td>
              {this.renderCapitalStock()}
            </tr>
            <tr>
              <td>Retained Earnings</td>
              {this.renderRetainedEarnings()}
            </tr>
            <tr>
              <td>Total Owner's Equity</td>
              {this.renderTotalEquity()}
            </tr>
            <tr>
              <td>Total Liabilities & Owner's Equity</td>
              {this.renderTotalLiabilityAndEquity()}
            </tr>
          </tbody>

        </table>
      </div>
    );
  }
}
