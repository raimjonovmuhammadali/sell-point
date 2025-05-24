<template>
  <section id="contact" class="min-h-screen p-6 sm:p-8 lg:p-12">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-8 text-center">Biz bilan bog'lanish</h1>

      <div class="flex flex-col lg:flex-row gap-6">
        <div class="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-md space-y-4">
          <h2 class="text-xl font-semibold text-gray-800">Do'kon aloqa ma'lumotlari</h2>
          <p class="text-gray-700 text-sm">
            <strong>Telefon:</strong> +998 90 123 45 67
          </p>
          <p class="text-gray-700 text-sm">
            <strong>E-pochta:</strong> info@sellpoint.uz
          </p>
          <p class="text-gray-700 text-sm">
            <strong>Manzil:</strong> Farg'ona shahri, Mustaqillik, 185
          </p>
          <p class="text-gray-700 text-sm">
            <strong>Ish vaqti:</strong> Dush-Pay, 09:00 - 18:00
          </p>
        </div>

        <div class="w-full lg:w-2/3 bg-white p-6 rounded-2xl shadow-md">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Bizga xabar yuboring</h2>
          <form class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Ismingiz</label>
              <input
                id="name"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                required
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">E-pochta</label>
              <input
                id="email"
                type="email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                required
              />
            </div>
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700">Xabaringiz</label>
              <textarea
                id="message"
                rows="4"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Yuborish
            </button>
          </form>
          <p class="text-xs text-gray-500 mt-4">
            Oxirgi yangilanish: {{ new Date().toLocaleString('uz-UZ', { dateStyle: 'medium', timeStyle: 'short' }) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

onMounted(() => {
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Form submitted:', {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        message: form.querySelector('#message').value,
      });
    });
  }
});
</script>
```