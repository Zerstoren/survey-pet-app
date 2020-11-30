import { ISurveyItem } from "../../stores/surveys/surveyItem";

interface FormValue {
  question?: string
  questions?: Array<{
    answer?: string,
  }>,
}

const createSurveyValidator = (values: ISurveyItem) => {
  const errors: FormValue = {};
  if (!values?.questions?.length) {
    errors.question = 'Questions is required';
  }

  values.questions.forEach((question, index) => {
    if (!question) {
      errors?.questions?.push({});
      return;
    }
    
    if (!errors.questions) {
      errors.questions = [];
    }

    let answersError: string = '';

    if (!question.answers || !question.answers.length) {
      answersError = 'Answers is required';
    }

    if (answersError) {
      errors.questions.push({
        answer: answersError,
      });
    } else {
      errors.questions.push({});
    }
  });

  return errors;
}

export default createSurveyValidator;