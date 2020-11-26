import { inject, observer } from 'mobx-react';
import React, { useState } from 'react';
import UiPopup from '../../../../components/uiBase/popup';
import { IMainStore } from '../../../../stores/mainState';
import { ISurveyItemMeta } from '../../../../stores/surveys/surveyItemMeta';
import { ISurveyQuestion } from '../../../../stores/surveys/surveyQuestion';
import Options from './Question';

const AddPopup = ({
  mainStore,
  itemMeta,
}: {
  mainStore?: IMainStore,
  itemMeta: ISurveyItemMeta
}) => {

  const [title, setTitle] = useState(itemMeta.survey.title || '');

  const survey = itemMeta.survey;
  
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    survey.setTitle(e.target.value);  
  }

  const onQuestionRemove = (question: ISurveyQuestion) => {
    itemMeta.removeQuestion(question);
  }

  const saveSurvey = () => {
    itemMeta.save();
    mainStore?.reloadListOnMainPage();
    mainStore?.setIsShowAddSurveyPopup(false);
  }

  const createQuestion = () => {
    itemMeta.createQuestion();
  }

  const question = survey.questions.map(
    (question) => question ? (<Options itemMeta={itemMeta} question={question} key={question.id} onQuestionRemove={onQuestionRemove} />) : null
  );

  return (
    <UiPopup 
      title="Add new survey" 
      onClose={() => mainStore && mainStore.setIsShowAddSurveyPopup(false)}
    >
      <form>
        <div className="form-group">
          <label>Survey title</label>
          <input name="name" className="form-control" value={title} onChange={onChangeTitle} />
        </div>

        <hr />

        {question}

        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-success" onClick={createQuestion}>Add Question</button>
          <button type="button" className="btn btn-primary" onClick={saveSurvey}>Create Survey</button>
        </div>
      </form>
    </UiPopup>
  )
}

export default inject("mainStore")(observer(AddPopup));