import React from 'react';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import Answer from './fields/AnswersText';
import QuestionSelectType from './fields/QuestionSelectType';
import QuestionTitle from './fields/QuestionTitle';

const Options = ({
  questionIndex,
  namePath,
  onQuestionRemove,
  push
}: {
  questionIndex: number,
  namePath: string,
  onQuestionRemove: Function,
  push: Function
}) => {
  return (
    <>
      <QuestionTitle namePath={namePath} onQuestionRemove={onQuestionRemove} />

      <QuestionSelectType 
        index={questionIndex} 
        namePath={namePath}  
      />

      <div className="form-group">
        <label>Answers: </label>
        
        <Field name={`${namePath}.option`}>
          {({input, meta}) => meta.error ? (<div className="alert alert-danger">{meta.error}</div>) : null}
        </Field>

        <FieldArray name={`${namePath}.options`}>
          {({fields}) => fields.map((name, index) => (
            <Answer 
              key={index} 
              namePath={name} 
              optionIndex={index}
              optionRemove={() => fields.remove(index)}
            />
          ))}
        </FieldArray>

        <div className="input-group input-group-sm mb-2">
          <input 
            type="button" 
            className="form-control form-control-sm btn btn-info" 
            value="+" 
            onClick={() => push(`${namePath}.options`)}
          />
        </div>
      </div>

      <hr />
    </>
  )
}

export default Options;