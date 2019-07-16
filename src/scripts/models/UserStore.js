import { observable, action } from 'mobx';

class UserStore {
  @observable ladderName = '';

  @observable investment = 10000;

  @action.bound
  updateLadderName(value) {
    this.ladderName = value;
  }

  @action.bound
  updateInvestment(value) {
    this.investment = value;
  }
}

export default new UserStore();
