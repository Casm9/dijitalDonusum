<script setup>
import Quiz from './components/Quiz.vue';
import Form from './components/Form.vue';
import { ref } from 'vue';
import './assets/style.css';

const formSubmitted = ref(false);
const userEmail = ref('');

const handleFormSubmitted = (email) => {
  userEmail.value = email;
  formSubmitted.value = true;
};

</script>

<template>
  <main class="app">
    <h1 class="text-center primary--text">Dijital Dönüşüm</h1>
    <Form v-if="!formSubmitted" @formSubmitted="handleFormSubmitted" />
    <Quiz v-else :user-email="userEmail" />
  </main>
</template>
