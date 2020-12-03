import { observer } from 'mobx-react';
import React from 'react';
import { ISurveyQuestion } from '../../../stores/surveys/types';
import Answers from './Answers';

const Question = ({question}: {question: ISurveyQuestion}) => {
  if (!question) {
    return (<></>);
  }

  return (
    <div className="view-question-block">
      <div className="view-question-title">
        <h4>{question.title}</h4>
      </div>

      <ul className="list-group list-group-flush view-question-answers">
        <Answers namePath={`question[${question.id}].answers`} answers={question.answers} type={question.type} />
      </ul>
    </div>
  );
}

export default observer(Question);