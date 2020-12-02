import { flow, types } from "mobx-state-tree";
import { loadSurvey } from "../../storageEmulate/surveyList";
import SurveyItem from "./surveyItem";

const SurveyListStore = types.model({
  surveys: types.array(SurveyItem),
  filterSearchText: types.optional(types.string, '')
})
.views((self) => ({
  get count() {
    return self.surveys.length;
  }
})).actions(self => {
  const loadList = flow(function*() {
    const result = yield loadSurvey(self.filterSearchText);
    self.surveys.replace(result);
  })

  const applySearchText = (text: string) => {
    self.filterSearchText = text;
  }

  return {
    loadList,
    applySearchText
  };
});

export default SurveyListStore;