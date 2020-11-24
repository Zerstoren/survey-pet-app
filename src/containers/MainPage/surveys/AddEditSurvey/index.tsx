import { inject, observer } from 'mobx-react';
import React, {useState} from 'react';
import UiPopup from '../../../../components/uiBase/popup';
import { MainStore } from '../../../../stores/mainState';
import SurveyItem, { ISurveyItem } from '../../../../stores/surveys/surveyItem';
import SurveyQuestion, { ISurveyQuestion } from '../../../../stores/surveys/surveyQuestion';
import Options from './Question';

const AddPopup = (props: any) => {
  const {
    mainStore,
    item,
  }: {
    mainStore: MainStore,
    item: ISurveyItem
  } = props;

  const [title, setTitle] = useState(item.title || '');
  
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    item.setTitle(e.target.value);  
  }

  const onOptionRemove = (question: ISurveyQuestion) => {
    item.removeOption(question);
  }

  const saveSurvey = () => {
    item.save();
  }

  const question = item.questions.map((item) => (<Options question={item} key={item.id} onQuestionRemove={onOptionRemove} />));

  return (
    <UiPopup 
      title="Add new survey" 
      onClose={() => mainStore.setIsShowAddSurveyPopup(false)}
    >
      <form>
        <div className="form-group">
          <label>Survey title</label>
          <input name="name" className="form-control" value={title} onChange={onChangeTitle} />
        </div>

        <hr />

        {question}

        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-success" onClick={() => item.createOption()}>Add Question</button>
          <button type="button" className="btn btn-primary" onClick={() => saveSurvey()}>Create Survey</button>
        </div>
      </form>
    </UiPopup>
  )
}

export default inject("mainStore")(observer(AddPopup));