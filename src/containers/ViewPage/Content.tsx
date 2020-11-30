import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import SurveyItemMeta from '../../stores/surveys/surveyItemMeta';

const Content = () => {
  const { id }: { id: string } = useParams();
  
  const surveyItem = useMemo(() => {
    const surveyId = Number.parseInt(id);

    const surveyItem = SurveyItemMeta.create({survey: {id: surveyId}});
    surveyItem.load();
    return surveyItem.survey;
  }, [id]);

  return (
    <>
      <div className="d-flex justify-content-center view-outside">
        <div className="view-block">
          <div className="view-title">
            <h2>Опрос о качестве обслуживания персоналом в кругах ада с первого по девятый</h2>
          </div>

          <div className="view-question-block">
            <div className="view-question-title">
              <h4>Как вы относитесь к ударам плетью на третьем круге?</h4>
            </div>

            <ul className="list-group list-group-flush view-question-answers">
              <li className="list-group-item list-group-item-action active form-group d-flex justify-content-start view-question-answer">
                <input type="radio" name="q" className="form-check-input" />
                Отличные удары и хороший откил.
              </li>

              <li className="list-group-item list-group-item-action form-group d-flex justify-content-start view-question-answer">
                <input type="radio" name="q" className="form-check-input" />
                Нормально, в целом доволен.
              </li>
              <li className="list-group-item list-group-item-action form-group d-flex justify-content-start view-question-answer">
                <input type="radio" name="q" className="form-check-input" />
                Ужасные удары, слабые, скучные.
              </li>
            </ul>
          </div>

          <div className="view-button-next">
            <button type="button" className="btn btn-primary">Next</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;