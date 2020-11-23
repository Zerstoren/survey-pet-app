import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { MainStore } from '../../stores/mainState';
import Header from './Header';
import Content from './Content';
import AddPopup from './surveys/AddEditSurvey';
import hocCreateWithNewItem from '../../components/hoc/newItem';
import SurveyItem from '../../stores/surveys/surveyItem';

const MainPage = (props: any) => {
  const {mainStore} : {mainStore: MainStore} = props;

  let popupAdd = null;
  
  if (mainStore.isShowAddSurveyPopup) {
    popupAdd = hocCreateWithNewItem<SurveyItem>(
      AddPopup,
      () => {item: new SurveyItem()}
    );
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