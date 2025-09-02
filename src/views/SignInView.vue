<template>
  <div class="signin-container">
    <div class="signin-card">
      <h1>{{ $t('auth.signIn') }}</h1>
      <form @submit="onSubmit" class="signin-form">
        <div class="form-group">
          <label for="email">{{ $t('auth.email') }}</label>
          <input
            id="email"
            v-model="email"
            type="email"
            :disabled="loading"
            :placeholder="$t('auth.emailPlaceholder')"
            :class="{ 'error': emailError }"
            @blur="validateEmail"
          />
          <span v-if="emailError" class="field-error">{{ emailError }}</span>
        </div>
        <div class="form-group">
          <label for="password">{{ $t('auth.password') }}</label>
          <input
            id="password"
            v-model="password"
            type="password"
            :disabled="loading"
            :placeholder="$t('auth.passwordPlaceholder')"
            :class="{ 'error': passwordError }"
            @blur="validatePassword"
          />
          <span v-if="passwordError" class="field-error">{{ passwordError }}</span>
        </div>
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        <button type="submit" :disabled="loading || !isFormValid" class="signin-btn">
          {{ loading ? $t('auth.signingIn') : $t('auth.signIn') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import { object, string } from 'yup'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const { t } = useI18n()

const loading = ref(false)
const error = ref('')

const validationSchema = object({
  email: string()
    .required(t('auth.emailRequired'))
    .email(t('auth.emailInvalid')),
  password: string()
    .required(t('auth.passwordRequired'))
    .min(6, t('auth.passwordMinLength'))
})

const { handleSubmit } = useForm({
  validationSchema
})

const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

const isFormValid = computed(function isFormValid() {
  return email.value &&
         password.value &&
         !emailError.value &&
         !passwordError.value
})

function validateEmail() {
  try {
    validationSchema.fields.email.validateSync(email.value)
  } catch (err) {
    // Error is handled by useField
  }
}

function validatePassword() {
  try {
    validationSchema.fields.password.validateSync(password.value)
  } catch (err) {
    // Error is handled by useField
  }
}

const onSubmit = handleSubmit(async function onSubmit(values) {
  loading.value = true
  error.value = ''

  try {
    await authStore.signIn(values.email, values.password);
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.message || t('auth.signInFailed')
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.signin-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.signin-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.signin-card h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.signin-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #555;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.form-group input:disabled {
  background-color: #f8f9fa;
  opacity: 0.6;
}

.form-group input.error {
  border-color: #dc3545;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
}

.field-error {
  color: #dc3545;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: block;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  text-align: center;
}

.signin-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.signin-btn:hover:not(:disabled) {
  background-color: #0056b3;
}

.signin-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
</style>
