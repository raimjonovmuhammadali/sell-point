<template>
  <section id="settings" class="mb-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Sozlamalar</h1>
    <div class="bg-white p-6 rounded-xl shadow-md">
      <h2 class="text-sm font-semibold text-gray-800 mb-4">Hisob Sozlamalari</h2>
      <form class="space-y-4">
        <div>
          <label class="text-xs text-gray-600">Foydalanuvchi ismi</label>
          <input type="text" value="Sotuvchi" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label class="text-xs text-gray-600">Email</label>
          <input type="email" value="sotuvchi@example.com" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label class="text-xs text-gray-600">Yangi parol</label>
          <input type="password" placeholder="Yangi parol kiriting" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">Saqlash</button>
      </form>
    </div>
  </section>
</template>