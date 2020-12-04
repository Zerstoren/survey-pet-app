import { Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";
import PollResults from "./pollResults";
import UserStore from "./user";

interface IUserStore extends Instance<typeof UserStore> {}
interface ISnapshotInUserStore extends SnapshotIn<typeof UserStore> {}
interface ISnapshotOutUserStore extends SnapshotOut<typeof UserStore> {}

interface IPollResults extends Instance<typeof PollResults>{}
interface ISnapshotInPollResults extends SnapshotIn<typeof PollResults>{}
interface ISnapshotOutPollResults extends SnapshotOut<typeof PollResults>{}

export type {
  IUserStore,
  ISnapshotInUserStore,
  ISnapshotOutUserStore,

  IPollResults,
  ISnapshotInPollResults,
  ISnapshotOutPollResults
}