import { column, ColumnType, database, EnvConfig, sqlite, Table } from 'websql-orm';
import { ISnapshotInSurveyItem } from '../stores/surveys/types';

EnvConfig.enableDebugLog = false;

@database('survey_db', 'surveys')
class Surveys extends Table {
  @column(ColumnType.PRIMARY | ColumnType.STRING)
  id: string;
  
  @column(ColumnType.STRING)
  title: string;

  constructor(data?: ISnapshotInSurveyItem) {
    super();
    this.id = data?.id ? data.id : '';
    this.title = data?.title ? data.title : '';
  }

  getJson() : ISnapshotInSurveyItem {
    return {
      id: this.id,
      title: this.title
    }
  }
}

const add = async (data: ISnapshotInSurveyItem) => {
  const surveyRecord = new Surveys(data);
  await sqlite.insert<Surveys>(surveyRecord);
  return [data.id];
}

const load = async () : Promise<Array<ISnapshotInSurveyItem>> => {
  let results = await sqlite.query<Surveys>(new Surveys(), {} );
  return results.map((r) => r.getJson());
}

const filterLoadList = async (filter: string) : Promise<Array<ISnapshotInSurveyItem>> => {
  let results = await sqlite.fromSql<Surveys>(
    new Surveys(), 
    "SELECT * FROM surveys WHERE title LIKE ?",
    [`%${filter}%`]
  );

  return results.map(r => r.getJson());
}

const getItem = async (id: string) : Promise<ISnapshotInSurveyItem> => {
  let results = await sqlite.queryFirst<Surveys>(new Surveys(), {"id": id});
  return results.getJson();
}

export {
  add,
  load,
  filterLoadList,
  getItem,
};
