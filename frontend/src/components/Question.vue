<template>
    <div class="question-container">
        <div class="quiz-info">
            <span class="question">{{ question.question }}</span>
        </div>

        <div class="options">
            <label v-for="(option, index) in question.options" :key="index"
                :class="`option ${question.selected == index ? index == question.answer ? 'correct' : 'correct' : ''} ${question.selected != null && index != question.selected ? 'disabled' : ''}`">
                <input type="radio" :name="question.index" :value="index" v-model="question.selected"
                    :disabled="question.selected !== null" @change="setAnswer">
                <span>{{ option.replace(/\[|\]|"/g,"") }}</span>
            </label>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    question: Object,
    setAnswer: Function
});
</script>