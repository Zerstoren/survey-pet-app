import { sqlite, database, column, ColumnType, Table } from 'websql-orm';
 
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

  constructor(data?: Question) {
    super();
    this.id = data ? data.id : '';
    this.surveyId = data ? data.surveyId : '';
    this.title = data ? data.title : '';
    this.type = data ? data.type : '';
  }

  getJson() : Question {
    return {
      id: this.id,
      surveyId: this.surveyId,
      title: this.title,
      type: this.type
    }
  }
}

interface Question {
  id: string,
  surveyId: string,
  title: string,
  type: string,
}

const add = async (data: Question) => {
  const questionRecord = new Questions(data);
  await sqlite.insert<Questions>(questionRecord);
  return [data.id];
} 

const addMany = async (data: Array<Question>) => {
  await sqlite.insert<Questions>(data.map(q => new Questions(q)));
  return data.map((q) => q.id);
}

export {
  add,
  addMany
}