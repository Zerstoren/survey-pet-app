import { flow } from 'mobx';
import { getSnapshot } from 'mobx-state-tree';
import { saveSurvey } from '../storageEmulate/surveyList';
import SurveyItem from '../stores/surveys/surveyItem';
import { ISurveyAnswer, ISurveyQuestion, ISurveyItem} from '../stores/surveys/types';

const SurveActions = SurveyItem.actions(self => {
  const setTitle = (title: string) => {
    self.title = title;
  }

  const save = flow(function*() {
    let snapshot = getSnapshot(self);

    try {
      yield saveSurvey(snapshot);
    } catch (e) {
      debugger;
    }

    return 1;
  });

  const load = flow(function*() {
    
  });

  return {
    setTitle,
    save,
    load,
  };
})

export default SurveActions;