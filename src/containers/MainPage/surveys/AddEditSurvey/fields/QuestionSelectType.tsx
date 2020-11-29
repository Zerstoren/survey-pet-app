import React from 'react';
import { Field } from 'react-final-form';
import { SELECT_TYPE } from '../../../../../stores/surveys/surveyQuestion';

const Radio = ({
  index, 
  namePath, 
  value, 
  label
}: {
  index: string, 
  namePath: string, 
  value: SELECT_TYPE, 
  label: string
}) => (
  <div className="form-check form-check-inline">
    <Field 
      name={`${namePath}.questionType`}
      component="input"
      type="radio"
      value={value} 
    >
      {({input, meta}) => (
        <input 
          {...input}
          className="form-check-input" 
          id={`inlineCheckbox_${index}`} 
        />
      )}
    </Field>
    <label className="form-check-label" htmlFor={`inlineCheckbox_${index}`}>{label}</label>
  </div>
);

const QuestionSelectType = ({
  index,
  namePath
}: {
  index: number,
  namePath: string
}) => {
  return (
    <div className="form-group">
      <Radio 
        index={`left_${index}`}
        namePath={namePath}
        value={SELECT_TYPE.SINGLE}
        label={'One answer'}
      />
      <Radio 
        index={`right_${index}`}
        namePath={namePath}
        value={SELECT_TYPE.MULTI}
        label={'Many answers'}
      />
    </div>
  );
}

export default QuestionSelectType;