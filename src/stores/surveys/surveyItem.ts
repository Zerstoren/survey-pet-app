import { types } from "mobx-state-tree";
import { v4 } from 'uuid';
import SurveyQuestion from "./surveyQuestion";

const SurveyItem = types.model("Survey", {
  id: types.optional(types.identifier, () => v4()),
  isNew: types.optional(types.boolean, true),
  title: types.optional(types.string, ''),
  questions: types.array(SurveyQuestion),
});

export default SurveyItem;