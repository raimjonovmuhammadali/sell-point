<template>
  <section id="orders" class="mb-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Buyurtmalarni Boshqarish</h1>
    <div class="bg-white p-6 rounded-xl shadow-md">
      <div class="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h2 class="text-sm font-semibold text-gray-800">Buyurtmalar</h2>
        <input
          type="text"
          placeholder="Buyurtma ID bo‘yicha qidirish..."
          class="border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
        />
      </div>
      <div class="overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-gray-100 text-gray-600 text-[12px]">
              <th class="p-3 text-left">Buyurtma ID</th>
              <th class="p-3 text-left">Mijoz</th>
              <th class="p-3 text-left">Jami</th>
              <th class="p-3 text-left">Holati</th>
              <th class="p-3 text-left">Sana</th>
              <th class="p-3 text-left">Harakatlar</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b hover:bg-gray-50 transition-colors duration-200">
              <td class="p-3 text-xs text-gray-800">#12345</td>
              <td class="p-3 text-xs text-gray-800">Ali Valiev</td>
              <td class="p-3 text-xs text-gray-800">150 000 so‘m</td>
              <td class="p-3 text-xs">
                <select
                  class="border border-gray-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="delivered" class="text-green-600">Yetkazib berildi</option>
                  <option value="pending" class="text-yellow-600">Kutilmoqda</option>
                  <option value="canceled" class="text-red-600">Bekor qilingan</option>
                </select>
              </td>
              <td class="p-3 text-xs text-gray-800">2025-05-20</td>
              <td class="p-3">
                <button
                  @click="openModal({ id: '#12345', customer: 'Ali Valiev', total: '150 000 so‘m', status: 'Yetkazib berildi', date: '2025-05-20', products: [{ name: 'Namuna Mahsulot 1', price: '100 000 so‘m', quantity: 1 }, { name: 'Namuna Mahsulot 2', price: '50 000 so‘m', quantity: 1 }] })"
                  class="text-blue-500 hover:text-blue-600 text-[12px] mr-2 cursor-pointer"
                >
                  Ko‘rish
                </button>
              </td>
            </tr>
            <tr class="border-b hover:bg-gray-50 transition-colors duration-200">
              <td class="p-3 text-xs text-gray-800">#12346</td>
              <td class="p-3 text-xs text-gray-800">Zilola Karimova</td>
              <td class="p-3 text-xs text-gray-800">89 999 so‘m</td>
              <td class="p-3 text-xs">
                <select
                  class="border border-gray-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending" class="text-yellow-600">Kutilmoqda</option>
                  <option value="delivered" class="text-green-600">Yetkazib berildi</option>
                  <option value="canceled" class="text-red-600">Bekor qilingan</option>
                </select>
              </td>
              <td class="p-3 text-xs text-gray-800">2025-05-21</td>
              <td class="p-3">
                <button
                  @click="openModal({ id: '#12346', customer: 'Zilola Karimova', total: '89 999 so‘m', status: 'Kutilmoqda', date: '2025-05-21', products: [{ name: 'Namuna Mahsulot 2', price: '89 999 so‘m', quantity: 1 }] })"
                  class="text-blue-500 hover:text-blue-600 text-[12px] mr-2 cursor-pointer"
                >
                  Ko‘rish
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-between items-center mt-4">
        <p class="text-xs text-gray-600">Jami 2 buyurtmadan 2 ko‘rsatilmoqda</p>
        <div class="flex gap-2">
          <button class="px-3 py-1 border border-gray-300 rounded-lg text-xs hover:bg-gray-200">
            Oldingi
          </button>
          <button class="px-3 py-1 border border-gray-300 rounded-lg text-xs hover:bg-gray-200">
            Keyingi
          </button>
        </div>
      </div>
    </div>

    <!-- Modal oynasi -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0  backdrop-blur flex items-center justify-center z-50"
    >
      <div class="bg-white opacity-100 p-6 rounded-xl shadow-xl w-full max-w-lg z-50">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Buyurtma Ma’lumotlari</h2>
        <div class="space-y-4">
          <p><strong>Buyurtma ID:</strong> {{ selectedOrder.id }}</p>
          <p><strong>Mijoz:</strong> {{ selectedOrder.customer }}</p>
          <p><strong>Jami:</strong> {{ selectedOrder.total }}</p>
          <p><strong>Holati:</strong> {{ selectedOrder.status }}</p>
          <p><strong>Sana:</strong> {{ selectedOrder.date }}</p>
          <div>
            <strong>Mahsulotlar:</strong>
            <ul class="list-disc pl-5">
              <li v-for="product in selectedOrder.products" :key="product.name">
                {{ product.name }} - {{ product.price }} ({{ product.quantity }} dona)
              </li>
            </ul>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button
            @click="closeModal"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-300"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Modal holati va tanlangan buyurtma
const isModalOpen = ref(false)
const selectedOrder = ref({})

// Modalni ochish
const openModal = (order) => {
  selectedOrder.value = order
  isModalOpen.value = true
}

// Modalni yopish
const closeModal = () => {
  isModalOpen.value = false
  selectedOrder.value = {}
}
</script>

<style scoped>
/* Modal va select uchun qo‘shimcha uslublar */
select option {
  background: white;
}
</style>