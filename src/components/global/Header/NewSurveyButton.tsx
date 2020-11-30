import { inject, observer } from 'mobx-react';
import React from 'react';
import { IMainStore } from '../../../stores/mainState';

const NewSurveyButton = ({mainStore}: {mainStore?: IMainStore}) => {
  const showPopupForAddSurvey = () => {
    mainStore?.setIsShowAddSurveyPopup(!mainStore?.isShowAddSurveyPopup);
  }

  return (
    <div className="new-survey">
      <button className="btn btn-outline-primary" onClick={showPopupForAddSurvey}>New survey</button>
    </div>
  );
}

export default inject('mainStore')(observer(NewSurveyButton));