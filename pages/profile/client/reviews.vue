<template>
  <div class="p-4">
    <div class="flex gap-4 mb-4">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-4 py-2 rounded-md text-sm',
          activeTab === tab.id
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-200 text-gray-800',
        ]"
      >
        {{ tab.name }}
      </button>
    </div>

    <div v-if="currentOrders.length" class="space-y-6">
      <div
        v-for="order in currentOrders"
        :key="order.id"
        class="bg-white p-4 rounded-lg shadow-sm"
      >
        <div class="mb-2 text-sm text-gray-500">
          Manzil: {{ order.address }}
        </div>
        <div class="mb-2 text-sm text-gray-500">
          Sana: {{ formatDate(order.date) }}
        </div>

        <ul class="space-y-2">
          <li
            v-for="item in order.items"
            :key="item.id"
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-3 last:border-b-0"
          >
            <div class="flex gap-2 items-center">
              <img
                :src="BASE_URL + item.product.image"
                alt=""
                class="w-[50px]"
              />
              <div>
                <p class="text-sm font-medium text-gray-800">
                  {{ item.product.name }}
                </p>
                <p class="text-xs text-gray-600">
                  {{ item.quantity }} dona - {{ item.total_price }} so‘m
                </p>
              </div>
            </div>

            <div
              v-if="!item.review && activeTab === 'pending'"
              class="mt-2 sm:mt-0"
            >
              <button
                @click="openModal(order, item)"
                class="bg-indigo-600 text-white px-4 py-1 rounded-md text-sm hover:bg-indigo-700 transition"
              >
                Sharh qoldirish
              </button>
            </div>

            <div
              v-else-if="item.review"
              class="text-sm text-green-600 mt-2 sm:mt-0"
            >
              Baholangan ({{ item.review.rate }}★) — "{{ item.review.comment }}"
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-else class="text-center text-gray-500">Buyurtmalar topilmadi.</div>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 shadow-md"
    >
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 class="text-lg font-semibold mb-4">Mahsulotni baholang</h2>
        <div class="flex gap-1">
          <span
            v-for="star in 5"
            :key="star"
            class="cursor-pointer text-2xl"
            :class="star <= rating ? 'text-yellow-400' : 'text-gray-300'"
            @click="rating = star"
          >
            ★
          </span>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Sharhingiz:</label>
          <textarea
            v-model="reviewText"
            class="w-full border px-2 py-1 rounded-md outline-none"
          ></textarea>
        </div>
        <div class="flex justify-end gap-2">
          <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded-md">
            Bekor qilish
          </button>
          <button
            @click="submitReview"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Yuborish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

definePageMeta({ layout: "client" });

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString("uz-UZ", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const tabs = ref([
  { id: "pending", name: "Baholashni kutayapti" },
  { id: "completed", name: "Baholangan" },
]);

const activeTab = ref("pending");
const pendingOrders = ref([]);
const completedOrders = ref([]);
const currentOrders = computed(() =>
  activeTab.value === "pending" ? pendingOrders.value : completedOrders.value
);

const isModalOpen = ref(false);
const selectedOrder = ref(null);
const selectedItem = ref(null);
const rating = ref(0);
const reviewText = ref("");

function openModal(order, item) {
  selectedOrder.value = order;
  selectedItem.value = item;
  rating.value = 0;
  reviewText.value = "";
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

async function fetchOrders() {
  const userId = Number(localStorage.getItem("user"));
  if (!userId) return;

  const [ordersRes, itemsRes, productsRes, reviewsRes] = await Promise.all([
    fetch(BASE_URL + "/orders/"),
    fetch(BASE_URL + "/orderItems/"),
    fetch(BASE_URL + "/products/"),
    fetch(BASE_URL + "/review_list/"),
  ]);

  const orders = await ordersRes.json();
  const items = await itemsRes.json();
  const products = (await productsRes.json()).results || [];
  const reviews = await reviewsRes.json();

  const userReviews = reviews.filter((r) => r.user.id === userId);
  const completed = orders.filter(
    (o) => o.status === "COMPLETED" && o.profile === userId
  );

  const enrichedOrders = completed.map((order) => {
    const orderItems = items
      .filter((item) => item.order === order.id)
      .map((item) => {
        const product = products.find((p) => p.id === item.product);
        const review = userReviews.find(
          (r) => r.product.id === item.product && r.order === order.id
        );
        return {
          id: item.id,
          quantity: item.amount,
          total_price: product ? product.price * item.amount : 0,
          product: product || { name: "Noma’lum mahsulot", price: 0 },
          review,
        };
      });

    return {
      id: order.id,
      address: order.address,
      date: order.updated_date,
      items: orderItems,
    };
  });

  pendingOrders.value = enrichedOrders.filter((order) =>
    order.items.some((item) => !item.review)
  );
  completedOrders.value = enrichedOrders.filter((order) =>
    order.items.every((item) => item.review)
  );
}

async function submitReview() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const userId = Number(localStorage.getItem("user"));
  if (!selectedOrder.value || !selectedItem.value || !userId) return;

  const payload = {
    user: userId,
    product: selectedItem.value.product.id,
    comment: reviewText.value,
    rate: rating.value,
    order: selectedOrder.value.id,
  };

  try {
    const response = await fetch(BASE_URL + "/review_create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Server error");

    closeModal();
    alert("Sharh muvaffaqiyatli yuborildi!");
    await fetchOrders();
  } catch (error) {
    console.error("Review yuborishda xatolik:", error);
  }
}

onMounted(fetchOrders);
</script>
