import { sqlite, database, column, ColumnType, Table } from 'websql-orm';
import { ISnapshotInSurveyAnswer } from '../stores/surveys/types';
 
@database('survey_db', 'answers')
class Answers extends Table {
  @column(ColumnType.PRIMARY | ColumnType.STRING)
  id: string;

  @column(ColumnType.NUMBER)
  position: number;

  @column(ColumnType.STRING)
  surveyId: string;

  @column(ColumnType.STRING)
  questionId: string;

  @column(ColumnType.STRING)
  title: string
  
  constructor(data?: ISnapshotInSurveyAnswer) {
    super();
    this.id = data?.id ? data.id : '';
    this.surveyId = data?.surveyId ? data.surveyId : '';
    this.questionId = data?.questionId ? data.questionId : '';
    this.title = data?.title ? data.title : '';
    this.position = data?.position ? data.position : 0;
  }

  getJson() : ISnapshotInSurveyAnswer {
    return {
      id: this.id,
      surveyId: this.surveyId,
      questionId: this.questionId,
      title: this.title,
      position: this.position,
    }
  }
}

const add = async (data: ISnapshotInSurveyAnswer) => {
  await sqlite.insert<Answers>(new Answers(data));
  return data.id;
} 

const addMany = async (data: Array<ISnapshotInSurveyAnswer>) => {
  await sqlite.insert<Answers>(data.map(a => new Answers(a)));
  return data.map((a) => a.id);
}

const getItems = async (surveyId: string) => {
  const results = await sqlite.query(new Answers(), {'surveyId': surveyId});
  return results.map((q) => q.getJson());
}

export {
  add,
  addMany,
  getItems,
}