import { Instance, types } from "mobx-state-tree";
import SurveyOption, { ISurveyOption } from "./surveyOption";

enum SELECT_TYPE {
  SINGLE = 'single',
  MULTI = 'multi'
}

const SurveyQuestion = types.model("SurveyQuestion", {
  id: types.identifierNumber,
  isNew: types.optional(types.boolean, true),
  questionTitle: types.optional(types.string, ''),
  questionType: types.optional(types.enumeration<SELECT_TYPE>('SELECT_TYPE', [SELECT_TYPE.SINGLE, SELECT_TYPE.MULTI]), SELECT_TYPE.SINGLE),
  options: types.array(types.reference(SurveyOption))
}).actions(self => {
  const createOption = (option: ISurveyOption) => {
    self.options.push(option);
  };

  const removeOption = (option: ISurveyOption) => {
    self.options.remove(option);
  };

  const setQuestionTitle = (title: string) => {
    self.questionTitle = title;
  };

  const setQuestionType = (type: SELECT_TYPE) => {
    self.questionType = type;
  };

  return {
    createOption,
    removeOption,
    setQuestionTitle,
    setQuestionType,
  }
});

type ISurveyQuestion = Instance<typeof SurveyQuestion>;

export type {
  ISurveyQuestion
};
export {
  SELECT_TYPE
};


export default SurveyQuestion;