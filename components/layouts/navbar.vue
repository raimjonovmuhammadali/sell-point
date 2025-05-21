<template>
  <nav class="bg-secondary text-white py-5">
    <div class="container mx-auto px-4 flex items-center">
      <div class="relative group hidden md:block">
        <div class="px-6 py-4 bg-primary flex items-center cursor-pointer">
          <i class="fas fa-bars"></i>
          <span class="ml-2">All Categories</span>
        </div>
        <div class="absolute left-0 top-full bg-white shadow-md py-3 w-48 hidden group-hover:block transition">
          <nuxt-link to="#" class="flex items-center px-4 py-2 hover:bg-gray-100">
            <img src="" alt="sofa" class="w-5 h-5">
            <span class="ml-4 text-gray-600 text-sm">Sofa</span>
          </nuxt-link>
          <!-- Add other categories -->
        </div>
      </div>
      <div class="flex-1 flex items-center justify-between py-4 md:pl-12 text-primary">
        <div class="flex space-x-6">
          <nuxt-link to="/" class="hover:text-primary">Home</nuxt-link>
          <nuxt-link to="/shop" class="hover:text-primary">Shop</nuxt-link>
          <nuxt-link to="#" class="hover:text-primary">About us</nuxt-link>
          <nuxt-link to="#" class="hover:text-primary">Contact us</nuxt-link>
        </div>
        <nuxt-link to="/login" class="hover:text-primary">Login</nuxt-link>
      </div>
    </div>
  </nav>
</template>