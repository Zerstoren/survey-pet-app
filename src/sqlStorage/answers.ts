import { sqlite, database, column, ColumnType, Table } from 'websql-orm';
 
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
  
  constructor(data?: Answer) {
    super();
    this.id = data ? data.id : '';
    this.surveyId = data ? data.surveyId : '';
    this.questionId = data ? data.questionId : '';
    this.title = data ? data.title : '';
    this.position = data ? data.position : 0;
  }

  getJson() : Answer {
    return {
      id: this.id,
      surveyId: this.surveyId,
      questionId: this.questionId,
      title: this.title,
      position: this.position,
    }
  }
}

interface Answer {
  id: string,
  surveyId: string,
  questionId: string,
  title: string,
  position: number,
}

const add = async (data: Answer) => {
  await sqlite.insert<Answers>(new Answers(data));
  return data.id;
} 

const addMany = async (data: Array<Answer>) => {
  await sqlite.insert<Answers>(data.map(a => new Answers(a)));
  return data.map((a) => a.id);
}

export {
  add,
  addMany
}