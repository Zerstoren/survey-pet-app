import { inject, observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { IMainStore } from '../../stores/mainState';
import SurveyItemMeta from '../../stores/surveys/surveyItemMeta';
import Content from './Content';
import Header from './Header';
import AddPopup from './surveys/AddEditSurvey';

const MainPage = (props: any) => {
  const {mainStore} : {mainStore: IMainStore} = props;

  let popupAdd: JSX.Element | null = useMemo(() : JSX.Element => {
      let newSurveyMeta = SurveyItemMeta.create();
      return (<AddPopup itemMeta={newSurveyMeta} />)
    },
    [mainStore?.reloadIndex]
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