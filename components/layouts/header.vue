<template>
  <nav class="w-full bg-[#F0F2F5] p-3">
    <div class="w-[90%] mx-auto flex">
      <div class="flex gap-2 items-center">
        <nuxt-link to="" class="font-semibold text-purple-700 text-[11px]">Sotuvchi bo'lish</nuxt-link>
        <span class="text-gray-400">|</span>
        <nuxt-link to="" class="font-semibold text-purple-700 text-[11px]">Sotuvchi bo'lish</nuxt-link>
      </div>
    </div>
  </nav>
  <header class="bg-gradient-to-r from-purple-50 to-white shadow-lg sticky top-0 z-10 w-[90%] mx-auto px-4 py-3 flex justify-between items-center rounded-lg">
    <!-- Logo -->
    <nuxt-link to="/" class="font-bold uppercase text-2xl text-purple-700 hover:text-purple-900 transition-all duration-300">
      Sell Point
    </nuxt-link>

    <!-- Hamburger menyusi (mobil uchun) -->
    <div class="md:hidden">
      <button @click="toggleMenu" class="focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-all">
        <svg v-if="!isMenuOpen" class="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-if="isMenuOpen" class="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div v-if="isMenuOpen" class="absolute top-16 left-0 w-[90%] bg-white shadow-xl p-5 rounded-lg z-20 animate-fade-in">
        <ul class="flex flex-col gap-3">
          <li><nuxt-link to="" class="text-gray-700 hover:text-purple-600 transition-colors font-medium">Bosh sahifa</nuxt-link></li>
          <li><nuxt-link to="" class="text-gray-700 hover:text-purple-600 transition-colors font-medium">Toifalar</nuxt-link></li>
          <li><nuxt-link to="" class="text-gray-700 hover:text-purple-600 transition-colors font-medium">Biz haqimizda</nuxt-link></li>
          <li><nuxt-link to="" class="text-gray-700 hover:text-purple-600 transition-colors font-medium">Bog'lanish</nuxt-link></li>
        </ul>
      </div>
    </div>

    <!-- Desktop menyusi -->
    <ul class="hidden md:flex gap-6 text-gray-700">
      <li><nuxt-link to="" class="hover:text-purple-600 transition-colors font-medium">Bosh sahifa</nuxt-link></li>
      <li><nuxt-link to="" class="hover:text-purple-600 transition-colors font-medium">Toifalar</nuxt-link></li>
      <li><nuxt-link to="" class="hover:text-purple-600 transition-colors font-medium">Biz haqimizda</nuxt-link></li>
      <li><nuxt-link to="" class="hover:text-purple-600 transition-colors font-medium">Bog'lanish</nuxt-link></li>
    </ul>

    <!-- Izlash va ikonka qismi -->
    <div class="flex gap-3 items-center">
      <form action="" class="relative">
        <input
          type="text"
          placeholder="Izlash..."
          class="outline-none border border-gray-300 px-4 py-2 rounded-full focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all w-32 md:w-64"
        />
        <button type="submit" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
      <nuxt-link to="/cart" class="text-gray-700 hover:text-purple-600 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </nuxt-link>
      <nuxt-link to="/profile/login" class="text-gray-700 hover:text-purple-600 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </nuxt-link>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style>
/* Animatsiya uchun CSS */
.animate-fade-in {
  animation: fadeIn 0.3s ease-in;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>