<template>
    <div class="question-container">
        <div class="quiz-info">
            <span class="question">{{ question.question }}</span>
        </div>

        <div class="options">
            <label v-for="(option, index) in question.options" :key="index"
            :class="`option ${question.selected === index ? (question.selected === question.answer ? 'correct' : 'correct') : 'disabled'}`">
                <input type="radio" :name="question.index" :value="index" v-model="question.selected"
                    :disabled="question.selected !== null" @change="handleAnswerChange">
                <span>{{ option }}</span>
            </label>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    question: Object,
    setAnswer: Function
});

const emit = defineEmits(['answer-updated']);

const handleAnswerChange = (event) => {
    props.setAnswer(event);
    emit('answer-updated', props.question.id, parseInt(event.target.value));
};

</script>
