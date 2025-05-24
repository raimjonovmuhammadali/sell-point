<script setup>
useHead({
  title: 'SELL-POINT'
})
</script>
<template>
    <LayoutsHeader/>
  <section class="w-[90%] mx-auto mt-10">
    <div class="flex flex-col justify-between  md:flex-row min-h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside class="w-full md:w-64 bg-white shadow-md p-6 rounded-md">
        <nav class="space-y-4">
          <nuxt-link
            to="./"
            class="block text-gray-700 hover:bg-gray-200 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
            :class="{ 'bg-gray-200': $route.path === './' }"
          >
            Buyurtmalarim
          </nuxt-link>
          <nuxt-link
            to="./reviews"
            class="block text-gray-700 hover:bg-gray-200 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
            :class="{ 'bg-gray-200': $route.path === './reviews' }"
          >
            Sharhlar
          </nuxt-link>
          <nuxt-link
            to="./settings"
            class="block text-gray-700 hover:bg-gray-200 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
            :class="{ 'bg-gray-200': $route.path === './profile' }"
          >
            Ma'lumotlarim
          </nuxt-link>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="w-full flex-1 p-6">
        <slot />
      </main>
    </div>
  </section>
</template>
