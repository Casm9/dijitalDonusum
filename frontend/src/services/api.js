import { API_URL } from '../config';

export async function fetchQuestions() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');

        return await response.json();
        
    } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    }
}
