<template>
    <div class="form-container">
        <h2>Lütfen aşağıdaki şirket yetkilisi bilgilerini doldurunuz.</h2>
        <v-form @submit.prevent="handleSubmit">
            <v-text-field label="Ad:" v-model="formData.name" :error-messages="nameError">
            </v-text-field>
            <v-text-field label="Soyad:" v-model="formData.surname" :error-messages="surnameError">
            </v-text-field>
            <v-text-field label="E-posta:" v-model="formData.email" :error-messages="emailError">
            </v-text-field>
            <v-text-field label="Telefon Numarası:" v-model="formData.telno" :error-messages="telnoError">
            </v-text-field>
            <v-btn color="success" type="submit" :disabled="!isFormValid">Gönder</v-btn>
        </v-form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { fetchSubmitForm } from '../services/api';
import Swal from 'sweetalert2';


const emit = defineEmits(['formSubmitted']);

const formData = ref({
    name: '',
    surname: '',
    email: '',
    telno: ''
});

const nameError = computed(() => {
    if (!formData.value.name) return 'İsim gerekli.';
    return '';
});

const surnameError = computed(() => {
    if (!formData.value.surname) return 'Soy isim gerekli.';
    return '';
});

const emailError = computed(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.value.email) return 'E-posta gerekli.';
    if (!emailPattern.test(formData.value.email)) return 'Geçersiz e-posta adresi.';
    return '';
});

const telnoError = computed(() => {
    if (!formData.value.telno) return 'Telefon numarası gerekli.';
    return '';
});

const isFormValid = computed(() => {
    return !nameError.value && !surnameError.value && !emailError.value;
});

const submitForm = async () => {
    try {
        const response = await fetchSubmitForm(formData.value);
        if (response.success) {
            formData.value = { name: '', surname: '', email: '', telno: '' };
        } else {
            Swal.fire({
                title: "Hay aksi!",
                text: "Formu gönderirken bir hata oluştu.",
                icon: "error",
                confirmButtonText: "Tamam"
            });
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};


const handleSubmit = async () => {
    if (isFormValid.value) {
        try {
            const response = await fetchSubmitForm(formData.value);

            if (response && response.success) {
                Swal.fire({
                    title: "Tebrikler!",
                    text: "Form başarı ile gönderildi.",
                    icon: "success",
                    confirmButtonText: "Tamam"
                });
                emit('formSubmitted');
                console.log('Form submitted successfully');
            } else {
                console.error('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }

    } else {
        console.error('Form is invalid');
    }

};

</script>