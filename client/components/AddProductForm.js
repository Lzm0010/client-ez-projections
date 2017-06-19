import React, {Component} from 'react';

export default class AddProductForm extends Component {
  createProduct(event) {
    event.preventDefault();
    const product = {
      name: this.name.value,
      price: this.price.value,
      unitsPerStore: this.unitsPerStore.value,
      inventoryTurnoverInMonths: this.inventoryTurnoverInMonths.value,
      unitsPerOrder: this.unitsPerOrder.value,
      totalCost: this.totalCost.value,
      reorderPoint: this.reorderPoint.value
    }
    this.props.addProduct(product);
    this.productForm.reset();
  }

  render() {
    return (
      <form ref={(input) => this.productForm = input} className="product-edit" onSubmit={(e) => this.createProduct(e)}>
        <input ref={(input) => this.name = input} type="text" placeholder="Product Name" />
        <input ref={(input) => this.price = input} type="text" placeholder="Price" />
        <input ref={(input) => this.unitsPerStore = input} type="text" placeholder="Units per Store" />
        <input ref={(input) => this.inventoryTurnoverInMonths = input} type="text" placeholder="Inventory Turnover in Months" />
        <input ref={(input) => this.unitsPerOrder = input} type="text" placeholder="Units per Order " />
        <input ref={(input) => this.totalCost = input} type="text" placeholder="Total Cost" />
        <input ref={(input) => this.reorderPoint = input} type="text" placeholder="Reorder Point" />
        <button type="submit">+ Add Product</button>
      </form>
    );
  }
}
