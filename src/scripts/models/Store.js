/* eslint-disable no-nested-ternary */
/*
import { observable, computed, action } from 'mobx';
import productData from './productData';
import { numberFormat, percentFormat } from '../components/helper/formatting';

export const defaultState = {
  ladderName: '',
  investment: '10000',
  years: [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028],
  groupSelect: [true, true, false, false],
  groupNames: [
    'Municipal Fixed Income',
    'Investment Grade',
    'High Yield',
    'Emerging Markets Debt'
  ],
  asOfDate: '06/21/2019',
  allocationPercentFormat: true,
  allocationEqualWeight: true,
  products: productData,
  productResultsProp: [
    'allocation',
    'yieldToMaturity',
    'yieldToWorst',
    'effectiveDuration',
    'monthSecYield',
    'distributionRate',
    'numberOfHoldings'
  ],
  creditQualityKeys: [
    'aaa',
    'aa',
    'a',
    'bbb',
    'bb',
    'b',
    'ccc',
    'cc',
    'c',
    'd',
    'nr'
  ]
};

export default class Store {
  @observable appState = 'Intro';

  @observable ladderName = defaultState.ladderName;

  @observable investment = defaultState.investment;

  @observable resultTotalDollars = defaultState.investment;

  @observable groupSelect = defaultState.groupSelect;

  @observable groupNames = defaultState.groupNames;

  @observable currentYears = defaultState.years;

  @observable allocationPercentFormat = defaultState.allocationPercentFormat;

  @observable allocationEqualWeight = defaultState.allocationEqualWeight;

  @observable currentProducts = [];

  @observable tableBottomY = 0;

  @observable productTotal = defaultState.products.length;

  @observable preload = false;

  @computed
  get filteredCurrentProduct() {
    const currentGroup = this.groupNames.filter(
      (group, i) => this.groupSelect[i]
    );

    return this.currentProducts.map(product => {
      const newObj = Object.assign({}, product);

      newObj.show =
        currentGroup.includes(product.criteria) &&
        this.currentYears.includes(product.maturityDate);
      return newObj;
    });
  }

  @computed
  get currentProductResults() {
    return defaultState.productResultsProp.map((key, i) => {
      const sum = this.currentProducts.reduce((prev, cur) => {
          return cur.selected && cur.show ? prev + cur[key] : prev;
        }, 0),
        result =
          typeof sum === 'string' || sum <= 0
            ? 'N/A'
            : i < 1
            ? sum
            : i !== 6
            ? percentFormat(sum / this.productTotal)
            : numberFormat(sum, '', true);
      return result;
    });
  }

  @action.bound
  parseProducts(json) {
    // console.log(json.tickers);

    const catKeys = Object.keys(json.tickers),
      products = catKeys
        .map(cat => {
          const items = json.tickers[cat].map(item => {
            const catName = cat
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => {
                  return str.toUpperCase();
                }),
              newItem = {
                ...item,
                criteria:
                  catName === 'Emerging' ? `${catName} Markets Debt` : catName
              };
            return newItem;
          });
          return items;
        })
        .flat();
    console.log(`catKeys: `, catKeys);
    console.log(`products: `, products);

    // this.defaultState.products = JSON.parse(json);
    // console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
    // console.log(this.defaultState.products);

    this.currentProductsInit();
  }

  @action.bound
  currentProductsInit() {
    const initialAllocation = 100 / this.productTotal.length;
    this.currentProducts = defaultState.products.map(product => {
      return {
        selected: true,
        show: true,
        ticker: product.ticker,
        url: product.url,
        allocation: initialAllocation,
        criteria: product.criteria,
        maturityDate: product.maturityDate,
        yieldToMaturity: product.yieldToMaturity,
        yieldToWorst: product.yieldToWorst,
        effectiveDuration: product.effectiveDuration,
        monthSecYield: product.monthSecYield,
        distributionRate: product.distributionRate,
        numberOfHoldings: product.numberOfHoldings,
        creditQuality: product.creditQuality
      };
    });
  }

  @action.bound
  updateCurrentProducts(products) {
    this.productTotal = products.reduce((prev, cur) => {
      return cur.selected && cur.show ? prev + cur.selected : prev;
    }, 0);

    const updatedProducts = products.map(product => {
      const newObj = Object.assign({}, product);
      newObj.allocation =
        !product.selected || !product.show ? 0 : 100 / this.productTotal;
      return this.allocationEqualWeight ? newObj : product;
    });
    // console.log(updatedProducts);
    // console.log(`productTotal: ${this.productTotal}`);
    // console.log(`this.investment: ${this.investment}`);

    this.currentProducts = updatedProducts;
  }

  @action.bound
  resetCurrentProducts() {
    this.currentProductsInit();
    this.updateAllocationEqualWeight(true);
    this.updateAllocationPercentFormat(true);
    this.updateGroupSelect([true, true, true, true]);
  }

  @action.bound
  updateAppState(value) {
    this.appState = value;
  }

  @action.bound
  updateLadderName(value) {
    this.ladderName = value;
  }

  @action.bound
  updateInvestment(value) {
    this.investment = value;
  }

  @action.bound
  updateResultTotalDollars(value) {
    this.resultTotalDollars = value;

    // if (
    //   !this.allocationPercentFormat &&
    //   !this.allocationEqualWeight &&
    //   this.resultTotalDollars !== this.investment
    // ) {
    //   this.investment = `${this.resultTotalDollars}`;
    // }
  }

  @action.bound
  updateGroupSelect(value) {
    this.groupSelect = value;
    this.updateCurrentProducts(this.filteredCurrentProduct);
  }

  @action.bound
  updateCurrentYears(value) {
    this.currentYears = value;
    this.updateCurrentProducts(this.filteredCurrentProduct);
  }

  @action.bound
  updateAllocationPercentFormat(value) {
    // console.log(value);
    this.allocationPercentFormat = value;
  }

  @action.bound
  updateAllocationEqualWeight(value) {
    this.allocationEqualWeight = value;

    if (value) this.updateCurrentProducts(this.filteredCurrentProduct);
  }

  @action.bound
  updateTableBottomY(value) {
    this.tableBottomY = value;
  }

  @action.bound
  updateProductSelect(id, selected) {
    this.currentProducts[id].selected = selected;

    this.updateCurrentProducts(this.currentProducts);
  }

  @action.bound
  updateProductAllocation(id, allocation) {
    const updatedProducts = this.currentProducts.map((product, i) => {
      const newObj = Object.assign({}, product);
      newObj.allocation = this.allocationEqualWeight
        ? 100 / this.productTotal
        : i === id
        ? allocation
        : product.allocation;
      return newObj;
    });
    // console.log(updatedProducts);
    // console.log(`this.investment: ${this.investment}`);
    this.currentProducts = updatedProducts;
  }

  @action.bound
  updatePreload(value) {
    this.preload = value;
  }
}
*/
