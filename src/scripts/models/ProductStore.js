/* eslint-disable no-nested-ternary */
import { observable, computed, action } from 'mobx';
import {
  cleanNumber,
  numberFormat,
  percentFormat,
  timeConverter
} from '../components/helper/formatting';
import Common from './CommonStore';
import User from './UserStore';

class ProductStore {
  @observable currentYears = Common.years;

  @observable groupSelect = [true, true, false, false];

  @observable currentProducts = [];

  @observable selectedProducts = [];

  @observable productTotal = 0;

  asOfDate = null;

  feededData = [];

  @computed
  get filteredCurrentProduct() {
    const currentGroup = Common.groupNames.filter(
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
  get filterSelectedProduct() {
    return this.currentProducts.filter(
      product => product.selected && product.show
    );
  }

  // @computed
  // get currentProductResults() {
  //   return Common.productResultsProp.map((key, i) => {
  //     const sum = this.currentProducts.reduce((prev, cur) => {
  //         return cur.selected && cur.show ? prev + cur[key] : prev;
  //       }, 0),
  //       result =
  //         typeof sum === 'string' || sum <= 0
  //           ? 'N/A'
  //           : i < 1
  //           ? sum
  //           : i !== 6
  //           ? percentFormat(sum / this.productTotal)
  //           : numberFormat(sum, '', true);

  //     return result;
  //   });
  // }

  @computed
  get currentProductResults() {
    return Common.productResultsProp.map((key, i) => {
      const sum = this.currentProducts.reduce((prev, cur) => {
          const alloc = cur.allocation / User.investment,
            combined =
              key === 'allocation' || key === 'numberOfHoldings'
                ? prev + cur[key]
                : cur[key] === null
                ? 'N/A'
                : prev + cur[key] * alloc;

          return cur.selected && cur.show ? combined : prev;
        }, 0),
        result =
          typeof sum === 'string' || sum <= 0
            ? 'N/A'
            : i < 1
            ? sum
            : i !== 6
            ? percentFormat(sum)
            : numberFormat(sum, '', true);

      return result;
    });
  }

  @action.bound
  currentProductsInit(data) {
    // const initialAllocation = 100 / data.length;
    const initialAllocation = User.investment / data.length;

    this.feededData = data.map(product => {
      return {
        selected: true,
        show: true,
        ticker: product.ticker,
        url: `https://www.invesco.com/portal/site/us/etfs/product-detail?productId=${
          product.ticker
        }`,
        allocation: initialAllocation,
        criteria: product.criteria,
        maturityDate: timeConverter(product.maturityDate, 'year'),
        yieldToMaturity: cleanNumber(product.yieldToMaturity),
        yieldToWorst: cleanNumber(product.yieldToWorse),
        effectiveDuration: cleanNumber(product.effectiveDuration),
        monthSecYield: product.secYield,
        distributionRate: product.distYield,
        numberOfHoldings: product.numOfHoldings,
        fundName: product.fundName,
        nav: product.nav,
        asOfDate: timeConverter(product.asOfDate, 'dateshort'),
        creditQuality: product.creditQuality
      };
    });

    // console.log(this.feededData);

    this.currentProducts = this.feededData;
  }

  @action.bound
  setAsOfDate(data) {
    this.asOfDate = timeConverter(data, 'dateshort');
  }
}

export default new ProductStore();
