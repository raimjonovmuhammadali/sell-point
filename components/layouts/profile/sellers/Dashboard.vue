<template>
  <section id="dashboard" class="mb-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Boshqaruv Paneli</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <!-- Umumiy Savdo -->
      <div class="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        <h2 class="text-base font-semibold">Umumiy Savdo</h2>
        <p class="text-3xl font-bold">{{ totalSales.toLocaleString('uz-UZ') }} so‘m</p>
        <p class="text-[10px] opacity-80">Shu Oy</p>
        <div class="absolute top-4 right-4">
          <svg class="w-6 h-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <!-- Umumiy Buyurtmalar -->
      <div class="relative bg-gradient-to-br from-green-600 to-green-800 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        <h2 class="text-base font-semibold">Umumiy Buyurtmalar</h2>
        <p class="text-3xl font-bold">{{ allUserOrdersCount }}</p>
        <p class="text-[10px] opacity-80">Shu Oy</p>
        <div class="absolute top-4 right-4">
          <svg class="w-6 h-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      </div>

      <!-- Faol Mahsulotlar -->
      <div class="relative bg-gradient-to-br from-purple-600 to-purple-800 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        <h2 class="text-base font-semibold">Faol Mahsulotlar</h2>
        <p class="text-3xl font-bold">{{ userProducts.length }}</p>
        <p class="text-[10px] opacity-80">Jami</p>
        <div class="absolute top-4 right-4">
          <svg class="w-6 h-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0v6l-8 4m0-10L4 7m8 4v10M4 7v6l8 4" />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const orders = ref([])
const orderItems = ref([])
const products = ref([])
const userProducts = ref([])
const currentUserId = ref(null)

// Fetch user ID from localStorage on mount
onMounted(async () => {
  const userData = localStorage.getItem('user')
  if (userData) {
    const user = JSON.parse(userData)
    currentUserId.value = user || null
  }
  await fetchData()
})

// Fetch all needed data
const fetchData = async () => {
  const [ordersRes, itemsRes, productsRes] = await Promise.all([
    $fetch('https://market111.pythonanywhere.com/orders/'),
    $fetch('https://market111.pythonanywhere.com/orderItems/'),
    $fetch('https://market111.pythonanywhere.com/products/'),
  ])
  orders.value = ordersRes
  orderItems.value = itemsRes
  products.value = productsRes.results

  // Filter products belonging to current user
  userProducts.value = products.value.filter(p => p.user === currentUserId.value)
}

// All orders related to current user's products
const filteredOrders = computed(() => {
  if (!currentUserId.value) return []

  const userProductIds = userProducts.value.map(p => p.id)

  const relatedOrderIds = orderItems.value
    .filter(item => userProductIds.includes(item.product))
    .map(item => item.order)

  const uniqueOrderIds = [...new Set(relatedOrderIds)]

  return orders.value
    .filter(order => uniqueOrderIds.includes(order.id))
    .map(order => {
      const items = orderItems.value.filter(i => i.order === order.id && userProductIds.includes(i.product))
      const orderProducts = items.map(i => {
        const prod = products.value.find(p => p.id === i.product)
        return {
          name: prod?.title,
          price: prod?.price,
          quantity: i.amount,
        }
      })
      return { ...order, products: orderProducts }
    })
})

// Umumiy buyurtmalar soni (statusdan qat'i nazar)
const allUserOrdersCount = computed(() => {
  if (!currentUserId.value) return 0

  const userProductIds = userProducts.value.map(p => p.id)

  const relatedOrderIds = orderItems.value
    .filter(item => userProductIds.includes(item.product))
    .map(item => item.order)

  const uniqueOrderIds = [...new Set(relatedOrderIds)]

  return uniqueOrderIds.length
})

// Umumiy savdo (faqat completed statusidagi buyurtmalar summasi)
const totalSales = computed(() => {
  return filteredOrders.value.reduce((total, order) => {
    if (order.status !== 'COMPLETED') return total

    const orderSum = order.products.reduce((sum, p) => {
      return sum + (p.price * p.quantity)
    }, 0)
    return total + orderSum
  }, 0)
})
</script>
