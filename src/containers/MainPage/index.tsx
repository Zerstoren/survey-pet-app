import { inject, observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { getUniqueInt } from '../../helpers/fns/math';
import { MainStore } from '../../stores/mainState';
import SurveyItem from '../../stores/surveys/surveyItem';
import SurveyItemMeta from '../../stores/surveys/surveyItemMeta';
import Content from './Content';
import Header from './Header';
import AddPopup from './surveys/AddEditSurvey';

const MainPage = (props: any) => {
  const {mainStore} : {mainStore: MainStore} = props;

  let newSurveyMeta = useMemo(() => SurveyItemMeta.create(), []);

  let popupAdd: JSX.Element | null = useMemo(
    () : JSX.Element => (<AddPopup itemMeta={newSurveyMeta} />), 
    []
  );
  
  if (!mainStore.isShowAddSurveyPopup) {
    popupAdd = null;
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