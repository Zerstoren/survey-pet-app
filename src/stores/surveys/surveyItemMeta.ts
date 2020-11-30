import { flow, getSnapshot, Instance, types } from "mobx-state-tree";
import { getUniqueDecrementInt } from "../../helpers/fns/math";
import { saveMetaSurvey } from "../../storageEmulate/surveyList";
import SurveyItem from "./surveyItem";
import SurveyAnswer from "./surveyAnswer";
import SurveyQuestion, { ISurveyQuestion } from "./surveyQuestion";

const SurveyItemMeta = types.model({
  survey: types.optional(SurveyItem, {id: getUniqueDecrementInt()}),
  questionsList: types.array(SurveyQuestion),
  answersList: types.array(SurveyAnswer)
}).actions(self => {
  const createQuestion = () => {
    const question = SurveyQuestion.create();
    self.questionsList.push(question);
    self.survey.createQuestion(question);
  }

  const createAnswer = (question: ISurveyQuestion) => {
    const answer = SurveyAnswer.create();
    self.answersList.push(answer);
    question.createAnswer(answer);
  }

  const save = flow(function*() {
    let snapshot = getSnapshot(self);

    try {
      yield saveMetaSurvey(snapshot);
    } catch (e) {
      debugger;
    }

    return 1;
  });

  const load = flow(function*() {
    
  });

  return {
    createQuestion,
    createAnswer,
    save,
    load,
  }
});

export type ISurveyItemMeta = Instance<typeof SurveyItemMeta>;
export default SurveyItemMeta;