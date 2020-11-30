import { ISurveyItem } from "../../stores/surveys/surveyItem";

interface FormValue {
  question?: string
  questions?: Array<{
    option?: string,
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

    let optionsError: string = '';

    if (!question.options || !question.options.length) {
      optionsError = 'Answers is required';
    }

    if (optionsError) {
      errors.questions.push({
        option: optionsError,
      });
    } else {
      errors.questions.push({});
    }
  });

  return errors;
}

export default createSurveyValidator;