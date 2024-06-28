<template>
    <div class="question-container">
        <div class="quiz-info">
            <span class="question">{{ question.question }}</span>
        </div>
        <div class="options">
            <label v-for="(option, index) in question.options" :key="index" :class="`option ${question.selected === index ? 'green' : ''}`">
                <input type="radio" :name="question.index" :value="index" v-model="question.selected" @change="handleAnswerChange">
                <span>{{ option }}</span>
            </label>
        </div>
    </div>
</template>

<script setup>

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
