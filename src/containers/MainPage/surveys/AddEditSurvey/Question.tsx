import React from 'react';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { required } from '../../../../helpers/validators/default';
import Answer from './Answers';
import QuestionSelectType from './QuestionSelectType';

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
      <Field
        name={`${namePath}.title`}
        validate={required}
      >
        {({input, meta}) => {
          let classNameGroup = 'input-group';
          let classNameInput = 'form-control';
          let errorMsg = null;
          if (meta.error && meta.touched) {
            errorMsg = (<div className="invalid-feedback mb-3">{meta.error}</div>);
            classNameInput += ' is-invalid';
            classNameGroup += ' is-invalid';
          } else {
            classNameGroup += ' mb-3';
          }

          return (
            <>
              <div className={classNameGroup}>
                <input {...input} className={classNameInput} />
                <div className="input-group-append">
                  <button className="btn btn-warning" type="button" onClick={() => onQuestionRemove()}> - </button>
                </div>
              </div>
              {errorMsg}
            </>
          )
        }}
      </Field>

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
              namePath={`${namePath}.options[${index}]`} 
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