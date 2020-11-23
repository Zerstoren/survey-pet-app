import { inject, observer } from 'mobx-react';
import React from 'react';
import BreadCrumbs from './BreadCrumbs';
import { MainStore } from '../../stores/mainState';

const Header = (props: any) => {
  const {mainStore}: {mainStore: MainStore} = props;
  
  const showPopupForAddSurvey = () => {
    mainStore.setIsShowAddSurveyPopup(!mainStore.isShowAddSurveyPopup);
  }

  return (
    <div className="header d-flex justify-content-between align-items-center">
      <div className="left-side">
        <BreadCrumbs />
      </div>
      <div className="right-side d-flex justify-content-end align-items-center">
        <div className="search">&#128269;</div>
        <div className="new-survey">
          <button className="btn btn-outline-primary" onClick={showPopupForAddSurvey}>New survey</button>
        </div>
      </div>
    </div>   
  )
};

export default inject("mainStore")(observer(Header));