import { sqlite, database, column, ColumnType, Table } from 'websql-orm';
 
@database('survey_db', 'answers')
class Answers extends Table {
  @column(ColumnType.PRIMARY | ColumnType.STRING)
  id: string | undefined;

  @column(ColumnType.NUMBER)
  position: number | undefined;

  @column(ColumnType.STRING)
  surveyId: string | undefined;

  @column(ColumnType.STRING)
  questionId: string | undefined;

  @column(ColumnType.STRING)
  title: string | undefined
}

interface Answer {
  id: string,
  surveyId: string,
  questionId: string,
  title: string,
  position: number,
}

const _answer = (data: Answer) => {
  const answerRecord = new Answers();
  answerRecord.title = data.title;
  answerRecord.position = data.position;
  answerRecord.surveyId = data.surveyId;
  answerRecord.questionId = data.questionId;
  answerRecord.id = data.id;
  return answerRecord;
}

const add = async (data: Answer) => {
  const answerRecord = _answer(data);
  await sqlite.insert<Answers>(answerRecord);
  return answerRecord.id;
} 

const addMany = async (data: Array<Answer>) => {
  const records = data.map(_answer);
  await sqlite.insert<Answers>(records);
  return records.map((q) => q.id);
}

export {
  add,
  addMany
}