<template>
  <section id="faq" class="min-h-screen p-6 sm:p-8 lg:p-12">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-8 text-center">Savollar va javoblar</h1>

      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Sidebar Tabs -->
        <div class="w-full lg:w-1/4 bg-white p-4 rounded-2xl shadow-md space-y-2">
          <button
            v-for="(category, index) in categories"
            :key="index"
            @click="activeTab = index"
            class="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            :class="{ 'bg-indigo-100 text-indigo-600 font-medium': activeTab === index }"
          >
            {{ category }}
          </button>
        </div>

        <!-- Content Area -->
        <div class="w-full lg:w-3/4 bg-white p-6 rounded-2xl shadow-md">
          <div v-if="faqData[activeTab]" class="space-y-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ categories[activeTab] }}</h2>
            <div class="space-y-4">
              <div v-for="(answer, idx) in faqData[activeTab].answers" :key="idx">
                <!-- Ro’yxatdan o’tish Tab -->
                <p v-if="activeTab === 0 && idx === 0" class="text-gray-700 text-sm">
                  Ro’yxatdan o’tish: Buyurtmani rasmiylashtirib to’lovni bajarish uchun siz ro’yxatdan o’tishingiz kerak bo’ladi. Uning yordamida ma’lumotlarni doimiy ravishda to’ldirishingiz shart bo’lmaydi. Ro’yxatdan o’tish vaqti 3 daqiqadan oshmaydi.
                </p>
                <ul v-if="activeTab === 0 && idx === 1" class="list-disc list-inside text-gray-700 text-sm space-y-2">
                  <li>Qanday qilib saytda ro’yxatdan o’tish mumkin?</li>
                  <li>Sell Point saytida profil rasmi ustiga bosing:</li>
                  <li>"Ro‘yxatdan o‘tish" tugmasini bosing.</li>
                </ul>
                <ul v-if="activeTab === 0 && idx === 2" class="list-disc list-inside text-gray-700 text-sm space-y-2">
                  <li>Ushbu ma’lumotlarni kiritasiz:</li>
                  <ul class="list-circle list-inside pl-4">
                    <li>Foydalanuvchi nomi;</li>
                    <li>Shaxsiy parol;</li>
                    <li>Familiya, ism, sharif;</li>
                    <li>Telefon raqami;</li>
                    <li>Elektron pochta manzili;</li>
                    <li>Tug’ilgan sana;</li>
                    <li>Manzil;</li>
                    <li>Jinsingiz;</li>
                    <li>O'zingiz haqingizda ma'lumotni kiritib "Ro‘yxatdan o‘tish" tugmasini bosasiz.</li>
                  </ul>
                </ul>
                <p v-if="activeTab === 0 && idx === 3" class="text-gray-700 text-sm">
                  Shaxsiy kabinetda chiqib ketish uchun, kabinet past qismida joylashgan «Chiqish» tugmasini bosasiz.
                </p>

                <!-- Buyurtmalar Tab -->
                <p v-if="activeTab === 1 && idx === 0" class="text-gray-700 text-sm">
                  Buyurtmalar.
                </p>
                <ul v-if="activeTab === 1 && idx === 1" class="list-disc list-inside text-gray-700 text-sm space-y-2">
                  <li> Buyurtmalaringizni qulay tarzda kuzatib boring.</li>
                </ul>

                <!-- To’lovlar Tab -->
                <p v-if="activeTab === 2 && idx === 0" class="text-gray-700 text-sm">
                  To’lov.
                </p>
                <ul v-if="activeTab === 2 && idx === 1" class="list-disc list-inside text-gray-700 text-sm space-y-2">
                  <li>To'ovlarni mahsulot qo'lingizga olganingizda to'laysiz!</li>
                </ul>

                <!-- Qo’llab-quvvatlash Tab -->
                <p v-if="activeTab === 3 && idx === 0" class="text-gray-700 text-sm">
                  Qo’llab-quvvatlash xizmatlari
                </p>
                <ul v-if="activeTab === 3 && idx === 1" class="list-disc list-inside text-gray-700 text-sm space-y-2">
                  <li>24/7 qo'llab quvvatlash xizmati mavjud</li>
                </ul>
              </div>
            </div>
            <p class="text-xs text-gray-500 mt-4">
              Oxirgi yangilanish: {{ new Date().toLocaleString('uz-UZ', { dateStyle: 'medium', timeStyle: 'short' }) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const categories = ref(['Ro’yxatdan o’tish', 'Buyurtmalar', 'To’lovlar', 'Qo’llab-quvvatlash']);
const activeTab = ref(0);

const faqData = ref([
  {
    answers: [
      "Ro’yxatdan o’tish: Buyurtmani rasmiylashtirib to’lovni bajarish uchun siz ro'yxatdan o’tishingiz kerak bo'ladi. Uning yordamida ma'lumotlarni doimiy ravishda to'ldirishingiz shart bo’lmaydi. Ro'yxatdan o'tish vaqti 3 daqiqadan oshmaydi.",
      "Qanday qilib saytda ro’yxatdan o’tish mumkin? Sell Point saytida profil rasmi ustiga bosing: 'Ro‘yxatdan o‘tish' tugmasini bosing.",
      "Ushbu ma’lumotlarni kiritasiz: Foydalanuvchi nomi; Shaxsiy parol; Familiya, ism, sharif; Telefon raqami; Elektron pochta manzili; Tug’ilgan sana; Manzil; Jinsingiz; O'zingiz haqingizda ma'lumotni kiritib 'Ro‘yxatdan o‘tish' tugmasini bosasiz.",
      "Shaxsiy kabinetda chiqib ketish uchun, kabinet past qismida joylashgan «Chiqish» tugmasini bosasiz."
    ]
  },
  {
    answers: [
      "Buyurtmalar bilan bog’liq savollar: Quyidagi qadamlarni bajaring.",
      "Buyurtmalaringizni qulay tarxda kuzatib boring"
    ]
  },
  {
    answers: [
      "To’lov jarayoni: To’lovlarni amalga oshirish uchun quyidagilarni bajaring.",
      "To’lovlar bo’limiga o’ting. Mos to’lov usulini tanlang (naqd, karta yoki online). To’lovni tasdiqlang va kvitansiyani saqlang."
    ]
  },
  {
    answers: [
      "Qo’llab-quvvatlash xizmatlari: Yordam olish uchun quyidagilarni bajaring.",
      "Yordam bo’limiga o’ting. Bizga xabar yuboring yoki tezkor aloqa uchun raqamga qo‘ng’iroq qiling. Masalaningizni batafsil tasvirlang."
    ]
  }
]);
</script>