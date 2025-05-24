<template>
  <section class="w-[90%] mx-auto py-10 px-4 md:px-8">
    <div class="flex flex-col md:flex-row gap-10">
      <!-- Rasm va izohlar chap tomonda -->
      <div class="md:w-2/3">
        <!-- Mahsulot rasmi -->
        <div class="w-full flex justify-center items-center mb-6">
          <img
            :src="product.image"
            :alt="product.title"
            class="rounded-lg shadow-lg w-full max-w-2xl h-auto object-cover"
          />
        </div>

        <!-- Izohlar -->
        <div class="bg-white p-6 rounded-2xl shadow-lg">
          <h2 class="text-2xl font-semibold text-gray-900 mb-6">
            Foydalanuvchi izohlari
          </h2>

          <!-- Empty State -->
          <div v-if="feedbacks.length === 0" class="text-center py-8">
            <p class="text-gray-500 text-sm">Izohlar mavjud emas.</p>
          </div>

          <!-- Carousel -->
          <div v-else class="relative">
            <!-- Carousel Items -->
            <div class="overflow-hidden">
              <div
                class="flex transition-transform duration-500 ease-in-out"
                :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
              >
                <div
                  v-for="(feedback, index) in feedbacks"
                  :key="index"
                  class="min-w-full px-4"
                >
                  <div
                    class="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100"
                  >
                    <div
                      class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3"
                    >
                      <span class="text-gray-800 font-semibold text-base">{{
                        feedback.user
                      }}</span>
                      <div class="flex mt-2 sm:mt-0">
                        <svg
                          v-for="i in 5"
                          :key="i"
                          class="w-5 h-5"
                          :class="{
                            'text-yellow-400': i <= feedback.rating,
                            'text-gray-300': i > feedback.rating,
                          }"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                          />
                        </svg>
                      </div>
                    </div>
                    <span
                      class="text-gray-400 text-xs font-medium block mb-2"
                      >{{ feedback.date }}</span
                    >
                    <p class="text-gray-600 text-sm leading-relaxed">
                      {{ feedback.comment }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation Arrows -->
            <button
              v-if="feedbacks.length > 1"
              @click="prevSlide"
              class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors duration-300 focus:outline-none"
              :disabled="currentIndex === 0"
              :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              v-if="feedbacks.length > 1"
              @click="nextSlide"
              class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors duration-300 focus:outline-none"
              :disabled="currentIndex === feedbacks.length - 1"
              :class="{
                'opacity-50 cursor-not-allowed':
                  currentIndex === feedbacks.length - 1,
              }"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <!-- Dots (Pagination) -->
            <div
              v-if="feedbacks.length > 1"
              class="flex justify-center mt-4 space-x-2"
            >
              <button
                v-for="(feedback, index) in feedbacks"
                :key="index"
                @click="currentIndex = index"
                class="w-3 h-3 rounded-full transition-colors duration-300"
                :class="{
                  'bg-indigo-600': currentIndex === index,
                  'bg-gray-300': currentIndex !== index,
                }"
              ></button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tafsilotlar o‘ng tomonda -->
      <div class="md:w-1/3">
        <!-- Breadcrumb va tafsilotlar -->
        <nav class="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-2">
            <li>
              <nuxt-link to="/" class="hover:text-green-600 font-semibold"
                >Bosh sahifa</nuxt-link
              >
              <span class="text-gray-300 mx-2">/</span>
            </li>
            <li v-if="category">
              <nuxt-link
                :to="`/category/${category.id}`"
                class="hover:text-green-600 font-semibold truncate max-w-[150px] block"
                :title="category.name"
              >
                {{ category.name }}
              </nuxt-link>
              <span class="text-gray-300 mx-2">/</span>
            </li>
            <li
              class="text-gray-700 font-semibold truncate max-w-[200px]"
              :title="product.title"
            >
              {{ product.title }}
            </li>
          </ol>
        </nav>

        <div v-if="loading" class="text-center text-gray-500 text-lg py-10">
          Yuklanmoqda...
        </div>
        <div v-else-if="error" class="text-center text-red-500 text-lg py-10">
          {{ error }}
        </div>
        <div v-else>
          <h1 class="text-2xl font-extrabold text-gray-900 mb-4">
            {{ product.title }}
          </h1>

          <div class="mb-6">
            <p class="text-gray-400 line-through text-lg">
              {{ product.price + 10000 }} so‘m
            </p>
            <p class="text-3xl font-extrabold text-green-600">
              {{ product.price }} so‘m
            </p>
          </div>

          <p class="text-gray-700 leading-relaxed mb-6">
            {{
              product.description ||
              "Ushbu mahsulot haqida hozircha tavsif mavjud emas."
            }}
          </p>

          <div class="flex gap-4 items-center mb-4">
            <button
              @click="buyNow"
              class="flex-1 bg-[#E6E8ED] text-black py-3 rounded-lg shadow-md transition"
              type="button"
            >
              1 bosishda xarid qiling
            </button>
          </div>

          <button
            @click="addToCart(product.id)"
            class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-lg shadow-lg transition"
            type="button"
          >
            Savatga qo‘shish
          </button>
        </div>
      </div>
    </div>
    <layouts-similar />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const currentIndex = ref(0);

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const nextSlide = () => {
  if (currentIndex.value < feedbacks.value.length - 1) {
    currentIndex.value++;
  }
};
const route = useRoute();

