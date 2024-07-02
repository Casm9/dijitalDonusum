<template>
    <div class="form-container">
        <v-container>
            <v-row justify="center">
                <v-col cols="12" md="12">
                    <v-card class="pa-4">
                        <h2 class="text-center primary--text">Lütfen aşağıdaki şirket yetkilisi bilgilerini doldurunuz.
                        </h2>
                        <section v-if="!firstFormCompleted">
                            <v-form @submit.prevent="submitFirstForm">
                                <v-text-field class="mb-4" label="Ad:" v-model="formData.name"
                                    :error-messages="nameError" @focus="nameTouched = true">
                                </v-text-field>
                                <v-text-field class="mb-4" label="Soyad:" v-model="formData.surname"
                                    :error-messages="surnameError" @focus="surnameTouched = true">
                                </v-text-field>
                                <v-text-field class="mb-4" label="E-posta:" v-model="formData.email"
                                    :error-messages="emailError" @focus="emailTouched = true">
                                </v-text-field>
                                <v-text-field class="mb-4" label="Telefon Numarası:" v-model="formData.telno"
                                    :error-messages="telnoError" @focus="telnoTouched = true">
                                </v-text-field>
                                <v-btn color="success" type="submit" :disabled="!isFirstFormValid" block>İleri</v-btn>
                            </v-form>
                        </section>
                        <section v-else-if="!secondFormCompleted">
                            <v-form @submit.prevent="handleSubmit">
                                <v-text-field class="mb-4" label="Şirket:" v-model="formData.company"
                                    :error-messages="companyError" @focus="companyToched = true">
                                </v-text-field>
                                <v-text-field class="mb-4" label="Çalışan Sayısı:" v-model="formData.numOfEmployees"
                                    :error-messages="numOfEmployeesError" @focus="numOfEmployeesTouched = true">
                                </v-text-field>
                                <v-text-field class="mb-4" label="Şirketin Faaliyet Süresi:"
                                    v-model="formData.companyActivityPeriod"
                                    :error-messages="companyActivityPeriodError"
                                    @focus="companyActivityPeriodTouched = true">
                                </v-text-field>
                                <v-text-field class="mb-4" label="Şirketinizin faaliyette bulunduğu sektörü belirtiniz:"
                                    v-model="formData.companySector" :error-messages="companySectorError"
                                    @focus="companySectorTouched = true">
                                </v-text-field>
                                <v-btn color="success" type="submit" :disabled="!isSecondFormValid" block>Gönder</v-btn>
                            </v-form>
                        </section>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { fetchSubmitForm } from '../services/api';
import Swal from 'sweetalert2';

const emit = defineEmits(['formSubmitted']);

const firstFormCompleted = ref(false);
const secondFormCompleted = ref(false);

const formData = ref({
    name: '',
    surname: '',
    email: '',
    telno: '',
    company: '',
    numOfEmployees: '',
    companyActivityPeriod: '',
    companySector: ''
});

const nameTouched = ref(false);
const surnameTouched = ref(false);
const emailTouched = ref(false);
const telnoTouched = ref(false);
const companyToched = ref(false);
const numOfEmployeesTouched = ref(false);
const companyActivityPeriodTouched = ref(false);
const companySectorTouched = ref(false);

const nameError = computed(() => {
    if (nameTouched.value && !formData.value.name) return ['İsim gerekli.'];
    return '';
});

const surnameError = computed(() => {
    if (surnameTouched.value && !formData.value.surname) return ['Soy isim gerekli.'];
    return '';
});

const emailError = computed(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailTouched.value && !formData.value.email) return ['E-posta gerekli.'];
    if (emailTouched.value && !emailPattern.test(formData.value.email)) return ['Geçersiz e-posta adresi.'];
    return '';
});

const telnoError = computed(() => {
    if (telnoTouched.value && !formData.value.telno) return ['Telefon numarası gerekli.'];
    return '';
});

const isFirstFormValid = computed(() => {
    return !nameError.value && !surnameError.value && !emailError.value && !telnoError.value;
});

const submitFirstForm = async () => {
    nameTouched.value = true;
    surnameTouched.value = true;
    emailTouched.value = true;
    telnoTouched.value = true;

    if (isFirstFormValid.value) {
        firstFormCompleted.value = true;
    } else {
        console.error('First form is invalid, cannot proceed.');
    }
};

const companyError = computed(() => {
    if (companyToched.value && !formData.value.company) return ['Şirket ismi gerekli.'];
    return '';
});

const numOfEmployeesError = computed(() => {
    if (numOfEmployeesTouched.value && !formData.value.numOfEmployees) return ['Çalışan sayısı gerekli.'];
    return '';
});

const companyActivityPeriodError = computed(() => {
    if (companyActivityPeriodTouched.value && !formData.value.companyActivityPeriod) return ['Şirketin faaliyet süresi gerekli.'];
    return '';
});

const companySectorError = computed(() => {
    if (companySectorTouched.value && !formData.value.companySector) return ['Şirketin sektörünü belirtiniz.'];
    return '';
});

const isSecondFormValid = computed(() => {
    return !companyError.value && !numOfEmployeesError.value && !companyActivityPeriodError.value && !companySectorError.value;
});


const handleSubmit = async () => {
    companyToched.value = true;
    numOfEmployeesTouched.value = true;
    companyActivityPeriodTouched.value = true;
    companySectorTouched.value = true;

    if (isSecondFormValid.value) {
        secondFormCompleted.value = true;
    } else {
        console.error('Second form is invalid, cannot proceed.');
    }

    if (isSecondFormValid.value) {
        try {
            const response = await fetchSubmitForm(formData.value);
            emit('formSubmitted', formData.value.email);

            if (response && response.success) {
                Swal.fire({
                    title: "Tebrikler!",
                    text: "Form başarı ile gönderildi.",
                    icon: "success",
                    confirmButtonText: "Tamam"
                });

            } else if (response.message === 'This email has already been used.') {
                Swal.fire({
                    title: "Uyarı!",
                    text: "Bu e-posta adresi zaten kullanılmış.",
                    icon: "warning",
                    confirmButtonText: "Tamam"
                });
            }
            else {
                Swal.fire({
                    title: "Hata!",
                    text: "Teknik bir hatadan dolayı form gönderilemedi. Tekrar deneyin.",
                    icon: "error",
                    confirmButtonText: "Tamam"
                }).then(() => {
                    window.location.reload();
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            Swal.fire({
                    title: "Hata!",
                    text: "Bilinmeyen bir hata oldu tekrar deneyin.",
                    icon: "error",
                    confirmButtonText: "Tamam"
                }).then(() => {
                    window.location.reload();
                });
        }

    } else {
        console.error('Form is invalid');
    }

};

</script>
