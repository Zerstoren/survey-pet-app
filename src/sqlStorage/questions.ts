import { sqlite, database, column, ColumnType, Table } from 'websql-orm';
 
@database('survey_db', 'questions')
class Questions extends Table {
  @column(ColumnType.PRIMARY | ColumnType.STRING)
  id: string | undefined;

  @column(ColumnType.STRING)
  surveyId: string | undefined;

  @column(ColumnType.STRING)
  title: string | undefined

  @column(ColumnType.STRING)
  type: string | undefined
}

interface Question {
  id: string,
  surveyId: string,
  title: string,
  type: string,
}

const _question = (data: Question) => {
  const questionRecord = new Questions();
  questionRecord.title = data.title;
  questionRecord.type = data.type;
  questionRecord.surveyId = data.surveyId;
  questionRecord.id = data.id;
  return questionRecord;
}

const add = async (data: Question) => {
  const questionRecord = _question(data);
  await sqlite.insert<Questions>(questionRecord);
  return [data.id];
} 

const addMany = async (data: Array<Question>) => {
  const records = data.map(_question);
  await sqlite.insert<Questions>(records);
  return data.map((q) => q.id);
}

export {
  add,
  addMany
}