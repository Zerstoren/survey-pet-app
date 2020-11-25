import { getSnapshot, Instance, types } from "mobx-state-tree";
import { getUniqueInt } from "../../helpers/fns/math";
import SurveyItem from "./surveyItem";
import SurveyOption, { ISurveyOption } from "./surveyOption";
import SurveyQuestion, { ISurveyQuestion } from "./surveyQuestion";

const SurveyItemMeta = types.model({
  survey: types.optional(SurveyItem, {id: getUniqueInt()}),
  questionsList: types.array(SurveyQuestion),
  optionsList: types.array(SurveyOption)
}).actions(self => {
  const afterCreate = () => {
    createQuestion();
    const question = self.questionsList[0];
    createOption(question);
    createOption(question);
  }

  const createQuestion = () => {
    const question = SurveyQuestion.create({id: getUniqueInt()});
    self.questionsList.push(question);
    self.survey.createQuestion(question);
  }

  const removeQuestion = (question: ISurveyQuestion) => {
    self.survey.removeQuestion(question);
    self.questionsList.remove(question);
  }

  const createOption = (question: ISurveyQuestion) => {
    const option = SurveyOption.create({id: getUniqueInt()});
    self.optionsList.push(option);
    question.createOption(option);
  }

  const removeOption = (question: ISurveyQuestion, option: ISurveyOption) => {
    question.removeOption(option);
    self.optionsList.remove(option);
  }

  const save = () => {
    console.log(getSnapshot(self));
  }

  return {
    afterCreate,
    createQuestion,
    removeQuestion,
    createOption,
    removeOption,
    save,
  }
});

export type ISurveyItemMeta = Instance<typeof SurveyItemMeta>;
export default SurveyItemMeta;