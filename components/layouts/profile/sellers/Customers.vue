<template>
  <section id="customers" class="mb-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Mijozlarni Boshqarish</h1>
    <div class="bg-white p-6 rounded-xl shadow-md">
      <div class="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h2 class="text-sm font-semibold text-gray-800">Mijozlar</h2>
        <input type="text" placeholder="Mijoz ismini qidirish..." class="border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64" />
      </div>
      <div class="overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-gray-100 text-gray-600 text-[12px]">
              <th class="p-3 text-left">Ism</th>
              <th class="p-3 text-left">Telefon</th>
              <th class="p-3 text-left">Buyurtmalar</th>
              <th class="p-3 text-left">Jami xarid</th>
              <th class="p-3 text-left">Harakatlar</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b hover:bg-gray-50 transition-colors duration-200">
              <td class="p-3 text-xs text-gray-800">Ali Valiev</td>
              <td class="p-3 text-xs text-gray-800">+998901234567</td>
              <td class="p-3 text-xs text-gray-800">5</td>
              <td class="p-3 text-xs text-gray-800">1 500 000 so‘m</td>
              <td class="p-3">
                <button class="text-blue-500 hover:text-blue-600 text-[10px] mr-2">Ko‘rish</button>
                <button class="text-red-500 hover:text-red-600 text-[10px]">O‘chirish</button>
              </td>
            </tr>
            <tr class="border-b hover:bg-gray-50 transition-colors duration-200">
              <td class="p-3 text-xs text-gray-800">Zilola Karimova</td>
              <td class="p-3 text-xs text-gray-800">+998919876543</td>
              <td class="p-3 text-xs text-gray-800">3</td>
              <td class="p-3 text-xs text-gray-800">750 000 so‘m</td>
              <td class="p-3">
                <button class="text-blue-500 hover:text-blue-600 text-[10px] mr-2">Ko‘rish</button>
                <button class="text-red-500 hover:text-red-600 text-[10px]">O‘chirish</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-between items-center mt-4">
        <p class="text-xs text-gray-600">Jami 2 mijozdan 2 ko‘rsatilmoqda</p>
        <div class="flex gap-2">
          <button class="px-3 py-1 border border-gray-300 rounded-lg text-xs hover:bg-gray-200">Oldingi</button>
          <button class="px-3 py-1 border border-gray-300 rounded-lg text-xs hover:bg-gray-200">Keyingi</button>
        </div>
      </div>
    </div>
  </section>
</template>