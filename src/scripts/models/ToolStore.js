/* eslint-disable no-nested-ternary */
import { observable, action } from 'mobx';
import Product from './ProductStore';
import User from './UserStore';

class ToolStore {
  @observable appState = 'Intro';

  @observable allocationPercentFormat = true;

  @observable allocationEqualWeight = true;

  @observable preload = false;

  @observable downloadState = false;

  @action.bound
  resetTool() {
    Product.currentProducts = Product.feededData;
    this.updateAllocationEqualWeight(true);
    this.updateAllocationPercentFormat(true);
    this.updateGroupSelect([true, true, true, true]);
  }

  @action.bound
  updateAppState(value) {
    this.appState = value;
  }

  @action.bound
  updateDownloadState(value) {
    this.downloadState = value;
  }

  @action.bound
  updateGroupSelect = value => {
    Product.groupSelect = value;
    this.updateCurrentProducts(Product.filteredCurrentProduct);
  };

  @action.bound
  updateAllocationPercentFormat(value) {
    // console.log(value);
    this.allocationPercentFormat = value;
  }

  @action.bound
  updateAllocationEqualWeight(value) {
    this.allocationEqualWeight = value;

    if (value) this.updateCurrentProducts(Product.filteredCurrentProduct);
  }

  @action.bound
  updatePreload(value) {
    this.preload = value;
  }

  @action.bound
  updateCurrentProducts(products) {
    Product.productTotal = products.reduce((prev, cur) => {
      return cur.selected && cur.show ? prev + cur.selected : prev;
    }, 0);

    const updatedProducts = products.map(product => {
      const newObj = Object.assign({}, product);
      newObj.allocation =
        !product.selected || !product.show
          ? 0
          : User.investment / Product.productTotal;
      return this.allocationEqualWeight ? newObj : product;
    });
    // console.log(updatedProducts);
    // console.log(`productTotal: ${this.productTotal}`);
    // console.log(`this.investment: ${this.investment}`);

    Product.currentProducts = updatedProducts;
    Product.selectedProducts = Product.filterSelectedProduct;
  }

  @action.bound
  updateCurrentYears(value) {
    Product.currentYears = value;
    this.updateCurrentProducts(Product.filteredCurrentProduct);
  }

  @action.bound
  updateProductSelect(id, selected) {
    Product.currentProducts[id].selected = selected;

    this.updateCurrentProducts(Product.currentProducts);
  }

  @action.bound
  updateProductAllocation(id, allocation) {
    const updatedProducts = Product.currentProducts.map((product, i) => {
      const newObj = Object.assign({}, product);
      newObj.allocation = this.allocationEqualWeight
        ? User.investment / Product.productTotal || 0
        : i === id
        ? allocation || 0
        : product.allocation;
      return newObj;
    });
    // console.log(updatedProducts);
    // console.log(Product.currentProducts);
    // console.log(`this.investment: ${this.investment}`);
    Product.currentProducts = updatedProducts;
  }
}

export default new ToolStore();
