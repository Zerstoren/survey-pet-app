import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { SurveyListStore } from '../../../stores/surveys/surveyList';
import SurveyItem from './Item';

const SurveyList = (props: any) => {
  const {surveyListStore} : {surveyListStore: SurveyListStore} = props;

  useEffect(() => {
    surveyListStore.loadList();
  }, [surveyListStore]);

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