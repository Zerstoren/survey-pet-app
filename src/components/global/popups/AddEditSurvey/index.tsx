import arrayMutators from 'final-form-arrays';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import createSurveyValidator from '../../../../helpers/validators/createSurveyValidator';
import { IMainStore } from '../../../../stores/mainState';
import SurveyItem from '../../../../stores/surveys/surveyItem';
import { SELECT_TYPE } from '../../../../stores/surveys/surveyQuestion';
import { ISurveyItem } from '../../../../stores/surveys/types';
import UiPopup from '../../../uiBase/popup';
import SurveyTitle from './fields/SurvetTitle';
import Questions from './Question';


const AddPopup = ({
  mainStore,
  itemMeta,
}: {
  mainStore?: IMainStore,
  itemMeta: ISurveyItem
}) => {
  const onSubmit = (values: any) => {
    SurveyItem.create(values).save();
    
    mainStore?.reloadListOnMainPage();
    mainStore?.setIsShowAddSurveyPopup(false);
  }

  const initialQuestionValue = {
    title: '',
    type: SELECT_TYPE.SINGLE,
    answers: [{}, {}]
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
            <SurveyTitle />
    
            <hr />

            <Field name="question">
              {({input, meta}) => meta.error ? (<div className="alert alert-danger">{meta.error}</div>) : null}
            </Field>

            <FieldArray name='questions'>
                {({fields}) => fields.map((name, index) => (
                  <Questions 
                    key={index} 
                    namePath={name}
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