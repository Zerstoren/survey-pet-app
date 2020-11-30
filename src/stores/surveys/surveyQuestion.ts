import { Instance, types } from "mobx-state-tree";
import { getUniqueDecrementInt } from "../../helpers/fns/math";
import SurveyAnswer, { ISurveyAnswer } from "./surveyAnswer";

enum SELECT_TYPE {
  SINGLE = 'single',
  MULTI = 'multi'
}

const SurveyQuestion = types.model("SurveyQuestion", {
  id: types.optional(types.identifierNumber, () => getUniqueDecrementInt()),
  isNew: types.optional(types.boolean, true),
  questionTitle: types.optional(types.string, ''),
  questionType: types.optional(types.enumeration<SELECT_TYPE>('SELECT_TYPE', [SELECT_TYPE.SINGLE, SELECT_TYPE.MULTI]), SELECT_TYPE.SINGLE),
  answers: types.array(types.safeReference(SurveyAnswer))
}).actions(self => {
  const createAnswer = (answer: ISurveyAnswer) => {
    self.answers.push(answer);
  };

  const removeAnswer = (answer: ISurveyAnswer) => {
    self.answers.remove(answer);
  };

  const setQuestionTitle = (title: string) => {
    self.questionTitle = title;
  };

  const setQuestionType = (type: SELECT_TYPE) => {
    self.questionType = type;
  };

  return {
    createAnswer,
    removeAnswer,
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