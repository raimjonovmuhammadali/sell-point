<template>
  <header
    class="w-full bg-gradient-to-r from-purple-50 to-white shadow-lg sticky top-0 z-10 px-4 py-3 flex justify-between items-center rounded-lg"
  >
    <!-- Logotip -->
    <nuxt-link
      to="/"
      class="font-bold uppercase text-2xl text-purple-700 hover:text-purple-900 transition-all duration-300"
    >
      Sell Point
    </nuxt-link>

    <!-- Hamburger menyu (mobil uchun) -->
    <div class="md:hidden">
      <button
        @click="toggleMenu"
        class="focus:outline-none p-2 rounded-lg hover:bg-purple-100 transition-all duration-200"
      >
        <svg
          v-if="!isMenuOpen"
          class="w-8 h-8 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          class="w-8 h-8 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Mobil menyu -->
      <div
        v-if="isMenuOpen"
        class="absolute top-14 right-0 w-full max-w-sm bg-white shadow-xl p-6 rounded-lg z-20 animate-slide-in"
      >
        <ul class="flex flex-col gap-4">
          <li>
            <nuxt-link
              to="./"
              class="text-gray-700 hover:text-purple-600 font-medium text-lg"
            >
              Bosh sahifa
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="./products"
              class="text-gray-700 hover:text-purple-600 font-medium text-lg"
            >
              Mahsulotlar
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="./orders"
              class="text-gray-700 hover:text-purple-600 font-medium text-lg"
            >
              Buyurtmalar
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="./settings"
              class="text-gray-700 hover:text-purple-600 font-medium text-lg"
            >
              Sozlamalar
            </nuxt-link>
          </li>
          <li>
            <button
              @click="logout"
              class="text-left w-full text-gray-700 hover:text-purple-600 font-medium text-lg"
            >
              Chiqish
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Desktop menyu -->
    <ul class="hidden md:flex gap-8 text-gray-700">
      <li>
        <nuxt-link
          to="./"
          class="text-lg text-gray-700 hover:text-purple-600 font-medium"
        >
          Bosh sahifa
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="./products"
          class="text-lg text-gray-700 hover:text-purple-600 font-medium"
        >
          Mahsulotlar
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="./orders"
          class="text-lg text-gray-700 hover:text-purple-600 font-medium"
        >
          Buyurtmalar
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="./settings"
          class="text-lg text-gray-700 hover:text-purple-600 font-medium"
        >
          Sozlamalar
        </nuxt-link>
      </li>
      <li>
        <button
          @click="logout"
          class="text-lg text-gray-700 hover:text-purple-600 font-medium"
        >
          Chiqish
        </button>
      </li>
    </ul>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Router instance
const router = useRouter()

// Mobil menyu holati
const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Autentifikatsiya holati
const role = ref(null)
const isLoggedIn = ref(false)

onMounted(() => {
  if (process.client) {
    isLoggedIn.value = !!localStorage.getItem('access_token')
    role.value = localStorage.getItem('role')
  }
})

// Chiqish funksiyasi
const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('cart_id')
  localStorage.removeItem('city')
  localStorage.removeItem('role')
  localStorage.removeItem('user')

  isLoggedIn.value = false
  role.value = null

  router.push('/auth/login')
}
</script>

<style scoped>
/* Animatsiyalar */
.animate-slide-in {
  animation: slideIn 0.2s ease-in;
}
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
