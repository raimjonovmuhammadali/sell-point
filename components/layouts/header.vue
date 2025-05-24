<template>
  <nav class="w-full bg-[#F0F2F5] p-3 sm:p-4">
    <div class="w-[90%]  mx-auto flex justify-between items-center">
      <div class="flex gap-2 items-center">
        <nuxt-link to="/sellers" class="font-semibold text-purple-700 text-xs sm:text-sm hover:text-purple-900 transition">
          Sotuvchi bo'lish
        </nuxt-link>
        <span class="text-gray-400 hidden sm:inline">|</span>
        <nuxt-link to="/faq" class="font-semibold text-purple-700 text-xs sm:text-sm hover:text-purple-900 transition">
          Yordam
        </nuxt-link>
      </div>
    </div>
  </nav>

  <header class="bg-gradient-to-r from-purple-50 to-white shadow-sm sticky top-0 z-10 w-[90%]  mx-auto px-3 sm:px-5 py-3 flex justify-between items-center rounded-lg">
    <nuxt-link to="/" class="font-bold uppercase text-lg sm:text-xl md:text-2xl text-purple-700 hover:text-purple-900 transition-all duration-300">
      Sell Point
    </nuxt-link>

    <!-- Hamburger menyu (mobile) -->
    <div class="flex items-center gap-2 md:hidden">
      <button @click="toggleSearch" class="p-2 rounded-full hover:bg-gray-100 transition-all focus:outline-none">
        <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      <button @click="toggleMenu" class="p-2 rounded-full hover:bg-gray-100 transition-all focus:outline-none">
        <svg v-if="!isMenuOpen" class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Mobile search -->
      <div v-if="isSearchOpen" class="absolute top-16 left-0 w-full bg-white shadow-lg p-4 z-20 animate-slide-in">
        <form class="relative">
          <input
            type="text"
            placeholder="Izlash..."
            class="w-full outline-none border border-gray-300 px-4 py-2 rounded-full focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-sm"
          />
          <button type="submit" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 focus:outline-none">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>

      <!-- Mobile menu -->
      <div v-if="isMenuOpen" class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-20" @click="toggleMenu">
        <div class="absolute top-0 left-0 w-full h-full bg-white p-6 pt-16 animate-slide-in" @click.stop>
          <button @click="toggleMenu" class="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-all">
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ul class="flex flex-col gap-6">
            <li><nuxt-link to="/" class="text-gray-700 hover:text-purple-600 font-medium text-lg" @click="toggleMenu">Bosh sahifa</nuxt-link></li>
            <li><nuxt-link to="/faq" class="text-gray-700 hover:text-purple-600 font-medium text-lg" @click="toggleMenu">Biz haqimizda</nuxt-link></li>
            <li><nuxt-link to="/contact" class="text-gray-700 hover:text-purple-600 font-medium text-lg" @click="toggleMenu">Bog'lanish</nuxt-link></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Desktop menyu -->
    <ul class="hidden md:flex gap-3 lg:gap-6 text-gray-700 items-center">
      <li><nuxt-link to="/" class="hover:text-purple-600 font-medium text-sm lg:text-base">Bosh sahifa</nuxt-link></li>
      <li><nuxt-link to="/faq" class="hover:text-purple-600 font-medium text-sm lg:text-base">Biz haqimizda</nuxt-link></li>
      <li><nuxt-link to="/contact" class="hover:text-purple-600 font-medium text-sm lg:text-base">Bog'lanish</nuxt-link></li>
    </ul>

    <!-- Search va iconlar (desktop) -->
    <div class="hidden md:flex gap-2 lg:gap-3 items-center">
      <form class="relative">
        <input
          type="text"
          placeholder="Izlash..."
          class="outline-none border border-gray-300 px-4 py-2 rounded-full focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all w-36 md:w-48 lg:w-64 text-sm"
        />
        <button type="submit" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 focus:outline-none">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
      <nuxt-link to="/cart" class="text-gray-700 hover:text-purple-600 p-2">
        <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.7114 0z" />
        </svg>
      </nuxt-link>
      <nuxt-link :to="isLoggedIn ? role === 'seller' ? 'profile/seller/' : 'profile/client/' : '/auth/login'" class="text-gray-700 hover:text-purple-600 p-2">
        <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </nuxt-link>
    </div>

    <!-- Mobile icons -->
    <div class="flex md:hidden gap-2 items-center">
      <nuxt-link to="/cart" class="text-gray-700 hover:text-purple-600 p-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </nuxt-link>
      <nuxt-link :to="isLoggedIn ? role === 'seller' ? 'profile/seller/' : 'profile/client/' : '/auth/login'" class="text-gray-700 hover:text-purple-600 p-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </nuxt-link>
    </div>
  </header>
</template>

<script setup>
const role = ref(null)
const isLoggedIn = ref(false)
const isMenuOpen = ref(false)
const isSearchOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) isSearchOpen.value = false // Close search when menu opens
}

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) isMenuOpen.value = false // Close menu when search opens
}

onMounted(() => {
  if (process.client) {
    isLoggedIn.value = !!localStorage.getItem('access_token')
    role.value = localStorage.getItem('role')
  }
})
</script>

<style>
.animate-slide-in {
  animation: slideIn 0.3s ease-in-out;
}
@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>