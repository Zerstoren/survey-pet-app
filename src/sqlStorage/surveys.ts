import { column, ColumnType, database, EnvConfig, sqlite, Table } from 'websql-orm';
import { ISnapchotInSurveyItem } from '../stores/surveys/types';

EnvConfig.enableDebugLog = false;

@database('survey_db', 'surveys')
class Surveys extends Table {
  @column(ColumnType.PRIMARY | ColumnType.STRING)
  id: string;
  
  @column(ColumnType.STRING)
  title: string;

  constructor(data?: Survey) {
    super();
    this.id = data ? data.id : '';
    this.title = data ? data.title : '';
  }

  getJson() {
    return {
      id: this.id,
      title: this.title
    }
  }
}

interface Survey {
  id: string,
  title: string,
}

const _survey = (data: Survey) => {
  const surveyRecord = new Surveys(data);
  return surveyRecord;
}

const add = async (data: Survey) => {
  const surveyRecord = _survey(data);
  await sqlite.insert<Surveys>(surveyRecord);
  return [data.id];
}

const load = async () : Promise<Array<ISnapchotInSurveyItem>> => {
  let results = await sqlite.query<Surveys>(new Surveys(), {} );
  return results.map((r) => r.getJson());
}

const filterLoadList = async (filter: string) : Promise<Array<ISnapchotInSurveyItem>> => {
  let results = await sqlite.fromSql<Surveys>(
    new Surveys(), 
    "SELECT * FROM surveys WHERE title LIKE ?",
    [`%${filter}%`]
  );

  return results.map(r => r.getJson());
}

export {
  add,
  load,
  filterLoadList,
};
