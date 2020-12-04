import { column, ColumnType, database, sqlite, Table } from 'websql-orm';
import { ISnapshotInUserStore } from '../stores/respondent/types';

@database('survey_db', 'user')
class User extends Table {
  @column(ColumnType.PRIMARY | ColumnType.STRING)
  id: string;

  constructor(data?: ISnapshotInUserStore) {
    super();
    this.id = data?.id ? data.id : '';
  }

  getJson() : ISnapshotInUserStore {
    return {
      id: this.id,
    }
  }
}

const add = async (data: ISnapshotInUserStore) => {
  const surveyRecord = new User(data);
  await sqlite.insert<User>(surveyRecord);
  return [data.id];
}

const load = async () : Promise<Array<ISnapshotInUserStore>> => {
  let results = await sqlite.query<User>(new User(), {} );
  return results.map((r) => r.getJson());
}

const getItem = async (id: string) : Promise<ISnapshotInUserStore> => {
  let results = await sqlite.queryFirst<User>(new User(), {"id": id});
  return results.getJson();
}

export {
  add,
  load,
  getItem,
};
