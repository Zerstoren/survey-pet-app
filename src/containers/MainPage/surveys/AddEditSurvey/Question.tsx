import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { ISurveyItemMeta } from '../../../../stores/surveys/surveyItemMeta';
import { ISurveyOption } from '../../../../stores/surveys/surveyOption';
import { ISurveyQuestion } from '../../../../stores/surveys/surveyQuestion';
import Option from './Option';
import QuestionSelectType from './QuestionSelectType';


const Options = (props: any) => {
  const {
    itemMeta,
    question,
    onQuestionRemove
  }: {
    itemMeta: ISurveyItemMeta
    question: ISurveyQuestion,
    onQuestionRemove: Function
  } = props;

  const [questionTitle, setQuestionTitle] = useState(question.questionTitle || '');

  const onChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionTitle(e.target.value);
    question.setQuestionTitle(e.target.value);
  }

  const onAddOption = () => {
    itemMeta.createOption(question);
  }
  
  const onOptionRemove = (option: ISurveyOption) => {
    itemMeta.removeOption(question, option);
  }

  let index = 1;
  const options = question.options.map((option) => (<Option key={option.id} position={index++} option={option} optionRemove={onOptionRemove} />))

  return (
    <>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Question" value={questionTitle} onChange={onChangeQuestion} />
        <div className="input-group-append">
          <button className="btn btn-warning" type="button" onClick={() => onQuestionRemove(question)}> - </button>
        </div>
      </div>

      <QuestionSelectType defaultValue={question.questionType} uniqueId={question.id} />

      <div className="form-group">
        <label>Answers: </label>
        
        {options}

        <div className="input-group input-group-sm mb-2">
          <input type="button" className="form-control form-control-sm btn btn-info" value="+" onClick={onAddOption} />
        </div>
      </div>

      <hr />
    </>
  )
}

export default observer(Options);