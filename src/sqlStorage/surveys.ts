import { sqlite, database, column, ColumnType, Table, EnvConfig } from 'websql-orm';

EnvConfig.enableDebugLog = true;

@database('survey_db', 'surveys')
class Surveys extends Table {
  @column(ColumnType.PRIMARY | ColumnType.STRING)
  id: string | undefined;
  
  @column(ColumnType.STRING)
  title: string | undefined;
}

interface Survey {
  id: string,
  title: string,
}

const _survey = (data: Survey) => {
  const surveyRecord = new Surveys();
  surveyRecord.title = data.title;
  surveyRecord.id = data.id;
  return surveyRecord;
}

const add = async (data: Survey) => {
  const surveyRecord = _survey(data);
  await sqlite.insert<Surveys>(surveyRecord);
  return [data.id];
}

export {
  add,
}