<template>
  <section class="w-[90%] mx-auto py-10 px-4 md:px-8">
    <h1 class="text-3xl font-bold mb-8">Savat</h1>

    <div v-if="loading" class="text-gray-500">Yuklanmoqda...</div>
    <div v-else-if="cartItems.length === 0" class="text-gray-500 text-lg">Savat bo‘sh.</div>

    <div v-else>
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-sm"
      >
        <div class="flex items-center gap-4">
          <img :src="item.product.image" alt="Mahsulot rasmi" class="w-20 h-20 object-cover rounded" />
          <div>
            <h2 class="text-lg font-semibold">{{ item.product.title }}</h2>
            <p class="text-gray-600">{{ item.product.price }} so‘m</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button @click="updateQuantity(item, item.quantity - 1)" class="px-2 py-1 bg-gray-200 rounded">-</button>
          <span class="min-w-[20px] text-center">{{ item.quantity }}</span>
          <button @click="updateQuantity(item, item.quantity + 1)" class="px-2 py-1 bg-gray-200 rounded">+</button>
        </div>

        <div class="text-right">
          <p class="font-semibold">{{ item.product.price * item.quantity }} so‘m</p>
          <button @click="removeItem(item.id)" class="text-red-500 text-sm hover:underline">O‘chirish</button>
        </div>
      </div>

      <div class="mt-10 text-right">
        <p class="text-xl font-bold mb-4">Umumiy: {{ total }} so‘m</p>
        <button
          @click="checkout"
          class="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg shadow-lg"
        >
          Xarid qilish
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const cartItems = ref([])
const loading = ref(true)

const fetchCart = async () => {
  loading.value = true
  try {
    const res = await fetch(`${BASE_URL}/cartItems/`)
    if (!res.ok) throw new Error('Xatolik')
    const data = await res.json()
    cartItems.value = data
  } catch (err) {
    console.error('Savatni olishda xatolik:', err)
    cartItems.value = []
  } finally {
    loading.value = false
  }
}

const updateQuantity = async (item, newQuantity) => {
  if (newQuantity < 1) return
  try {
    await fetch(`${BASE_URL}/cartItems/${item.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer TOKEN' // Agar kerak bo‘lsa
      },
      body: JSON.stringify({ quantity: newQuantity }),
    })
    item.quantity = newQuantity
  } catch (err) {
    console.error('Miqdor yangilashda xatolik:', err)
  }
}

const removeItem = async (id) => {
  try {
    await fetch(`${BASE_URL}/cartItems/${id}/`, {
      method: 'DELETE',
      // headers: { 'Authorization': 'Bearer TOKEN' },
    })
    cartItems.value = cartItems.value.filter((item) => item.id !== id)
  } catch (err) {
    console.error('O‘chirishda xatolik:', err)
  }
}

const total = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
)

const checkout = () => {
  alert('Xaridingiz uchun rahmat!')
  // Bu yerda to‘lov sahifasiga redirect qilish yoki yakunlash mumkin
}

onMounted(() => {
  fetchCart()
})
</script>
