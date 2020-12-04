import { types } from "mobx-state-tree";
import { v4 } from "uuid";

const PollResults = types.model("PollResults", {
  id: types.optional(types.identifier, () => v4()),
  surveyId: types.string,
  questionId: types.string,
  answerId: types.string,
  userId: types.string,
});

export default PollResults;