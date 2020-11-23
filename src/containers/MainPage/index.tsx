import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { MainStore } from '../../stores/mainState';
import { SurveyListStore } from '../../stores/surveyList';
import Header from './Header';
import Content from './Content';
import AddPopup from './surveys/AddPopup';

const MainPage = (props: any) => {
  const {mainStore} : {mainStore: MainStore} = props;

  let popupAdd = null;
  
  if (mainStore.isShowAddSurveyPopup) {
    popupAdd = <AddPopup />;
  }

  return (
    <>
      {popupAdd}
      <Header />
      <Content />
    </>
  );
};

export default inject('mainStore')(observer(MainPage));