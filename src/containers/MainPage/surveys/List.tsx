import React, { useEffect } from 'react';
import SurveyItem from './Item';
import { observer, inject } from 'mobx-react';
import { SurveyListStore } from '../../../stores/surveyList';

const SurveyList = (props: any) => {
  const {surveyListStore} : {surveyListStore: SurveyListStore} = props;

  useEffect(() => {
    surveyListStore.loadList();
  }, []);

  useEffect(() => {
    console.log(surveyListStore.state);
  }, [surveyListStore.state])

  let survList = [];

  for(let i = 0; i < 20; i++) {
    survList.push(
      <SurveyItem key={i} />
    );
  }

  return (
    <div className="surveys-list d-flex flex-row flex-wrap justify-content-around">
      {survList}
    </div>
  );
}

export default inject("surveyListStore")(observer(SurveyList));