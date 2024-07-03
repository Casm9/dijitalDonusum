<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card class="pa-4">
                    <section v-if="!quizCompleted">
                        <Question :question="getCurrentQuestion" :setAnswer="setAnswer" />
                        <v-btn color="success" @click="nextQuestion" :disabled="getCurrentQuestion.selected === null">{{ 'Bir sonraki soru' }}</v-btn>
                    </section>
                    <section v-else >
                        <h1 class="text-center completed">{{ resultData.title }}</h1>
                        <h2 class="completed">{{ resultData.subtitle }}</h2>
                        <div class="completed" v-html="formattedDescription"></div>
                        <ul class="completed" v-html="formattedContent"></ul>
                    </section>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { fetchQuestions, fetchResult, updateSelected, evaluateResult } from '../services/api';
import Question from './Question.vue';
import Swal from 'sweetalert2';

const props = defineProps({
    userEmail: {
        type: String,
        required: true
    }
});

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
    updateSelected(questions.value[currentQuestion.value].id, selectedOptionIndex, props.userEmail);
};

const nextQuestion = async () => {
    if (currentQuestion.value < questions.value.length - 1) {
        currentQuestion.value++;
    }
    else {
        const selectedOptions = questions.value.map(q => q.options[q.selected]);
        resultData.value = await evaluateResult(selectedOptions);

        Swal.fire({
            title: "Tebrikler!",
            text: "Testi başarı ile tamamladın.",
            icon: "success",
            confirmButtonText: "Tamam"
        }).then(() => quizCompleted.value = true);
    }
};

const formattedContent = computed(() => {
    if(!resultData.value) return '';

    const items = resultData.value.content.split('\n');
    const markedItems = items.map((item, index) => `<li>${index + 1}. ${item}</li>`);

    return markedItems.join('');
});

const formattedDescription = computed(() => {
    return resultData.value ? resultData.value.description.replace(/\n/g, '<br>') : '';
});

</script>
