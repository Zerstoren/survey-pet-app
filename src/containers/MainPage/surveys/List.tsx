import { observer } from 'mobx-react';
import React, { useEffect, useMemo } from 'react';
import SurveyListStore, { ISurveyListStore } from '../../../stores/surveys/surveyList';
import SurveyItem from './Item';

const SurveyList = ({surveyListStore}: {surveyListStore: ISurveyListStore}) => {
  let survList = surveyListStore.surveys.map((survey) => {
    return (<SurveyItem key={survey.id} survey={survey} />);
  });

  return (
    <div className="surveys-list d-flex flex-row flex-wrap justify-content-around">
      {survList}
    </div>
  );
}

export default observer(SurveyList);