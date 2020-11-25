import { flow, getSnapshot, Instance, types } from "mobx-state-tree";
import { getUniqueDecrementInt } from "../../helpers/fns/math";
import { saveMetaSurvey } from "../../storageEmulate/surveyList";
import SurveyItem from "./surveyItem";
import SurveyOption, { ISurveyOption } from "./surveyOption";
import SurveyQuestion, { ISurveyQuestion } from "./surveyQuestion";

const SurveyItemMeta = types.model({
  survey: types.optional(SurveyItem, {id: getUniqueDecrementInt()}),
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
    const question = SurveyQuestion.create({id: getUniqueDecrementInt()});
    self.questionsList.push(question);
    self.survey.createQuestion(question);
  }

  const removeQuestion = (question: ISurveyQuestion) => {
    question.options.map((option) => option && removeOption(option));
    self.questionsList.remove(question);
  }

  const createOption = (question: ISurveyQuestion) => {
    const option = SurveyOption.create({id: getUniqueDecrementInt()});
    self.optionsList.push(option);
    question.createOption(option);
  }

  const removeOption = (option: ISurveyOption) => {
    self.optionsList.remove(option);
  }

  const save = flow(function*() {
    let snapshot = getSnapshot(self);
    let generator;

    try {
      generator = yield saveMetaSurvey(snapshot);
    } catch (e) {
      debugger;
    }

    return 1;
  });

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