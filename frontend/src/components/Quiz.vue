<template>
    <section v-if="!quizCompleted">
        <Question :question="getCurrentQuestion" :setAnswer="setAnswer" @answer-updated="updateSelectedOnBackend" />
        <v-btn color="success" @click="nextQuestion" :disabled="getCurrentQuestion.selected === null">{{ 'Bir sonraki soru' }}</v-btn>
    </section>
    <section v-else class="completed">
        <h1 class="completed">{{ resultData.title }}</h1>
        <h2 class="completed">{{ resultData.subtitle }}</h2>
        <p class="copmpleted">{{ resultData.content }}</p>
        <div class="completed" v-html="formattedContent"></div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, defineProps, defineEmits  } from 'vue';
import { fetchQuestions, fetchResult } from '../services/api';
import { API_URL_QUESTIONS } from '../config.js';
import Question from './Question.vue';
import Swal from 'sweetalert2';


const emit = defineEmits(['answer-updated']);

const questions = ref([]);
const quizCompleted = ref(false);
const currentQuestion = ref(0);
const resultData = ref(null);


onMounted(async () => {
    questions.value = await fetchQuestions();
    resultData.value = await fetchResult();
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
    const question = questions.value[currentQuestion.value];
    return { ...question, index: currentQuestion.value };
});


const setAnswer = (event) => {

    const selectedOptionIndex = parseInt(event.target.value);
    questions.value[currentQuestion.value].selected = selectedOptionIndex;
    //event.target.value = null;
    updateSelectedOnBackend(questions.value[currentQuestion.value].id, selectedOptionIndex);
};

const nextQuestion = () => {
    if (currentQuestion.value < questions.value.length - 1) {
        currentQuestion.value++;
    }
    else {
        Swal.fire({
            title: "Tebrikler!",
            text: "Testi başarı ile tamamladın.",
            icon: "success",
            confirmButtonText: "Tamam"
        }).then(() => quizCompleted.value = true);
    }
};

const updateSelectedOnBackend = async (questionId, selectedOptionIndex) => {

    try {
        const response = await fetch(`${API_URL_QUESTIONS}/${questionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ selected: selectedOptionIndex })
        });

        const data = await response.json();


    } catch (error) {
        console.error('Error updating selected value on backend:', error);
    }

};

const formattedContent = computed(() => {
    return resultData.value ? resultData.value.content.replace(/\n/g, '<br>') : '';
});

</script>
