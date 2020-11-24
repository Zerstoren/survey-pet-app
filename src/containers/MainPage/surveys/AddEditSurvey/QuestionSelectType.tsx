import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { SELECT_TYPE } from '../../../../stores/surveys/surveyQuestion';


const QuestionSelectType = (
  {defaultValue, uniqueId: uniqueId}: {defaultValue: SELECT_TYPE, uniqueId: string}
) => {
  const [questionType, setQuestionType] = useState(defaultValue);

  const onChangeQuestionType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === 'single' ? SELECT_TYPE.SINGLE : SELECT_TYPE.MULTI;
    setQuestionType(value);
  }

  return (
    <div className="form-group">
      <div className="form-check form-check-inline">
        <input 
          className="form-check-input" 
          type="radio" 
          id={`inlineCheckbox_left_${uniqueId}`} 
          value="single" 
          onChange={onChangeQuestionType} 
          checked={questionType === SELECT_TYPE.SINGLE} 
        />
        <label className="form-check-label" htmlFor={`inlineCheckbox_left_${uniqueId}`}>One answer</label>
      </div>

      <div className="form-check form-check-inline">
        <input 
          className="form-check-input" 
          type="radio" 
          id={`inlineCheckbox_right_${uniqueId}`}  
          value="multi" 
          onChange={onChangeQuestionType} 
          checked={questionType === SELECT_TYPE.MULTI} 
        />
        <label className="form-check-label" htmlFor={`inlineCheckbox_right_${uniqueId}`}  >Many answers</label>
      </div>
    </div>
  );
}

export default observer(QuestionSelectType);