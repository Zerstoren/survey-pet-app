import arrayMutators from 'final-form-arrays';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import UiPopup from '../../../../components/uiBase/popup';
import createSurveyValidator from '../../../../helpers/validators/createSurveyValidator';
import { required } from '../../../../helpers/validators/default';
import { IMainStore } from '../../../../stores/mainState';
import { ISurveyItem } from '../../../../stores/surveys/surveyItem';
import { ISurveyItemMeta } from '../../../../stores/surveys/surveyItemMeta';
import { SELECT_TYPE } from '../../../../stores/surveys/surveyQuestion';
import Questions from './Question';


const AddPopup = ({
  mainStore,
  itemMeta,
}: {
  mainStore?: IMainStore,
  itemMeta: ISurveyItemMeta
}) => {
  const onSubmit = (values: any) => {
    console.log(values);
  }

  const initialQuestionValue = {
    title: '',
    questionType: SELECT_TYPE.SINGLE,
    options: [{}, {}]
  }

  return (
    <UiPopup 
      title="Add new survey" 
      onClose={() => mainStore?.setIsShowAddSurveyPopup(false)}
    >
      <Form 
        onSubmit={onSubmit}
        validate={createSurveyValidator}
        initialValues={{title: '', questions: [initialQuestionValue]}}
        mutators={{
          ...arrayMutators
        }}
        render={({
          handleSubmit, 
          form: {
            mutators: { push }
          }
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Survey title</label>
              <Field
                name="title" 
                validate={required}
              >
                {({input, meta}) => {
                  let className = 'form-control';
                  let errorMsg = null;
                  if (meta.error && meta.touched) {
                    errorMsg = (<div className="invalid-feedback">{meta.error}</div>);
                    className += ' is-invalid';
                  }

                  return (
                    <>
                      <input {...input} className={className} />
                      {errorMsg}
                    </>
                  )
                }}
              </Field>
            </div>
    
            <hr />

            <Field name="question">
              {({input, meta}) => meta.error ? (<div className="alert alert-danger">{meta.error}</div>) : null}
            </Field>

            <FieldArray name='questions'>
                {({fields}) => fields.map((name, index) => (
                  <Questions 
                    key={index} 
                    namePath={`questions[${index}]`}
                    questionIndex={index} 
                    push={push}
                    onQuestionRemove={() => fields.remove(index)} />
                ))}
            </FieldArray>
    
            <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-success" onClick={() => push('questions', initialQuestionValue)}>Add Question</button>
              <button type="button" className="btn btn-primary" onClick={() => handleSubmit()}>Create Survey</button>
            </div>
          </form>
        )}
      />
    </UiPopup>
  )
}

export default inject("mainStore")(observer(AddPopup));