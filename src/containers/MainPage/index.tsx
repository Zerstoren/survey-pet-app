import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { SurveyListStore } from '../../state/surveyList';
import Header from './header';

const MainPage = inject('surveyListStore')(observer(({surveyListStore} : {surveyListStore: SurveyListStore}) => {
  useEffect(() => {
    surveyListStore.loadList();
  }, []);

  return (
    <>
      {surveyListStore.getState()}
      <Header />
    </>
  );
}));

export default MainPage;