<template>
  <div class="container mx-auto px-4 pb-12">
    <!-- Sarlavha -->
    <h2
      class="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center md:text-left"
    >
      Eng mashhurlar
    </h2>

    <!-- Yuklanmoqda / Xatolik / Mahsulotlar -->
    <div v-if="loading" class="text-center text-gray-500">Yuklanmoqda...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="overflow-hidden group flex flex-col gap-2"
      >
        <nuxt-link :to="`/product/${product.id}`">
          <img
            :src="getImageUrl(product.image)"
            :alt="product.title"
            class="rounded-lg w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </nuxt-link>

        <nuxt-link
          :to="`/product/${product.id}`"
          class="text-xs sm:text-sm text-gray-800 font-semibold hover:text-green-600 transition-colors"
        >
          {{ product.title }}
        </nuxt-link>

        <div class="flex items-center gap-1 mb-2">
          <div class="flex items-center gap-1 mb-2">
            <svg
              class="w-4 h-4 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
            <p class="text-[10px] sm:text-xs text-gray-400 flex items-center">
              <span v-if="product.averageRating" class="flex items-center">
                {{ product.averageRating }} ({{ product.commentsCount }} izoh)
              </span>
              <span v-else> (0 izoh) </span>
            </p>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div>
            <p
              class="font-bold text-[10px] sm:text-xs text-gray-500 line-through"
            >
              {{ product.price + 10000 }} so‘m
            </p>
            <p class="font-bold text-xs sm:text-sm">{{ product.price }} so‘m</p>
          </div>
          <div
            @click="handleAddToCart(product.id)"
            class="p-1 border border-gray-400 rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <svg
              class="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCart } from "@/composables/useCart";

const { addToCart } = useCart();

const router = useRouter();

const products = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchProducts = async () => {
  try {
    // Mahsulotlar va sharhlar olish
    const [productsRes, reviewsRes] = await Promise.all([
      fetch(`${BASE_URL}products/`),
      fetch(`${BASE_URL}review_list/`),
    ]);

    if (!productsRes.ok || !reviewsRes.ok) throw new Error("Xatolik yuz berdi");

    const productsData = await productsRes.json();
    const reviewsData = await reviewsRes.json();

    // Har bir mahsulotga tegishli izohlar va reytinglarni hisoblash
    const productsWithRatings = productsData.results.map((product) => {
      const productReviews = reviewsData.filter(
        (review) => review.product.id === product.id
      );

      const commentsCount = productReviews.length;
      const averageRating =
        commentsCount > 0
          ? (
              productReviews.reduce((sum, r) => sum + r.rate, 0) / commentsCount
            ).toFixed(1)
          : null;

      return {
        ...product,
        commentsCount,
        averageRating,
      };
    });

    products.value = productsWithRatings;
  } catch (err) {
    error.value = "Ma'lumotlarni yuklashda xatolik yuz berdi!";
  } finally {
    loading.value = false;
  }
};

const getImageUrl = (path) => `${BASE_URL}${path}`;

const handleAddToCart = async (productId) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    router.push("/auth/login");
    return;
  }

  const success = await addToCart(productId);
  if (success) {
    alert("Mahsulot savatga qo‘shildi");
  } else {
    alert("Xatolik yuz berdi");
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
/* Tailwind ishlatiladi, qo‘shimcha style kerak emas */
</style>