const product = ref({});
const category = ref(null);
const feedbacks = ref([]);
const loading = ref(true);
const error = ref(null);
const isFavorite = ref(false);

const fetchReviews = async (productId) => {
  try {
    const res = await fetch(`${BASE_URL}review_list/`);
    if (!res.ok) throw new Error();
    const data = await res.json();

    const filtered = data.filter((item) => item.product.id === productId);

    const enriched = filtered.map((item) => {
      return {
        comment: item.comment,
        rating: item.rate,
        date: new Date(item.created_date).toLocaleDateString("uz-UZ", {
          day: "numeric",
          month: "long",
        }),
        user:
          `${item.user.first_name} ${item.user.last_name}` ||
          `Foydalanuvchi #${item.user.id}`,
      };
    });

    feedbacks.value = enriched;
  } catch (err) {
    console.error("Sharhlarni olishda xatolik:", err);
  }
};

// Mahsulot yuklaganda sharhlarni ham olib kelish
const fetchProduct = async (id) => {
  loading.value = true;
  error.value = null;
  try {
    const res = await fetch(`${BASE_URL}products/${id}/`);
    if (!res.ok) throw new Error("Mahsulot topilmadi");
    const data = await res.json();
    product.value = data;

    const catRes = await fetch(`${BASE_URL}categories/${data.category}`);
    if (catRes.ok) category.value = await catRes.json();

    await fetchReviews(data.id);
  } catch (err) {
    error.value = "Mahsulotni yuklashda xatolik yuz berdi!";
  } finally {
    loading.value = false;
  }
};

// Foydalanuvchi ismini olish
const fetchUserName = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}profiles/${userId}/`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.full_name || `Foydalanuvchi #${userId}`;
  } catch {
    return `Foydalanuvchi #${userId}`;
  }
};

const addToCart = async (productId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user) {
    router.push("/login");
    return;
  }

  const cartId = localStorage.getItem("cart_id");
  if (!cartId) {
    alert("Savatcha topilmadi");
    return;
  }

  try {
    await fetch(`${BASE_URL}cartItems/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summ: 0,
        amount: 1,
        product: productId,
        cart: Number(cartId),
      }),
    });
    alert("Mahsulot savatchaga qo‘shildi");
  } catch (e) {
    alert("Xatolik yuz berdi: mahsulotni savatchaga qo‘shib bo‘lmadi");
  }
};

const buyNow = () => alert(`Xarid qilish uchun: ${product.value.title}`);

onMounted(() => {
  fetchProduct(route.params.id);
});
</script>
