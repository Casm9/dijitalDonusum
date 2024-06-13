import { API_URL } from '../config';

export async function fetchQuestions() {
    try {

        const response = await fetch(API_URL);
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
}
