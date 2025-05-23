<template>
  <div class="w-full py-5">
    <div class="container mx-auto relative">
      <!-- Carousel kontent -->
      <div class="overflow-hidden rounded-md">
        <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <div v-for="(image, index) in images" :key="index" class="w-full flex-shrink-0">
            <img :src="image.src" :alt="image.alt" class="w-full h-64 md:h-96 object-cover rounded-md">
          </div>
        </div>
      </div>

      <!-- Oldingi va keyingi tugmalar -->
      <button @click="prev" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button @click="next" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Punktlar (dots) -->
      <div class="flex justify-center mt-4 space-x-2">
        <button v-for="(image, index) in images" :key="index" @click="currentIndex = index" class="w-3 h-3 rounded-full bg-gray-400 hover:bg-gray-600" :class="{ 'bg-green-600': currentIndex === index }"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      images: [
        { src: './images/1.jpg', alt: 'Image 1' },
        { src: './images/2.jpg', alt: 'Image 2' },
      ],
    };
  },
  methods: {
    next() {
      // Keyingi rasmga o‘tish
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prev() {
      // Oldingi rasmga qaytish
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
  },
  mounted() {
    // Avtomatik slider uchun interval
    this.interval = setInterval(() => {
      this.next();
    }, 3000); // Har 3 soniyada o‘zgaradi
  },
  beforeDestroy() {
    // Komponent yo‘q qilinganda intervalni to‘xtatish
    clearInterval(this.interval);
  },
};
</script>

<style>
/* Tailwind CSS loyiha konfiguratsiyasi orqali qo‘llaniladi */
</style>