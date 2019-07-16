import React from 'react';
import { inject, observer } from 'mobx-react';
import LargeCheckBox from '../../ui/largeCheckBox';

const CreditCriteriaSelector = inject('appStore')(
  observer(({ appStore }) => {
    const { groupNames } = appStore.Common,
      { groupSelect } = appStore.Product,
      creditCriteriaClicked = event => {
        const myId = parseInt(event.target.id, 10),
          newSelect = groupSelect.map((bool, i) => (myId === i ? !bool : bool));
        appStore.Tool.updateGroupSelect(newSelect);
      },
      LargeCheckBoxes = groupSelect.map((group, i) => {
        return (
          <LargeCheckBox
            group={group}
            id={i}
            key={i}
            name={groupNames[i]}
            onChange={creditCriteriaClicked}
          />
        );
      });

    return (
      <div className="cell medium-6 toggler">
        <h5 className="instruction-title">Choose Your Credit Criteria</h5>
        <div>{LargeCheckBoxes}</div>
      </div>
    );
  })
);

export default CreditCriteriaSelector;
