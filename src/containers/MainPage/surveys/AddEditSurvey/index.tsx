import { inject, observer } from 'mobx-react';
import React, {useEffect, useState} from 'react';
import UiPopup from '../../../../components/uiBase/popup';
import { MainStore } from '../../../../stores/mainState';
import SurveyItem from '../../../../stores/surveys/surveyItem';
import Options from './options';

const AddPopup = (props: any) => {
  const {
    mainStore,
    item,
  }: {
    mainStore: MainStore,
    item: SurveyItem
  } = props;

  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle((item.title || '') as string);
  }, [item.title]);


  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    item.setTitle(e.target.value);
  }

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

        <Options />

        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-success">Add Question</button>
          <button type="button" className="btn btn-primary">Create Survey</button>
        </div>
      </form>
    </UiPopup>
  )
}

export default inject("mainStore")(observer(AddPopup));