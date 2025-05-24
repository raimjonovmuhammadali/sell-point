<template>
  <div class="flex flex-col items-center justify-center h-full text-center">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">Hech narsa yo‘q</h1>
    <p class="text-sm text-gray-600 mb-6 max-w-md">
      Sizda faol buyurtma mavjud emas! Barcha kerakli narsalarni topish uchun qidirishdan foydalaning.
    </p>
    <nuxt-link
      to="/"
      class="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors duration-300 text-sm font-medium"
    >
      Xaridlarni boshlash
    </nuxt-link>
    <nuxt-link
      to="/"
      class="mt-4 text-purple-600 hover:text-purple-700 text-sm font-medium"
    >
      Bosh sahifaga qaytish
    </nuxt-link>
  </div>
</template>