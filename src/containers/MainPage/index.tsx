import { inject, observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { getUniqueKey } from '../../helpers/fns/math';
import { MainStore } from '../../stores/mainState';
import SurveyItem from '../../stores/surveys/surveyItem';
import Content from './Content';
import Header from './Header';
import AddPopup from './surveys/AddEditSurvey';

const MainPage = (props: any) => {
  const {mainStore} : {mainStore: MainStore} = props;

  let popupAdd: JSX.Element | null = useMemo(() : JSX.Element => (<AddPopup item={SurveyItem.create({
    id: getUniqueKey('survey_id_')
  })} />), []);
  
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