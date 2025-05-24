<template>
  <section class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-6 text-center">Ro‘yxatdan o‘tish</h1>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Foydalanuvchi nomi</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            class="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            placeholder="Foydalanuvchi nomini kiriting"
            aria-label="Foydalanuvchi nomi"
            required
          />
          <p v-if="errors.username" class="mt-1 text-xs text-red-600">{{ errors.username }}</p>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Parol</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            placeholder="Parolni kiriting"
            aria-label="Parol"
            required
          />
          <p v-if="errors.password" class="mt-1 text-xs text-red-600">{{ errors.password }}</p>
        </div>
        <div>
          <label for="first_name" class="block text-sm font-medium text-gray-700">Ism</label>
          <input
            id="first_name"
            v-model="form.first_name"
            type="text"
            class="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            placeholder="Ismingizni kiriting"
            aria-label="Ism"
            required
          />
          <p v-if="errors.first_name" class="mt-1 text-xs text-red-600">{{ errors.first_name }}</p>
        </div>
        <div>
          <label for="last_name" class="block text-sm font-medium text-gray-700">Familiya</label>
          <input
            id="last_name"
            v-model="form.last_name"
            type="text"
            class="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            placeholder="Familiyangizni kiriting"
            aria-label="Familiya"
            required
          />
          <p v-if="errors.last_name" class="mt-1 text-xs text-red-600">{{ errors.last_name }}</p>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            placeholder="Email manzilingizni kiriting"
            aria-label="Email"
            required
          />
          <p v-if="errors.email" class="mt-1 text-xs text-red-600">{{ errors.email }}</p>
        </div>
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700">Telefon raqami</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            class="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            placeholder="Telefon raqamingizni kiriting"
            aria-label="Telefon raqami"
            required
          />
          <p v-if="errors.phone" class="mt-1 text-xs text-red-600">{{ errors.phone }}</p>
        </div>
        <div>
          <label for="birth_date" class="block text-sm font-medium text-gray-700">Tug‘ilgan sana</label>
          <input
            id="birth_date"
            v-model="form.birth_date"
            type="date"
            class="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            aria-label="Tug‘ilgan sana"
            required
          />
          <p v-if="errors.birth_date" class="mt-1 text-xs text-red-600">{{ errors.birth_date }}</p>
        </div>
        <div>
          <label for="role" class="block text-sm font-medium text-gray-700">Rol</label>
          <select
            id="role"
            v-model="form.role"
            class="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            aria-label="Rol tanlash"
            required
          >
            <option value="seller">Sotuvchi</option>
            <option value="client">Mijoz</option>
          </select>
          <p v-if="errors.role" class="mt-1 text-xs text-red-600">{{ errors.role }}</p>
        </div>
        <div>
          <label for="gender" class="block text-sm font-medium text-gray-700">Jins</label>
          <select
            id="gender"
            v-model="form.gender"
            class="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            aria-label="Jins tanlash"
            required
          >
            <option value="erkak">Erkak</option>
            <option value="ayol">Ayol</option>
          </select>
          <p v-if="errors.gender" class="mt-1 text-xs text-red-600">{{ errors.gender }}</p>
        </div>
        <div>
          <label for="address" class="block text-sm font-medium text-gray-700">Manzil</label>
          <input
            id="address"
            v-model="form.address"
            type="text"
            class="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            placeholder="Manzilingizni kiriting"
            aria-label="Manzil"
            required
          />
          <p v-if="errors.address" class="mt-1 text-xs text-red-600">{{ errors.address }}</p>
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Tavsif</label>
          <textarea
            id="description"
            v-model="form.description"
            class="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 min-h-[100px]"
            placeholder="O‘zingiz haqingizda qisqacha tavsif"
            aria-label="Tavsif"
          ></textarea>
          <p v-if="errors.description" class="mt-1 text-xs text-red-600">{{ errors.description }}</p>
        </div>
        <div>
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-sm font-medium"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Yuborilmoqda...' : 'Ro‘yxatdan o‘tish' }}
          </button>
        </div>
      </form>
      <p v-if="errorMessage" class="mt-4 text-sm text-red-600 text-center">{{ errorMessage }}</p>
      <p class="mt-4 text-sm text-gray-600 text-center">
        Hisobingiz bormi? <nuxt-link to="/login" class="text-indigo-600 hover:text-indigo-800 font-medium">Kirish</nuxt-link>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form data
const form = ref({
  username: '',
  password: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  birth_date: '',
  role: 'client',
  gender: 'erkak',
  address: '',
  description: ''
})

// Error handling
const errors = ref({})
const errorMessage = ref('')
const isSubmitting = ref(false)

// Form validation
const validateForm = () => {
  errors.value = {}
  let isValid = true

  if (!form.value.username) {
    errors.value.username = 'Foydalanuvchi nomi kiritilishi shart'
    isValid = false
  }
  if (!form.value.password) {
    errors.value.password = 'Parol kiritilishi shart'
    isValid = false
  }
  if (!form.value.first_name) {
    errors.value.first_name = 'Ism kiritilishi shart'
    isValid = false
  }
  if (!form.value.last_name) {
    errors.value.last_name = 'Familiya kiritilishi shart'
    isValid = false
  }
  if (!form.value.email || !/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'To‘g‘ri email manzili kiriting'
    isValid = false
  }
  if (!form.value.phone) {
    errors.value.phone = 'Telefon raqami kiritilishi shart'
    isValid = false
  }
  if (!form.value.birth_date) {
    errors.value.birth_date = 'Tug‘ilgan sana kiritilishi shart'
    isValid = false
  }
  if (!form.value.role) {
    errors.value.role = 'Rol tanlanishi shart'
    isValid = false
  }
  if (!form.value.gender) {
    errors.value.gender = 'Jins tanlanishi shart'
    isValid = false
  }
  if (!form.value.address) {
    errors.value.address = 'Manzil kiritilishi shart'
    isValid = false
  }

  return isValid
}

// Form submission
const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const response = await fetch('https://market111.pythonanywhere.com/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    if (response.ok) {
      alert('Ro‘yxatdan o‘tish muvaffaqiyatli amalga oshirildi!')
      router.push('./login') // Redirect to login page after successful registration
    } else {
      const errorData = await response.json()
      errorMessage.value = errorData.message || 'Ro‘yxatdan o‘tishda xato yuz berdi!'
    }
  } catch (error) {
    console.error('API so‘rovida xato:', error)
    errorMessage.value = 'Server bilan bog‘lanishda muammo yuz berdi!'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Additional styles for form elements */
textarea {
  resize: vertical;
  min-height: 100px;
}
</style>