import { column, ColumnType, database, sqlite, Table } from 'websql-orm';
import { ISnapshotInPollResults } from '../stores/respondent/types';

@database('survey_db', 'poll_results')
class PollResults extends Table {
  @column(ColumnType.PRIMARY | ColumnType.STRING)
  id: string;

  @column(ColumnType.STRING)
  surveyId: string;

  @column(ColumnType.STRING)
  questionId: string;

  @column(ColumnType.STRING)
  answerId: string;

  @column(ColumnType.STRING)
  userId: string;

  constructor(data?: ISnapshotInPollResults) {
    super();
    this.id = data?.id ? data.id : '';
    this.surveyId = data?.surveyId ? data.surveyId : '';
    this.questionId = data?.questionId ? data.questionId : '';
    this.answerId = data?.answerId ? data.answerId : '';
    this.userId = data?.userId ? data.userId : '';
  }

  getJson() : ISnapshotInPollResults {
    return {
      id: this.id,
      surveyId: this.surveyId,
      questionId: this.questionId,
      answerId: this.answerId,
      userId: this.answerId,
    }
  }
}

const add = async (data: ISnapshotInPollResults) => {
  const pollResultRecord = new PollResults(data);
  await sqlite.insert<PollResults>(pollResultRecord);
  return [data.id];
}

const addMany = async (data: Array<ISnapshotInPollResults>) => {
  const pollResultsRecirds = data.map(d => new PollResults(d));
  await sqlite.insert<PollResults>(pollResultsRecirds);
  return pollResultsRecirds.map(p => p.id);
}

const load = async () : Promise<Array<ISnapshotInPollResults>> => {
  let results = await sqlite.query<PollResults>(new PollResults(), {} );
  return results.map((r) => r.getJson());
}

const getItem = async (id: string) : Promise<ISnapshotInPollResults> => {
  let results = await sqlite.queryFirst<PollResults>(new PollResults(), {"id": id});
  return results.getJson();
}

export {
  add,
  addMany,
  load,
  getItem,
};
