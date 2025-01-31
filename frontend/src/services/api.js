import { API_URL_QUESTIONS, API_URL_RESULT, API_URL_SUBMIT_FORM, API_URL_EVALUATE_RESULT } from '../config';

export async function fetchQuestions() {
  try {

    const response = await fetch(API_URL_QUESTIONS);
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();


    return data.map(question => ({
      ...question,
      options: question.options.map(option => option.option_text)
    }));


  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};

export async function fetchResult() {
  try {
    const response = await fetch(API_URL_RESULT);
    if (!response.ok) throw new Error('Network response was not ok');

    return await response.json();

  } catch (error) {
    console.error('Error fetching template:', error);
    return null;
  }
};

export async function fetchSubmitForm(formData) {
  try {
    const response = await fetch(API_URL_SUBMIT_FORM, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    return await response.json();

  } catch (error) {
    console.error('Error submitting form:', error);
    return { success: false };
  }
};

export async function updateSelected(questionId, selectedOptionIndex, email) {

  try {
      const response = await fetch(`${API_URL_QUESTIONS}/${questionId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: questionId, selected: selectedOptionIndex, email })
      });

     return await response.json();

  } catch (error) {
      console.error('Error updating selected value on backend:', error);
  }

};

export async function evaluateResult(selectedOptions) {
  try {
      const response = await fetch(API_URL_EVALUATE_RESULT, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selectedOptions }),
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();

  } catch (error) {
      console.error('Error evaluating selected options:', error);
      return null;
  }
};