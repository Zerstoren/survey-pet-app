import { flow, getSnapshot, types } from "mobx-state-tree";
import { v4 } from "uuid";
import * as userSql from '../../sqlStorage/user';

const UserStore = types.model("User", {
  id: types.optional(types.identifier, () => v4()),
}).actions(self => {
  const create = flow(function*() : Generator<Promise<Array<string | undefined>>> {
      yield userSql.add(getSnapshot(self));
  });
  
  return {
    create
  };
});

export default UserStore;