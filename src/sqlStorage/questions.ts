import { sqlite, database, column, ColumnType, Table } from 'websql-orm';
import { SELECT_TYPE } from '../stores/surveys/surveyQuestion';
import { ISnapshotInSurveyQuestion } from '../stores/surveys/types';
 
@database('survey_db', 'questions')
class Questions extends Table {
  @column(ColumnType.PRIMARY | ColumnType.STRING)
  id: string;

  @column(ColumnType.STRING)
  surveyId: string;

  @column(ColumnType.STRING)
  title: string

  @column(ColumnType.STRING)
  type: string

  constructor(data?: ISnapshotInSurveyQuestion) {
    super();
    this.id = data?.id ? data.id : '';
    this.surveyId = data?.surveyId ? data.surveyId : '';
    this.title = data?.title ? data.title : '';
    this.type = data?.type ? data.type : '';
  }

  getJson() : ISnapshotInSurveyQuestion {
    return {
      id: this.id,
      surveyId: this.surveyId,
      title: this.title,
      type: this.type === SELECT_TYPE.SINGLE ? SELECT_TYPE.SINGLE : SELECT_TYPE.MULTI
    }
  }
}

const add = async (data: ISnapshotInSurveyQuestion) => {
  const questionRecord = new Questions(data);
  await sqlite.insert<Questions>(questionRecord);
  return [data.id];
} 

const addMany = async (data: Array<ISnapshotInSurveyQuestion>) => {
  await sqlite.insert<Questions>(data.map(q => new Questions(q)));
  return data.map((q) => q.id);
}

const getItems = async (surveyId: string) => {
  const results = await sqlite.query(new Questions(), {'surveyId': surveyId});
  return results.map((q) => q.getJson());
}

export {
  add,
  addMany,
  getItems,
}