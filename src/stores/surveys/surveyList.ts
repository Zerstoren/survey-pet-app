import { flow, Instance, types } from "mobx-state-tree";
import { loadSurvey } from "../../storageEmulate/surveyList";
import SurveyItem from "./surveyItem";

const SurveyListStore = types.model({
  surveys: types.array(SurveyItem)
})
.views((self) => ({
  get count() {
    console.log(self.surveys);
    return self.surveys.length;
  }
}))
.actions(self => {
  const loadList = flow(function*() {
    const result = yield loadSurvey();
    self.surveys.replace(result);
  })

  return {
    loadList
  };
});

type ISurveyListStore = Instance<typeof SurveyListStore>;

export type {
  ISurveyListStore
}

export default SurveyListStore;