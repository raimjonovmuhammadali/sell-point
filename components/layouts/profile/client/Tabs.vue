<template>
  <div class="flex space-x-4 mb-6">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      @click="activeTab = tab.id"
      class="px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200"
      :class="{
        'bg-purple-600 text-white': activeTab === tab.id,
        'bg-gray-200 text-gray-700 hover:bg-gray-300': activeTab !== tab.id
      }"
    >
      {{ tab.name }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tabs = ref([
  { id: 'all', name: 'Barcha buyurtmalar' },
  { id: 'pending', name: "To'lov qilinmagan" },
  { id: 'active', name: 'Faol' }
])

const activeTab = ref('all')
</script>