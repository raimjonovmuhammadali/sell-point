<template>
  <div class="p-6 sm:p-8 lg:p-12">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-8">Mening Buyurtmalarim</h1>

    <!-- Empty State -->
    <div v-if="orders.length === 0" class="text-center py-12">
      <h2 class="text-2xl font-semibold text-gray-600">Buyurtmalar topilmadi</h2>
      <p class="mt-2 text-sm text-gray-500">
        Hozircha hech qanday buyurtma mavjud emas. Xarid qilishni boshlang!
      </p>
      <nuxt-link
        to="/shop"
        class="mt-4 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-sm font-medium"
      >
        Xaridlarni boshlash
      </nuxt-link>
    </div>

    <!-- Orders List -->
    <div v-else class="space-y-6">
      <div
        v-for="order in orders"
        :key="order.id"
        class="bg-white w-full p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
      >
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-800">
            Buyurtma raqami: <span class="text-indigo-600">#{{ order.id }}</span>
          </h2>
          <span
            class="mt-2 sm:mt-0 inline-block px-3 py-1 text-xs font-medium rounded-full"
            :class="{
              'bg-green-100 text-green-700': order.status === 'COMPLETED',
              'bg-yellow-100 text-yellow-700': order.status === 'PENDING',
              'bg-red-100 text-red-700': order.status === 'IN_PROGRESS'
            }"
          >
            {{ order.status === 'PENDING' ? 'Kutilmoqda' : order.status === 'IN_PROGRESS' ? 'Bekor qilindi' : order.status === 'COMPLETED' ? 'Yetkazib berildi' : 'Aniqlanmadi' }}
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <p class="text-sm font-medium text-gray-600">Manzil:</p>
            <p class="text-sm text-gray-800">{{ order.address }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600">Sana:</p>
            <p class="text-sm text-gray-800">{{ formatDate(order.created_date) || 'Noma\'lum' }}</p>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">Mahsulotlar:</h3>
          <ul class="space-y-3">
            <li
              v-for="item in order.items"
              :key="item.id"
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-3 last:border-b-0"
            >
              <div class="flex items-center gap-2">
                <img :src="item.product.image" alt="" width="50px" height="50px">
                <p class="text-sm font-medium text-gray-800">{{ item.product.name }}</p>
                <p class="text-xs text-gray-600">
                  {{ item.quantity }} dona - {{ item.total_price }} so‘m
                </p>
              </div>
              <nuxt-link
                to="./reviews"
                class="mt-2 sm:mt-0 inline-block text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                v-if="order.status === 'COMPLETED'"
              >
                Baholash
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const orders = ref([])
const userId = ref(null)

function formatDate(isoString) {
  const date = new Date(isoString)
  return date.toLocaleString('uz-UZ', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const fetchProductById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}products/${id}/`)
    return await res.json()
  } catch (err) {
    console.error(`Mahsulotni olishda xatolik (id=${id}):`, err)
    return { name: 'Nomaʼlum mahsulot', price: 0 }
  }
}

const fetchOrders = async () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
  const storedUserId = typeof window !== 'undefined' ? localStorage.getItem('user') : null

  if (!token || !storedUserId) {
    alert('Foydalanuvchi maʼlumotlari topilmadi. Iltimos, tizimga qayta kiring.')
    return
  }

  userId.value = parseInt(storedUserId)

  try {
    // 1. Buyurtmalarni olish
    const orderRes = await fetch(`${BASE_URL}orders/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const allOrders = await orderRes.json()
    const userOrders = allOrders.filter(order => order.profile === userId.value)

    // 2. orderItems-ni olish
    const itemRes = await fetch(`${BASE_URL}orderItems/`)
    const orderItems = await itemRes.json()

    // 3. Har bir buyurtmaga mahsulotlar yuklash
    const ordersWithItems = await Promise.all(userOrders.map(async (order) => {
      const itemsForOrder = orderItems.filter(item => item.order === order.id)

      const itemsWithProducts = await Promise.all(itemsForOrder.map(async (item) => {
        const product = await fetchProductById(item.product)
        return {
          id: item.id,
          quantity: item.amount,
          total_price: product.price * item.amount,
          product
        }
      }))

      return {
        ...order,
        items: itemsWithProducts
      }
    }))

    orders.value = ordersWithItems.reverse()
  } catch (error) {
    console.error('Buyurtmalarni yuklashda xatolik:', error)
    orders.value = []
  }
}

onMounted(fetchOrders)
</script>


<style scoped>
</style>
