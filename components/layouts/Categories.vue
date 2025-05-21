<template>
  <div class="container mx-auto px-4 py-12">
    <!-- Sarlavha -->
    <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center md:text-left">Kategoriyalar bo‘yicha</h2>

    <!-- Kategoriyalar gridi -->
    <div v-if="loading" class="text-center text-gray-500">Yuklanmoqda...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <nuxt-link v-for="category in categories.slice(0, 4)" :key="category.id" :to="`/category/${category.id}`" class="rounded-md overflow-hidden group bg-[#EFEFEF] p-3 flex gap-3 items-center hover:bg-gray-200 transition-colors">
        <img :src="category.image" :alt="category.name" class="w-10 h-10 rounded-[10px] object-cover">
        <span class="text-sm md:text-base text-gray-800 font-medium">{{ category.name }}</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    // Reaktiv o‘zgaruvchilar
    const categories = ref([]);
    const loading = ref(true);
    const error = ref(null);

    // API’dan kategoriyalarni olish funksiyasi
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}categories/`);
        if (!response.ok) {
          throw new Error('Tarmoq javobi muvaffaqiyatsiz bo‘ldi');
        }
        const data = await response.json();
        categories.value = data; // API’dan kelgan kategoriyalarni o‘zlashtiramiz
        loading.value = false;
      } catch (err) {
        error.value = "Ma'lumotlarni yuklashda xatolik yuz berdi!";
        loading.value = false;
      }
    };

    // Komponent yuklanganda API’dan ma'lumotlarni olish
    onMounted(() => {
      fetchCategories();
    });

    return {
      categories,
      loading,
      error,
    };
  },
};
</script>

<style>
/* Tailwind CSS loyiha konfiguratsiyasi orqali qo‘llaniladi */
</style>