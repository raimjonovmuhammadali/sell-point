<template>
  <section class="w-[90%] mx-auto py-10 px-4 md:px-8">
    <div class="flex flex-col md:flex-row gap-10">
      <!-- Rasm va izohlar chap tomonda -->
      <div class="md:w-2/3">
        <!-- Mahsulot rasmi -->
        <div class="w-full flex justify-center items-center mb-6">
          <img
            :src="product.image"
            :alt="product.title"
            class="rounded-lg shadow-lg w-full max-w-2xl h-auto object-cover"
          />
        </div>

        <!-- Izohlar -->
        <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Foydalanuvchi izohlari</h2>
          <div v-if="feedbacks.length === 0" class="text-gray-500">Izohlar mavjud emas.</div>
          <div
            v-for="(feedback, index) in feedbacks"
            :key="index"
            class="mb-6 border-b pb-4"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-700 font-semibold">{{ feedback.user }}</span>
              <div class="flex text-yellow-400">
                <svg
                  v-for="i in 5"
                  :key="i"
                  class="w-5 h-5"
                  :class="{ 'text-yellow-400': i <= feedback.rating, 'text-gray-300': i > feedback.rating }"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2
                      9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
              </div>
            </div>
            <span class="text-gray-400 font-semibold text-[12px]">{{ feedback.date }}</span>
            <p class="text-gray-600">{{ feedback.comment }}</p>
          </div>
        </div>
      </div>

      <!-- Tafsilotlar o‘ng tomonda -->
      <div class="md:w-1/3">
        <!-- Breadcrumb va tafsilotlar -->
        <nav class="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-2">
            <li>
              <nuxt-link to="/" class="hover:text-green-600 font-semibold">Bosh sahifa</nuxt-link>
              <span class="text-gray-300 mx-2">/</span>
            </li>
            <li v-if="category">
              <nuxt-link
                :to="`/category/${category.id}`"
                class="hover:text-green-600 font-semibold truncate max-w-[150px] block"
                :title="category.name"
              >
                {{ category.name }}
              </nuxt-link>
              <span class="text-gray-300 mx-2">/</span>
            </li>
            <li class="text-gray-700 font-semibold truncate max-w-[200px]" :title="product.title">
              {{ product.title }}
            </li>
          </ol>
        </nav>

        <div v-if="loading" class="text-center text-gray-500 text-lg py-10">Yuklanmoqda...</div>
        <div v-else-if="error" class="text-center text-red-500 text-lg py-10">{{ error }}</div>
        <div v-else>
          <h1 class="text-2xl font-extrabold text-gray-900 mb-4">{{ product.title }}</h1>

          <div class="mb-6">
            <p class="text-gray-400 line-through text-lg">{{ product.price + 10000 }} so‘m</p>
            <p class="text-3xl font-extrabold text-green-600">{{ product.price }} so‘m</p>
          </div>

          <p class="text-gray-700 leading-relaxed mb-6">
            {{ product.description || "Ushbu mahsulot haqida hozircha tavsif mavjud emas." }}
          </p>

          <div class="flex gap-4 items-center mb-4">
            <button
              @click="buyNow"
              class="flex-1 bg-[#E6E8ED] text-black py-3 rounded-lg shadow-md transition"
              type="button"
            >
              1 bosishda xarid qiling
            </button>

            <button
              @click="toggleFavorite"
              class="p-3 rounded-lg shadow-md bg-[#E6E8ED] text-black transition"
              aria-label="Yoqtirishlarga qo‘shish"
              type="button"
            >
              <svg
                v-if="isFavorite"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                class="w-6 h-6"
              >
                <path d="M12 21.35l-1.45-1.32C5.4..."/>
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                viewBox="0 0 24 24"
                class="w-6 h-6"
              >
                <path d="M20.84 4.61c-1.54-1.35..."/>
              </svg>
            </button>
          </div>

          <button
            @click="addToCart"
            class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-lg shadow-lg transition"
            type="button"
          >
            Savatga qo‘shish
          </button>
        </div>
      </div>
    </div>
    <layouts-similar/>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const BASE_URL = 'https://market111.pythonanywhere.com/'

const product = ref({})
const category = ref(null)
const feedbacks = ref([])
const loading = ref(true)
const error = ref(null)
const isFavorite = ref(false)

// Mahsulotni yuklash
const fetchProduct = async (id) => {
  loading.value = true
  error.value = null
  try {
    const res = await fetch(`${BASE_URL}products/${id}/`)
    if (!res.ok) throw new Error('Mahsulot topilmadi')
    const data = await res.json()
    product.value = data

    const catRes = await fetch(`${BASE_URL}categories/${data.category}`)
    if (catRes.ok) category.value = await catRes.json()

    await fetchComments(data.id)
  } catch (err) {
    error.value = 'Mahsulotni yuklashda xatolik yuz berdi!'
  } finally {
    loading.value = false
  }
}

// Foydalanuvchi ismini olish
const fetchUserName = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}profiles/${userId}/`)
    if (!res.ok) throw new Error()
    const data = await res.json()
    return data.full_name || `Foydalanuvchi #${userId}`
  } catch {
    return `Foydalanuvchi #${userId}`
  }
}

// Izohlarni yuklash
const fetchComments = async (productId) => {
  try {
    const res = await fetch(`${BASE_URL}comments/`)
    const data = await res.json()
    const filtered = data.filter(item => item.product === productId)

    const enriched = await Promise.all(
      filtered.map(async (item) => {
        const userName = await fetchUserName(item.user)
        return {
          comment: item.text,
          rating: item.grade,
          date: new Date(item.created_date).toLocaleDateString('uz-UZ', {
            day: 'numeric',
            month: 'long',
          }),
          user: userName
        }
      })
    )
    feedbacks.value = enriched
  } catch (err) {
    console.error('Izohlarni olishda xatolik:', err)
  }
}

// Boshqa funksiya va tugmalar
const toggleFavorite = () => isFavorite.value = !isFavorite.value
const addToCart = () => alert(`${product.value.title} savatga qo'shildi!`)
const buyNow = () => alert(`Xarid qilish uchun: ${product.value.title}`)

onMounted(() => {
  fetchProduct(route.params.id)
})
</script>
