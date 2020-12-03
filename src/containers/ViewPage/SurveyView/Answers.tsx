import { observer } from 'mobx-react';
import React from 'react';
import { Field } from 'react-final-form';
import { SELECT_TYPE } from '../../../stores/surveys/surveyQuestion';
import { ISurveyAnswer } from '../../../stores/surveys/types';

const Answers = ({
  namePath, 
  answers, 
  type
}: {
  namePath: string, 
  answers: Array<ISurveyAnswer>, 
  type: SELECT_TYPE
}) => {
  const viewAnswers = answers.map((answer) => {
    const ref = React.createRef<HTMLInputElement>();

    const onSelect = () => {
      if(ref.current) {
        ref.current.click();
      }
    }

    return (
      <Field
        key={answer.id} 
        name={namePath} 
        component="input" 
        type={type === SELECT_TYPE.SINGLE ? "radio" : "checkbox"}
        value={answer.id}
      >
        {({input}) => (
          <li 
            className={`list-group-item list-group-item-action ${input.checked === true ? 'active' : ''} form-group d-flex justify-content-start view-question-answer`}
            onClick={onSelect}
          >
            <input {...input} ref={ref} className="form-check-input" />
            {answer.title}
          </li>
        )}
      </Field>
    );
  });

  return (
    <>
      {viewAnswers}
    </>
  );
}

export default observer(Answers);