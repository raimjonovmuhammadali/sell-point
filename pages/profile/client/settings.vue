<script setup>
import { ref, watchEffect } from 'vue'
import { useProfile } from '@/composables/useProfile'

const { profile, error, loading, getProfile } = await useProfile()

const form = ref({
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  birth_date: '',
  gender: '',
  address: '',
  description: '',
  card: ''
})

// profile o‘zgarganda formni to‘ldirish
watchEffect(() => {
  if (profile.value) {
    form.value = {
      username: profile.value.username || '',
      first_name: profile.value.first_name || '',
      last_name: profile.value.last_name || '',
      email: profile.value.email || '',
      phone: profile.value.phone || '',
      birth_date: profile.value.birth_date || '',
      gender: profile.value.gender || '',
      address: profile.value.address || '',
      description: profile.value.description || '',
      card: profile.value.card || ''
    }
  }
})

const updateProfile = async () => {
  try {
    const token = localStorage.getItem('access_token')
    if (!token) {
      alert('Token topilmadi.')
      return
    }

    const res = await fetch(`${BASE_URL}profile/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form.value)
    })

    if (!res.ok) {
      const errData = await res.json()
      alert('Xatolik yuz berdi: ' + JSON.stringify(errData))
      return
    }

    alert('Maʼlumotlar muvaffaqiyatli yangilandi.')
    await getProfile()
  } catch (e) {
    alert('Tizimda xatolik yuz berdi.')
  }
}
</script>

<template>
  <section id="settings" class="w-full p-6 sm:p-8 lg:p-12 flex flex-col md:flex-row justify-between gap-5">
    <aside class="w-full md:w-64 bg-white shadow-md p-6 rounded-md">
        <nav class="space-y-4">
          <nuxt-link
            to="./"
            class="block text-gray-700 hover:bg-gray-200 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
            :class="{ 'bg-gray-200': $route.path === './' }"
          >
            Buyurtmalarim
          </nuxt-link>
          <nuxt-link
            to="./reviews"
            class="block text-gray-700 hover:bg-gray-200 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
            :class="{ 'bg-gray-200': $route.path === './reviews' }"
          >
            Sharhlar
          </nuxt-link>
          <nuxt-link
            to="./settings"
            class="block text-gray-700 hover:bg-gray-200 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
            :class="{ 'bg-gray-200': $route.path === './profile' }"
          >
            Ma'lumotlarim
          </nuxt-link>
        </nav>
      </aside>
      
      <div class="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-8">Sozlamalar</h1>
      <h2 class="text-xl font-semibold text-gray-800 mb-6">Hisob Sozlamalari</h2>

      <form @submit.prevent="updateProfile" class="grid gap-6 sm:grid-cols-2">
        <div class="sm:col-span-1" v-for="(value, key) in form" :key="key">
          <label :for="key" class="block text-sm font-medium text-gray-700 mb-1">
            {{
              key === 'birth_date'
                ? 'Tug‘ilgan sana'
                : key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')
            }}
          </label>

          <input
            v-if="key !== 'birth_date'"
            :id="key"
            v-model="form[key]"
            type="text"
            :placeholder="key.replace('_', ' ')"
            class="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-indigo-500 focus:outline-none"
          />

          <input
            v-else
            type="date"
            :id="key"
            v-model="form[key]"
            class="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div class="sm:col-span-2 mt-4">
          <button
            type="submit"
            class="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Saqlash
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
