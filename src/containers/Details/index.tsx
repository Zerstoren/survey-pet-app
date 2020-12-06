import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumbs from '../../components/global/Header/BreadCrumbs';
import HocHeader from '../../components/hoc/header';
import PollResultsList from '../../stores/respondent/pollResultsList';
import SurveyItem from '../../stores/surveys/surveyItem';
import Chart from './chart';

const Details = () => {
  const { id }: { id: string } = useParams();
  
  const surveyItem = useMemo(() => {
    const surveyItem = SurveyItem.create({id: id});
    surveyItem.load();
    return surveyItem;
  }, [id]);

  const pollResults = useMemo(() => {
    const pollResults = PollResultsList.create();

    if (!surveyItem.questions.length) {
      return pollResults;
    }

    const answersList = surveyItem.questions.map((q) => q.answers.map((a) => a.id)).flat();
    pollResults.load(answersList);

    return pollResults;
  }, [id, surveyItem.questions, surveyItem.questions.length]);

  const hocHeader = HocHeader(
    <BreadCrumbs items={[
      [`/survey/${id}`, surveyItem.title],
      ['', 'Details']
    ]} />,
    <></>
  );
  
  const chartsList = surveyItem.questions.map((q) => {
    return (<Chart key={q.id} question={q} questionData={pollResults}/>)
  });
  
  return (
    <>
      {hocHeader()}
      <div className="content">
        <div className="chart-list d-flex flex-row flex-wrap justify-content-around">
          {chartsList}
        </div>
      </div>
    </>
  );
}

export default observer(Details);