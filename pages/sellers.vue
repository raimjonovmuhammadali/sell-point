<template>
  <div class="bg-gray-50 min-h-screen text-black">


    <!-- Hero Section -->
    <section id="hero" class="bg-gradient-to-r from-primary to-button py-20 text-black">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 text-center md:text-left animate-fade-in">
          <h1 class="text-4xl md:text-5xl font-bold text-black leading-tight">
            Sotuvchi Bo‘ling va Daromad Toping!
          </h1>
          <p class="mt-4 text-lg text-gray-400">
            Mahsulotlaringizni millionlab mijozlarga soting va biznesingizni rivojlantiring.
          </p>
          <NuxtLink
            to="#register"
            class="mt-6 inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg bg-yellow-600 transition-transform transform hover:scale-105"
          >
            Hozir Boshlang
          </NuxtLink>
        </div>
        <div class="md:w-1/2 mt-8 md:mt-0 relative">
          <img
            src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
            alt="Sotuvchi platformasi"
            class="w-full rounded-lg shadow-2xl"
          />
          <!-- SVG Icon -->
          <div class="absolute top-4 right-4 w-12 h-12 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2z" />
              <path d="M12 22V15.5" />
              <path d="M22 8.5l-10 7" />
              <path d="M2 8.5l10 7" />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section id="benefits" class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-800 text-center mb-12">Nega Bizni Tanlash Kerak?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#EC4899" stroke-width="2">
                <path d="M12 1a7 7 0 0 0-7 7v8a7 7 0 0 0 14 0V8a7 7 0 0 0-7-7" />
                <path d="M12 9v4" />
                <path d="M12 15h.01" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800">Tez Sozlash</h3>
            <p class="mt-2 text-gray-600">Bir necha daqiqada do‘koningizni oching.</p>
          </div>
          <div class="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#EC4899" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800">Keng Mijozlar</h3>
            <p class="mt-2 text-gray-600">Mahsulotlaringizni millionlarga yetkazing.</p>
          </div>
          <div class="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#EC4899" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800">Yuqori Daromad</h3>
            <p class="mt-2 text-gray-600">Tez to‘lovlar bilan daromadingizni oshiring.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-800 text-center mb-12">Qanday Ishlaydi?</h2>
        <div class="space-y-12">
          <div class="flex flex-col md:flex-row items-center animate-fade-in">
            <div class="md:w-1/3">
              <img
                src="https://brainrain.com.ua/wp-content/uploads/2022/07/REGISTRATION-01.svg"
                alt="Ro‘yxatdan o‘tish"
                class="w-full rounded-lg shadow-md"
              />
            </div>
            <div class="md:w-2/3 md:pl-8 mt-4 md:mt-0">
              <div class="w-12 h-12 mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold text-gray-800">1. Ro‘yxatdan O‘tish</h3>
              <p class="mt-2 text-gray-600">Bepul hisob oching va sotuvchi bo‘ling.</p>
            </div>
          </div>
          <div class="flex flex-col md:flex-row-reverse items-center animate-fade-in">
            <div class="md:w-1/3">
              <img
                src="https://avatars.mds.yandex.net/i?id=5b4b1a52fe25ca8005f9d6e0c09bea5b_l-4937827-images-thumbs&n=13"
                alt="Mahsulot yuklash"
                class="w-full rounded-lg shadow-md"
              />
            </div>
            <div class="md:w-2/3 md:pr-8 mt-4 md:mt-0">
              <div class="w-12 h-12 mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 3h18v18H3z" />
                  <path d="M12 8v8" />
                  <path d="M8 12h8" />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold text-gray-800">2. Mahsulot Yuklash</h3>
              <p class="mt-2 text-gray-600">Mahsulotlaringizni osongina ro‘yxatga qo‘shing.</p>
            </div>
          </div>
          <div class="flex flex-col md:flex-row items-center animate-fade-in">
            <div class="md:w-1/3">
              <img
                src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Sotish"
                class="w-full rounded-lg shadow-md"
              />
            </div>
            <div class="md:w-2/3 md:pl-8 mt-4 md:mt-0">
              <div class="w-12 h-12 mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold text-gray-800">3. Sotishni Boshlash</h3>
              <p class="mt-2 text-gray-600">Buyurtmalarni qabul qiling va daromad oling.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-800 text-center mb-12">Sotuvchilarimiz Fikri</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 mx-auto mb-4 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 21v-4a4 4 0 0 1 4-4h5" />
                <path d="M12 21v-4a4 4 0 0 1 4-4h5" />
              </svg>
            </div>
            <p class="text-gray-600 italic text-center">
              “Market111 bilan sotish oson va foydali. Daromadim sezilarli oshdi!”
            </p>
            <div class="mt-4 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                alt="Sotuvchi"
                class="w-12 h-12 rounded-full mr-2"
              />
              <div>
                <p class="font-semibold text-gray-800">Jamol Xasanov</p>
                <p class="text-sm text-gray-500">Kiyim Sotuvchisi</p>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 mx-auto mb-4 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 21v-4a4 4 0 0 1 4-4h5" />
                <path d="M12 21v-4a4 4 0 0 1 4-4h5" />
              </svg>
            </div>
            <p class="text-gray-600 italic text-center">
              “Platforma juda qulay, mijozlar ko‘p va to‘lovlar tez!”
            </p>
            <div class="mt-4 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                alt="Sotuvchi"
                class="w-12 h-12 rounded-full mr-2"
              />
              <div>
                <p class="font-semibold text-gray-800">Nargiza To‘rayeva</p>
                <p class="text-sm text-gray-500">Aksessuarlar Sotuvchisi</p>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 mx-auto mb-4 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 21v-4a4 4 0 0 1 4-4h5" />
                <path d="M12 21v-4a4 4 0 0 1 4-4h5" />
              </svg>
            </div>
            <p class="text-gray-600 italic text-center">
              “Tez qo‘llab-quvvatlash va ishonchli tizim. Juda mamnunman!”
            </p>
            <div class="mt-4 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                alt="Sotuvchi"
                class="w-12 h-12 rounded-full mr-2"
              />
              <div>
                <p class="font-semibold text-gray-800">Shaxzod Karimov</p>
                <p class="text-sm text-gray-500">Elektronika Sotuvchisi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section with Form -->
    <section id="register" class="py-16 bg-gradient-to-r from-button to-primary text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-4 text-gray-600">Bugun Sotuvchi Bo‘ling!</h2>
        <p class="text-lg mb-8 text-gray-600">Ro‘yxatdan o‘ting va biznesingizni yangi bosqichga olib chiqing.</p>
        <form class="max-w-md mx-auto space-y-4">
          <div>
            <input
              type="text"
              placeholder="Ismingiz"
              class="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent border border-gray-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              class="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent border border-gray-500"
              required
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="Telefon Raqamingiz"
              class="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent border border-gray-500"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full px-8 py-3 bg-accent text-white font-semibold rounded-lg bg-yellow-600 transition-transform transform hover:scale-105"
          >
            Ro‘yxatdan O‘tish
          </button>
        </form>
      </div>
    </section>


  </div>
</template>