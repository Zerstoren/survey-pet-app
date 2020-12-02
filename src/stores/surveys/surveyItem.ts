import { applySnapshot, flow, getSnapshot, types } from "mobx-state-tree";
import { v4 } from 'uuid';
import { getSurvey, saveSurvey } from "../../storageEmulate/surveyList";
import SurveyQuestion from "./surveyQuestion";
import { ISnapshotInSurveyItem } from "./types";

const SurveyItem = types.model("Survey", {
  id: types.optional(types.identifier, () => v4()),
  isNew: types.optional(types.boolean, true),
  title: types.optional(types.string, ''),
  questions: types.array(SurveyQuestion),
}).actions(self => {
  const save = flow(function*() : Generator<Promise<void>> {
    try {
      let snapshot = getSnapshot(self);
      yield saveSurvey(snapshot);
    } catch (e) {
      debugger;
    }
  });

  const load = flow(function*() : Generator<Promise<ISnapshotInSurveyItem>> {
    applySnapshot(
      self, 
      (yield getSurvey(self.id))
    );
  });

  return {
    save,
    load,
  };
});

export default SurveyItem;