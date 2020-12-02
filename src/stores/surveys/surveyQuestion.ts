import { types } from "mobx-state-tree";
import { v4, NIL } from "uuid";
import SurveyAnswer from "./surveyAnswer";

enum SELECT_TYPE {
  SINGLE = 'single',
  MULTI = 'multi'
}

const SurveyQuestion = types.model("SurveyQuestion", {
  id: types.optional(types.identifier, () => v4()),
  surveyId: types.optional(types.string, NIL),
  isNew: types.optional(types.boolean, true),
  title: types.optional(types.string, ''),
  type: types.optional(types.enumeration<SELECT_TYPE>('SELECT_TYPE', [SELECT_TYPE.SINGLE, SELECT_TYPE.MULTI]), SELECT_TYPE.SINGLE),
  answers: types.array(SurveyAnswer)
}).actions(self => {
  const setTitle = (title: string) => {
    self.title = title;
  };

  const setType = (type: SELECT_TYPE) => {
    self.type = type;
  };

  return {
    setTitle,
    setType,
  }
});

export {
  SELECT_TYPE
};

export default SurveyQuestion;