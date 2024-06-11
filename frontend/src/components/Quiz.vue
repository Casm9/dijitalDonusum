<template>
    <section v-if="!quizCompleted">
        <Question :question="getCurrentQuestion" :setAnswer="setAnswer" />
        <button @click="nextQuestion" :disabled="getCurrentQuestion.selected === null">{{ 'Bir sonraki soru' }}</button>
    </section>
    <section v-else>
        <h2>Sorular Bitti.</h2>
    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { fetchQuestions } from '../services/api';
import Question from './Question.vue';


const questions = ref([]);
const quizCompleted = ref(false);
const currentQuestion = ref(0);


onMounted(async () => {
    questions.value = await fetchQuestions();
});


const getCurrentQuestion = computed(() => {
    if (questions.value.length === 0 || !questions.value[currentQuestion.value]) {
        return {
            question: '',
            options: [],
            selected: null,
            index: 0
        };
    }
    let question = questions.value[currentQuestion.value];
    question.index = currentQuestion.value;
    return question;
});


const setAnswer = (event) => {
    questions.value[currentQuestion.value].selected = event.target.value;
    event.target.value = null;
};

const nextQuestion = () => {
    if (currentQuestion.value < questions.value.length - 1) {
        currentQuestion.value++;
    } else {
        quizCompleted.value = true;
    }
};
</script>