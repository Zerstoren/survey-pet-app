import { flow } from "mobx";
import { applySnapshot, getSnapshot, types } from "mobx-state-tree";
import * as pollResultsSql from '../../sqlStorage/pollResults';
import PollResults from "./pollResults";

const PollResultsList = types.model("PollResultsList", {
  pollResults: types.array(PollResults),
}).actions(self => {
  const save = flow(function*() {
    yield pollResultsSql.addMany(getSnapshot(self).pollResults);
  });

  const load = flow(function*(ids: Array<string>) {
    applySnapshot(
      self,
      {pollResults: (yield pollResultsSql.load(ids))}
    );
  });

  return {
    save,
    load
  };
});

export default PollResultsList;