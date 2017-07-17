import _ from 'lodash';
import {round} from '../helpers';
import React, {Component} from 'react';

export default class CashFlow extends Component {
  constructor(){
    super();

    this.filterSales = this.filterSales.bind(this);
    this.filterExpenses = this.filterExpenses.bind(this);
    this.getExpensesArray = this.getExpensesArray.bind(this);
    this.renderIncomeFromSales = this.renderIncomeFromSales.bind(this);
    this.renderCostOfSales = this.renderCostOfSales.bind(this);
    this.renderFixedBusinessExpenses = this.renderFixedBusinessExpenses.bind(this);
    this.renderEquityFinancing = this.renderEquityFinancing.bind(this);
    this.renderChangeInAR = this.renderChangeInAR.bind(this);
    this.renderCashInflows = this.renderCashInflows.bind(this);
    this.renderChangeInInv = this.renderChangeInInv.bind(this);
    this.renderChangeInAP = this.renderChangeInAP.bind(this);
    this.renderCashOutflows = this.renderCashOutflows.bind(this);
    this.renderNetCashFlow = this.renderNetCashFlow.bind(this);
    this.renderBeginningCash = this.renderBeginningCash.bind(this);
    this.renderEndingCash = this.renderEndingCash.bind(this);
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

  renderBeginningCash(){
    const totalIncomeRow = this.props.totalIncome();
    const arRow = this.props.actRec(totalIncomeRow);
    const changeInArRow = this.props.changeInAR(arRow);
    const cashInRow = this.props.totalCashInflows(changeInArRow, totalIncomeRow)

    const costOfAllRow = this.props.costOfAll();
    const invRow = this.props.inv(costOfAllRow);
    const changeInvRow = this.props.changeInInv(invRow);

    const fixedExpRow = this.props.totalExpenses(this.filterExpenses, this.getExpensesArray);
    const salesExpRow = this.props.totalSalesExpenses(totalIncomeRow, this.filterSales, this.getExpensesArray);
    const totalExpensesRow = salesExpRow.map((number, i) => {
      return number = number + fixedExpRow[i];
    });
    const apRow = this.props.actPay(costOfAllRow, totalExpensesRow);
    const changeApRow = this.props.changeInAP(apRow);
    const cashOutRow = this.props.totalCashOutFlows(changeInvRow, changeApRow, costOfAllRow, totalExpensesRow);
    const netCashRow = this.props.netCashFlow(cashInRow, cashOutRow);

    const equityRow = this.props.equityFinancing();

    return(
      this.props.cash(netCashRow, equityRow)[0]
      .map((month, i) => {
        return <td key={i}>{round(month,0)}</td>
      })
    )
  }

  renderIncomeFromSales(){
    return(
      this.props.totalIncome()
      .map((month, i) => {
        return <td key={i}>{round(month,0)}</td>
      })
    )
  }

  renderChangeInAR(){
    const totalIncomeRow = this.props.totalIncome();
    const arRow = this.props.actRec(totalIncomeRow);

    return (
      this.props.changeInAR(arRow)
      .map((month, i) => {
        return <td key={i}>{round(month,0)}</td>
      })
    )
  }

  renderCashInflows(){
    const totalIncomeRow = this.props.totalIncome();
    const arRow = this.props.actRec(totalIncomeRow);
    const changeInArRow = this.props.changeInAR(arRow);

    return(
      this.props.totalCashInflows(changeInArRow, totalIncomeRow)
      .map((month, i) => {
        return <td key={i}>{round(month,0)}</td>
      })
    )
  }

  renderChangeInInv(){
    const costOfAllRow = this.props.costOfAll();
    const invRow = this.props.inv(costOfAllRow);

    return(
      this.props.changeInInv(invRow)
      .map((month, i) => {
        return <td key={i}>{round(month,0)}</td>
      })
    )
  }

  renderChangeInAP(){
    const totalIncomeRow = this.props.totalIncome();
    const costOfAllRow = this.props.costOfAll();
    const fixedExpRow = this.props.totalExpenses(this.filterExpenses, this.getExpensesArray);
    const salesExpRow = this.props.totalSalesExpenses(totalIncomeRow, this.filterSales, this.getExpensesArray);
    const totalExpensesRow = salesExpRow.map((number, i) => {
      return number = number + fixedExpRow[i];
    });
    const apRow = this.props.actPay(costOfAllRow, totalExpensesRow);

    return (
      this.props.changeInAP(apRow)
      .map((month, i) => {
        return <td key={i}>{round(month,0)}</td>
      })
    )
  }

  renderCostOfSales(){
    return(
      this.props.costOfAll()
      .map((month, i) => {
        return <td key={i}>{round(month,0)}</td>
      })
    )
  }

  renderFixedBusinessExpenses(){
    const totalIncomeRow = this.props.totalIncome();
    const fixedExpRow = this.props.totalExpenses(this.filterExpenses, this.getExpensesArray);
    const salesExpRow = this.props.totalSalesExpenses(totalIncomeRow, this.filterSales, this.getExpensesArray);
    const totalExpensesRow = salesExpRow.map((number, i) => {
      return number = number + fixedExpRow[i];
    });

    return (
      totalExpensesRow.map((month, i) => {
        return <td key={i}>{round(month,0)}</td>
      })
    )
  }

  renderCashOutflows(){
    const costOfAllRow = this.props.costOfAll();
    const invRow = this.props.inv(costOfAllRow);
    const changeInvRow = this.props.changeInInv(invRow);

    const totalIncomeRow = this.props.totalIncome();
    const fixedExpRow = this.props.totalExpenses(this.filterExpenses, this.getExpensesArray);
    const salesExpRow = this.props.totalSalesExpenses(totalIncomeRow, this.filterSales, this.getExpensesArray);
    const totalExpensesRow = salesExpRow.map((number, i) => {
      return number = number + fixedExpRow[i];
    });
    const apRow = this.props.actPay(costOfAllRow, totalExpensesRow);
    const changeApRow = this.props.changeInAP(apRow);

    return (
      this.props.totalCashOutFlows(changeInvRow, changeApRow, costOfAllRow, totalExpensesRow)
      .map((month, i) => {
        return <td key={i}>{round(month,0)}</td>
      })
    )
  }

  renderNetCashFlow(){
    const totalIncomeRow = this.props.totalIncome();
    const arRow = this.props.actRec(totalIncomeRow);
    const changeInArRow = this.props.changeInAR(arRow);
    const cashInRow = this.props.totalCashInflows(changeInArRow, totalIncomeRow)

    const costOfAllRow = this.props.costOfAll();
    const invRow = this.props.inv(costOfAllRow);
    const changeInvRow = this.props.changeInInv(invRow);

    const fixedExpRow = this.props.totalExpenses(this.filterExpenses, this.getExpensesArray);
    const salesExpRow = this.props.totalSalesExpenses(totalIncomeRow, this.filterSales, this.getExpensesArray);
    const totalExpensesRow = salesExpRow.map((number, i) => {
      return number = number + fixedExpRow[i];
    });
    const apRow = this.props.actPay(costOfAllRow, totalExpensesRow);
    const changeApRow = this.props.changeInAP(apRow);
    const cashOutRow = this.props.totalCashOutFlows(changeInvRow, changeApRow, costOfAllRow, totalExpensesRow);

    return (
      this.props.netCashFlow(cashInRow, cashOutRow)
      .map((month, i) => {
        return <td key={i}>{round(month,0)}</td>
      })
    )
  }

  renderEquityFinancing(){
    return (
      this.props.equityFinancing()
      .map((month, i) => {
        return <td key={i}>{round(month,0)}</td>
      })
    )
  }

  renderEndingCash(){
    const totalIncomeRow = this.props.totalIncome();
    const arRow = this.props.actRec(totalIncomeRow);
    const changeInArRow = this.props.changeInAR(arRow);
    const cashInRow = this.props.totalCashInflows(changeInArRow, totalIncomeRow)

    const costOfAllRow = this.props.costOfAll();
    const invRow = this.props.inv(costOfAllRow);
    const changeInvRow = this.props.changeInInv(invRow);

    const fixedExpRow = this.props.totalExpenses(this.filterExpenses, this.getExpensesArray);
    const salesExpRow = this.props.totalSalesExpenses(totalIncomeRow, this.filterSales, this.getExpensesArray);
    const totalExpensesRow = salesExpRow.map((number, i) => {
      return number = number + fixedExpRow[i];
    });
    const apRow = this.props.actPay(costOfAllRow, totalExpensesRow);
    const changeApRow = this.props.changeInAP(apRow);
    const cashOutRow = this.props.totalCashOutFlows(changeInvRow, changeApRow, costOfAllRow, totalExpensesRow);
    const netCashRow = this.props.netCashFlow(cashInRow, cashOutRow);

    const equityRow = this.props.equityFinancing();

    return(
      this.props.cash(netCashRow, equityRow)[1]
      .map((month, i) => {
        return <td key={i}>{round(month,0)}</td>
      })
    )
  }

  render() {
    const {products, fixedAssumptions} = this.props;

    return(
      <div className="cashFlow">
        <h3>Cash Flow Statement</h3>
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
              <td>Beginning Cash Balance</td>
              {this.renderBeginningCash()}
            </tr>
            <tr>
              <td>Cash Inflows</td>
            </tr>
            <tr>
              <td>Income from Sales</td>
              {this.renderIncomeFromSales()}
            </tr>
            <tr>
              <td>Change in A/R</td>
              {this.renderChangeInAR()}
            </tr>
            <tr>
              <td>Total Cash Inflows</td>
              {this.renderCashInflows()}
            </tr>
            <tr>
              <td>Cash Outflows</td>
            </tr>
            <tr>
              <td>New Fixed Asset Purchases</td>
            </tr>
            <tr>
              <td>Change in Inventory</td>
              {this.renderChangeInInv()}
            </tr>
            <tr>
              <td>Change in A/P</td>
              {this.renderChangeInAP()}
            </tr>
            <tr>
              <td>Cost of Sales</td>
              {this.renderCostOfSales()}
            </tr>
            <tr>
              <td>Total Salary and Related</td>
            </tr>
            <tr>
              <td>Fixed Business Expenses</td>
              {this.renderFixedBusinessExpenses()}
            </tr>
            <tr>
              <td>Total Cash Outflows</td>
              {this.renderCashOutflows()}
            </tr>
            <tr>
              <td>Net Cash Flow</td>
              {this.renderNetCashFlow()}
            </tr>
            <tr>
              <td>Equity Financing</td>
              {this.renderEquityFinancing()}
            </tr>
            <tr>
              <td>Ending Cash Balance</td>
              {this.renderEndingCash()}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
