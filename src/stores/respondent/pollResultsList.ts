import { flow } from "mobx";
import { getSnapshot, types } from "mobx-state-tree";
import PollResults from "./pollResults";
import * as pollResultsSql from '../../sqlStorage/pollResults';

const PollResultsList = types.model("PollResultsList", {
  pollResults: types.array(PollResults),
}).actions(self => {
  const save = flow(function*() {
    yield pollResultsSql.addMany(getSnapshot(self).pollResults);
  });

  return {
    save
  };
});

export default PollResultsList;