<template>
    <section v-if="!quizCompleted">
        <Question :question="getCurrentQuestion" :setAnswer="setAnswer" />
        <button @click="nextQuestion" :disabled="getCurrentQuestion.selected === null">{{ 'Bir sonraki soru' }}</button>
    </section>
    <section v-else class="completed">
        <h1 class="completed">İşini Dijitalde Büyüt</h1>
        <h2 class="completed">BULUT ÇÖZÜMÜ</h2>
        <p class="completed">Sanal Veri Merkezi</p>
        <h2 class="completed">GÜVENLİK ÇÖZÜMÜ</h2>
        <p class="completed">5651 Loglama</p>
        <p class="completed">Firewall (Güvenlik Duvarı Servisleri)</p>
        <p class="completed">DDOS</p>
    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { fetchQuestions } from '../services/api';
import Question from './Question.vue';
import Swal from 'sweetalert2'


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
    const question = questions.value[currentQuestion.value];
    //question.index = currentQuestion.value;
    //return question;
    return { ...question, index: currentQuestion.value };
});


const setAnswer = (event) => {
    questions.value[currentQuestion.value].selected = parseInt(event.target.value);
    event.target.value = null;
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
</script>