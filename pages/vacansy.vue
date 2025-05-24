<template>
  <div class="bg-gray-50 min-h-screen text-black">
    <!-- Hero Section -->
    <section id="hero" class="bg-gradient-to-r from-indigo-600 to-indigo-800 py-20 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold leading-tight">
          Sell Point Jamoasiga Qo‘shiling!
        </h1>
        <p class="mt-4 text-lg text-gray-100">
          Biz bilan birga ishlang va karyerangizni yangi bosqichga olib chiqing.
        </p>
        <NuxtLink
          to="#apply"
          class="mt-6 inline-block px-8 py-3 bg-yellow-500 text-white font-semibold rounded-lg transition-transform transform hover:scale-105 hover:bg-yellow-600"
        >
          Hozir Ariza Berish
        </NuxtLink>
      </div>
    </section>

    <!-- Vacancies Section -->
    <section id="vacancies" class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-extrabold text-gray-900 text-center mb-12">Ochiq Vakansiyalar</h2>

        <!-- Search and Filter -->
        <div class="bg-gray-50 p-6 rounded-xl shadow-md mb-8">
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
              <label for="search" class="block text-sm font-medium text-gray-700">Vakansiyani Qidirish</label>
              <input
                id="search"
                v-model="searchQuery"
                type="text"
                placeholder="Masalan: Sotuv Menejeri"
                class="mt-1  p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div class="flex-1">
              <label for="location" class="block text-sm font-medium text-gray-700">Joylashuv</label>
              <select
                id="location"
                v-model="selectedLocation"
                class="mt-1 p-2  block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Barchasi</option>
                <option v-for="(location, index) in locations" :key="index" :value="location">{{ location }}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Vacancies List -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(vacancy, index) in filteredVacancies"
            :key="index"
            class="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 animate-fade-in"
          >
            <h3 class="text-xl font-semibold text-gray-800">{{ vacancy.title }}</h3>
            <p class="mt-2 text-gray-600">
              <strong>Joylashuv:</strong> {{ vacancy.location }}
            </p>
            <p class="mt-2 text-gray-600">
              <strong>Tavsif:</strong> {{ vacancy.description }}
            </p>
            <p class="mt-2 text-gray-600">
              <strong>Talablar:</strong> {{ vacancy.requirements }}
            </p>
            <NuxtLink
              :to="`#apply`"
              class="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Ariza Berish
            </NuxtLink>
          </div>
        </div>
        <p v-if="filteredVacancies.length === 0" class="text-center text-gray-600 mt-4">
          Hozirda mos vakansiyalar topilmadi.
        </p>
      </div>
    </section>

    <!-- Apply Section -->
    <section id="apply" class="py-16 bg-gradient-to-r from-indigo-800 to-indigo-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-extrabold text-white mb-4">Vakansiyaga Ariza Berish</h2>
        <p class="text-lg mb-8 text-gray-200">Bizga qo‘shiling va jamoamizning bir qismi bo‘ling!</p>
        <form class="max-w-md mx-auto space-y-4">
          <div>
            <input
              type="text"
              placeholder="Ismingiz"
              class="w-full px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              class="w-full px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="Telefon Raqamingiz"
              class="w-full px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Qisqacha o'zingiz haqingizda"
              rows="4"
              class="w-full px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-gray-300 shadow-sm"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full px-8 py-3 bg-yellow-500 text-white font-semibold rounded-lg transition-transform transform hover:scale-105 hover:bg-yellow-600"
          >
            Ariza Yuborish
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Sample data for locations and vacancies
const locations = ref([
  'Toshkent shahri',
  'Samarqand viloyati',
  'Andijon viloyati',
  'Buxoro viloyati',
  'Farg‘ona viloyati'
]);

const vacancies = ref([
  {
    title: 'Sotuv Menejeri',
    location: 'Toshkent shahri',
    description: 'Sotuv strategiyalarini ishlab chiqish va mijozlar bilan ishlash.',
    requirements: '3 yillik tajriba, o‘zbek va rus tillarini bilish.'
  },
  {
    title: 'Marketolog',
    location: 'Samarqand viloyati',
    description: 'Marketing kampaniyalarini boshqarish va tahlil qilish.',
    requirements: '2 yillik tajriba, ingliz tili bilimi afzal.'
  },
  {
    title: 'Omborxona Boshqaruvchisi',
    location: 'Toshkent shahri',
    description: 'Ombor jarayonlarini nazorat qilish va optimallashtirish.',
    requirements: 'Logistika sohasida tajriba, moslashuvchanlik.'
  },
  {
    title: 'Kassir',
    location: 'Andijon viloyati',
    description: 'Mijozlarga xizmat ko‘rsatish va to‘lovlarni qabul qilish.',
    requirements: '1 yillik tajriba, xushmuomalalik.'
  }
]);

const searchQuery = ref('');
const selectedLocation = ref('');

// Filter vacancies based on search query and location
const filteredVacancies = computed(() => {
  return vacancies.value.filter((vacancy) => {
    const matchesSearch = vacancy.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      vacancy.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesLocation = selectedLocation.value ? vacancy.location === selectedLocation.value : true;
    return matchesSearch && matchesLocation;
  });
});

onMounted(() => {
  // Optionally fetch vacancies from an API
  /*
  try {
    const response = await fetch('https://your-api.com/vacancies');
    const data = await response.json();
    vacancies.value = data;
  } catch (error) {
    console.error('Error fetching vacancies:', error);
  }
  */
});
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}
</style>