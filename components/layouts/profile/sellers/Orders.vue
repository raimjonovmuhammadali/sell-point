<script setup>
import { ref, computed, onMounted } from 'vue'

const orders = ref([])
const orderItems = ref([])
const products = ref([])
const isModalOpen = ref(false)
const selectedOrder = ref({})
const currentUserId = ref(null)
const isUpdating = ref(false)
const statusOptions = ['PENDING', 'COMPLETED', 'IN_PROGRESS']

const formatDate = (isoString) => {
  return new Date(isoString).toLocaleDateString('uz-UZ')
}

const openModal = (order) => {
  selectedOrder.value = { ...order }
  isModalOpen.value = true
}
const closeModal = () => {
  isModalOpen.value = false
  selectedOrder.value = {}
}

const filteredOrders = computed(() => {
  const userProductIds = products.value
    .filter(p => p.user === currentUserId.value)
    .map(p => p.id)

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

const fetchData = async () => {
  const [ordersRes, itemsRes, productsRes] = await Promise.all([
    $fetch('https://market111.pythonanywhere.com/orders/'),
    $fetch('https://market111.pythonanywhere.com/orderItems/'),
    $fetch('https://market111.pythonanywhere.com/products/'),
  ])
  orders.value = ordersRes
  orderItems.value = itemsRes
  products.value = productsRes.results
}

onMounted(async () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  currentUserId.value = user || null
  await fetchData()
})

const updateOrderStatus = async () => {
  if (!selectedOrder.value.id) return

  isUpdating.value = true

  try {
    const updatedOrder = await $fetch(`https://market111.pythonanywhere.com/orders/${selectedOrder.value.id}/`, {
      method: 'PATCH',
      body: { status: selectedOrder.value.status },
    })

    const index = orders.value.findIndex(o => o.id === updatedOrder.id)
    if (index !== -1) {
      orders.value[index].status = updatedOrder.status
    }

    closeModal()
  } catch (error) {
    console.error('Xatolik:', error)
    alert("Holatni yangilab bo'lmadi. Qaytadan urinib ko'ring.")
  } finally {
    isUpdating.value = false
  }
}
</script>

<template>
  <div class="p-6 sm:p-8 lg:p-12">
    <h2 class="text-4xl font-extrabold text-gray-900 mb-8">Buyurtmalarim</h2>

    <div v-if="filteredOrders.length === 0" class="text-center py-12">
      <h3 class="text-2xl font-semibold text-gray-600">Sizga oid hech qanday buyurtmalar topilmadi.</h3>
    </div>

    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="order in filteredOrders"
        :key="order.id"
        class="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        @click="openModal(order)"
      >
        <div class="flex items-center justify-between mb-3">
          <p class="text-lg font-semibold text-gray-800">
            Buyurtma ID: <span class="text-indigo-600">{{ order.id }}</span>
          </p>
          <span
            class="inline-block px-3 py-1 text-xs font-medium rounded-full"
            :class="{
              'bg-green-100 text-green-700': order.status === 'COMPLETED',
              'bg-yellow-100 text-yellow-700': order.status === 'PENDING',
              'bg-red-100 text-red-700': order.status === 'IN_PROGRESS'
            }"
          >
            {{  order.status === 'IN_PROGRESS' ? 'Bekor qilingan' : order.status === 'PENDING' ? 'Kutilmoqda' : order.status === 'COMPLETED' ? 'Yetkazib berilgan' : 'Nimadur xato ketdi' }}
          </span>
        </div>
        <p class="text-sm text-gray-600">
          <span class="font-medium">Holati:</span> {{  order.status === 'IN_PROGRESS' ? 'Bekor qilingan' : order.status === 'PENDING' ? 'Kutilmoqda' : order.status === 'COMPLETED' ? 'Yetkazib berilgan' : 'Nimadur xato ketdi' }}
        </p>
        <p class="text-sm text-gray-600">
          <span class="font-medium">Yaratilgan:</span> {{ formatDate(order.created_date) }}
        </p>
      </div>
    </div>

    <!-- Modal -->
    <transition name="modal">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
        role="dialog"
        aria-labelledby="order-details-modal-title"
        aria-modal="true"
      >
        <transition name="modal-content">
          <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl">
            <h3 id="order-details-modal-title" class="text-2xl font-semibold text-gray-900 mb-6">
              Buyurtma tafsilotlari
            </h3>
            <div class="space-y-3">
              <p class="text-sm text-gray-600">
                <span class="font-medium">Buyurtma ID:</span>
                <span class="text-gray-800"> {{ selectedOrder.id }}</span>
              </p>
              <p class="text-sm text-gray-600">
                <span class="font-medium">Holati: </span>
                <span class="text-gray-800"> {{  selectedOrder.status === 'IN_PROGRESS' ? 'Bekor qilingan' : selectedOrder.status === 'PENDING' ? 'Kutilmoqda' : selectedOrder.status === 'COMPLETED' ? 'Yetkazib berilgan' : 'Nimadur xato ketdi' }}</span>
              </p>
              <p class="text-sm text-gray-600">
                <span class="font-medium">Yaratilgan:</span>
                <span class="text-gray-800"> {{ formatDate(selectedOrder.created_date) }}</span>
              </p>
              <div>
                <label class="text-sm font-medium text-gray-700">Yangi holat:</label>
                <select
                  v-model="selectedOrder.status"
                  class="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option v-for="opt in statusOptions" :key="opt" :value="opt">
                    {{ opt === 'IN_PROGRESS' ? 'Bekor qilish' : opt === 'PENDING' ? 'Kutilmoqda' : opt === 'COMPLETED' ? 'Yetkazib berilgan' : 'Nimadur xato ketdi' }}
                  </option>
                </select>
              </div>
            </div>

            <h4 class="mt-6 text-lg font-semibold text-gray-700 mb-3">Productlar:</h4>
            <ul class="space-y-3">
              <li
                v-for="(prod, index) in selectedOrder.products"
                :key="index"
                class="flex justify-between items-center border-b border-gray-100 pb-2 last:border-b-0"
              >
                <span class="text-sm text-gray-800">{{ prod.name }}</span>
                <span class="text-sm text-gray-600">
                  {{ prod.price }} × {{ prod.quantity }} = {{ prod.price * prod.quantity }} so‘m
                </span>
              </li>
            </ul>

            <div class="mt-6 flex flex-col sm:flex-row justify-between gap-3">
              <button
                @click="closeModal"
                class="w-full sm:w-auto bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm font-medium"
              >
                Yopish
              </button>

              <button
                @click="updateOrderStatus"
                :disabled="isUpdating"
                class="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-sm font-medium"
              >
                {{ isUpdating ? 'Yangilanmoqda...' : 'Holatni yangilash' }}
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>
