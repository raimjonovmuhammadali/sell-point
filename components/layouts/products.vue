<template>
  <div class="container mx-auto px-4 pb-12">
    <!-- Breadcrumb -->
    <div class="flex flex-wrap gap-1 mb-4 text-[12px] text-gray-600">
      <nuxt-link to="/" class="text-blue-500 hover:underline">Bosh sahifa</nuxt-link>
      <span>/</span>
      <span>{{ displayCategoryName ? displayCategoryName : ' '}}</span>
    </div>

    <!-- Sarlavha -->
    <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
      {{ displayCategoryName ? displayCategoryName : ' '}}
    </h2>

    <!-- Mahsulotlar -->
    <div v-if="loading" class="text-center text-gray-500">Yuklanmoqda...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else-if="products.length === 0" class="text-center text-gray-500">Mahsulotlar topilmadi</div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      <div
        v-for="product in products"
        :key="product.id"
        class="group flex flex-col gap-2 overflow-hidden"
      >
        <nuxt-link :to="`/product/${product.id}`">
          <img
            :src="getImageUrl(product.image)"
            :alt="product.title"
            class="rounded-lg w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </nuxt-link>

        <nuxt-link
          :to="`/product/${product.id}`"
          class="text-xs sm:text-sm text-gray-800 font-semibold hover:text-green-600 transition-colors"
        >
          {{ product.title }}
        </nuxt-link>

        <div class="flex items-center gap-1 mb-1">
          <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
          <p class="text-[10px] text-gray-400">4.8 (4 izoh)</p>
        </div>

        <div class="flex justify-between items-center">
          <div>
            <p class="font-bold text-[10px] text-gray-500 line-through">{{ formatPrice(product.price + 10000) }} so‘m</p>
            <p class="font-bold text-xs">{{ formatPrice(product.price) }} so‘m</p>
          </div>
          <div class="p-1 border border-gray-400 rounded-full cursor-pointer hover:bg-gray-200">
            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'


const route = useRoute()

const categories = ref([])
const products = ref([])
const loading = ref(false)
const errorMessage = ref(null)   // error -> errorMessage

const selectedCategoryId = computed(() => {
  const id = Number(route.params.id)
  return isNaN(id) ? null : id
})

const displayCategoryName = computed(() => {
  if (!selectedCategoryId.value) return "Eng mashhurlar"
  const cat = categories.value.find(c => c.id === selectedCategoryId.value)
  return cat ? cat.name : "Eng mashhurlar"
})

const getImageUrl = (imgPath) => {
  if (!imgPath) return '/placeholder.png'
  return `${BASE_URL}${imgPath}`
}

const formatPrice = (price) => {
  if (typeof price !== 'number') return price
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

const fetchCategories = async () => {
  loading.value = true
  errorMessage.value = null
  try {
    const res = await fetch(`${BASE_URL}categories/`)
    if (!res.ok) throw new Error('Serverdan javob kelmadi')
    categories.value = await res.json()
  } catch (e) {
    errorMessage.value = "Kategoriyalarni yuklashda xatolik yuz berdi!"
  } finally {
    loading.value = false
  }
}

const fetchProducts = async (categoryId = null) => {
  loading.value = true
  errorMessage.value = null
  try {
    let url = `${BASE_URL}products/`
    if (categoryId) url += `?category=${categoryId}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Serverdan javob kelmadi')
    const data = await res.json()
    products.value = data.results ?? data
  } catch (e) {
    errorMessage.value = "Mahsulotlarni yuklashda xatolik yuz berdi!"
    products.value = []
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchCategories()
  await fetchProducts(selectedCategoryId.value)
})

watch(() => route.params.id, async () => {
  await fetchProducts(selectedCategoryId.value)
})
</script>
