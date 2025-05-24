<template>
  <section id="pickup-points" class="min-h-screen p-6 sm:p-8 lg:p-12">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-8 text-center">Topshirish punktlari</h1>

      <div class="bg-white p-6 rounded-2xl shadow-md mb-6">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <label for="region" class="block text-sm font-medium text-gray-700">Viloyatni tanlang</label>
            <select
              id="region"
              v-model="selectedRegion"
              class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option v-for="(region, index) in regions" :key="index" :value="region">{{ region }}</option>
            </select>
          </div>
          <div class="flex items-end">
            <button
              @click="searchPickupPoints"
              class="w-full sm:w-auto bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Izlash
            </button>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-md">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Topshirish punktlari ro'yxati</h2>
        <div v-if="filteredPickupPoints.length > 0" class="space-y-4">
          <div
            v-for="(point, index) in filteredPickupPoints"
            :key="index"
            class="border-b border-gray-200 pb-4 last:border-b-0"
          >
            <p class="text-gray-700 text-sm">
              <strong>Nomi:</strong> {{ point.name }}
            </p>
            <p class="text-gray-700 text-sm">
              <strong>Manzil:</strong> {{ point.address }}
            </p>
            <p class="text-gray-700 text-sm">
              <strong>Ish vaqti:</strong> {{ point.hours }}
            </p>
            <p class="text-gray-700 text-sm">
              <strong>Telefon:</strong> {{ point.phone }}
            </p>
          </div>
        </div>
        <p v-else class="text-gray-600 text-sm">Ushbu viloyatda topshirish punktlari topilmadi.</p>
        <p class="text-xs text-gray-500 mt-4">
          Oxirgi yangilanish: {{ new Date().toLocaleString('uz-UZ', { dateStyle: 'medium', timeStyle: 'short' }) }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const regions = ref([
  'Toshkent shahri',
  'Andijon viloyati',
  'Buxoro viloyati',
  'Farg‘ona viloyati',
  'Jizzax viloyati',
  'Namangan viloyati',
  'Navoiy viloyati',
  'Qashqadaryo viloyati',
  'Samarqand viloyati',
  'Sirdaryo viloyati',
  'Surxondaryo viloyati',
  'Toshkent viloyati',
  'Xorazm viloyati',
  'Qoraqalpog‘iston Respublikasi'
]);

const selectedRegion = ref(regions.value[0]); 

const pickupPoints = ref([
  {
    region: 'Toshkent shahri',
    name: 'Markaziy topshirish punkti',
    address: 'Amir Temur ko‘chasi 12, Toshkent',
    hours: 'Dush-Shan, 09:00 - 18:00',
    phone: '+998 90 123 45 67'
  },
  {
    region: 'Toshkent shahri',
    name: 'Chilonzor topshirish punkti',
    address: 'Chilonzor tumani, 45-uy, Toshkent',
    hours: 'Dush-Shan, 10:00 - 19:00',
    phone: '+998 90 987 65 43'
  },
  {
    region: 'Samarqand viloyati',
    name: 'Samarqand markaziy punkti',
    address: 'Registon ko‘chasi 5, Samarqand',
    hours: 'Dush-Shan, 09:00 - 17:00',
    phone: '+998 90 234 56 78'
  },
  {
    region: 'Andijon viloyati',
    name: 'Andijon topshirish punkti',
    address: 'Navoiy prospekti 10, Andijon',
    hours: 'Dush-Shan, 09:00 - 18:00',
    phone: '+998 90 345 67 89'
  },
  {
    region: 'Farg\‘ona viloyati',
    name: 'Farg\'ona topshirish punkti',
    address: 'Mustaqilik ko\'chasi, 185',
    hours: 'Dush-Shan, 09:00 - 18:00',
    phone: '+998 90 345 67 89'
  }
]);

const filteredPickupPoints = ref([]);

const searchPickupPoints = () => {
  filteredPickupPoints.value = pickupPoints.value.filter(
    (point) => point.region === selectedRegion.value
  );
};

onMounted(() => {
  searchPickupPoints();
});
</script>