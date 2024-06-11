<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchQuestions } from './services/api';
import './assets/style.css';

const apiUrl = 'http://localhost:3000/api/questions';

const questions = ref([]);
/*
{
  question: 'İşletmenizin çalışan sayısı hangi aralıktadır?',
  answer: true,
  options: [
    '0-50',
    '51-200',
    '201+'
  ],
  selected: null
},
{
  question: 'Hangi sektörde faaliyet gösteriyorsunuz?',
  answer: true,
  options: [
    'Üretim',
    'Perakende',
    'Hizmet',
    'Diğer'
  ],
  selected: null
},
{
  question: 'Dijital Dönüşüm sürecinizde en çok karşılaştığınız ihtiyaç hangisidir?',
  answer: true,
  options: [
    'Danışman',
    'Eğitim',
    'Finansman'
  ],
  selected: null
},
*/
const quizCompleted = ref(false);

const currentQuestion = ref(0);

onMounted(async () => {
  questions.value = await fetchQuestions(apiUrl);
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

const SetAnswer = event => {
  questions.value[currentQuestion.value].selected = event.target.value;
  event.target.value = null;
};

const NextQuestion = () => {
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++;
  } else {
    quizCompleted.value = true;
  }
};

</script>

<template>
  <main class="app">
    <h1>Dijital Dönüşüm</h1>

    <section v-if="!quizCompleted">
      <div class="quiz-info">
        <span class="question">{{ getCurrentQuestion.question }}</span>
      </div>

      <div class="options">
        <label v-for="(option, index) in getCurrentQuestion.options" :key="index"
          :class="`option ${getCurrentQuestion.selected == index ? index == getCurrentQuestion.answer ? 'correct' : '' : ''} ${getCurrentQuestion.selected != null && index != getCurrentQuestion.selected ? 'disabled' : ''}`">
          <input type="radio" :name="getCurrentQuestion.index" :value="index" v-model="getCurrentQuestion.selected"
            :disabled="getCurrentQuestion.selected !== null" @change="SetAnswer">
          <span>{{ option }}</span>
        </label>
      </div>

      <button @click="NextQuestion" :disabled="getCurrentQuestion.selected === null">{{ 'Bir sonraki soru' }}</button>
    </section>
    <section v-else>
      <h2>Sorular Bitti.</h2>
    </section>
  </main>
</template>
