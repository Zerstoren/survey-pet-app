import { types } from "mobx-state-tree";
import { NIL, v4 } from "uuid";

const SurveyAnswer = types.model("SurvetAnswer", {
  id: types.optional(types.identifier, () => v4()),
  questionId: types.optional(types.string, NIL),
  surveyId: types.optional(types.string, NIL),
  isNew: types.optional(types.boolean, true),
  title: types.optional(types.string, ''),
  position: types.optional(types.number, 0)
}).actions(self => ({
  setTitle(title: string) {
    self.title = title;
  }
}));

export default SurveyAnswer;