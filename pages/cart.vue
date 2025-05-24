<template>
  <div class="w-[90%] p-4 sm:p-6 mx-auto font-inter min-h-[300px] relative">
    <!-- Loader -->
    <div v-if="loading" class="flex justify-center items-center h-full">
      <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
    </div>

    <!-- Savat bosh yoki yuklanmagan holat -->
    <div v-else>
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-6" v-if="cartItems.length !== 0">
        Savatangiz,
        <span class="text-purple-600">{{ cartItems.length }} mahsulot</span>
      </h2>

      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Savat bo‘sh bo‘lsa -->
        <div v-if="cartItems.length === 0" class="w-full flex flex-col gap-4 items-center text-center justify-center h-full text-gray-500 text-lg font-semibold p-5">
          Savatingiz hozircha bo‘sh <br />
          <span class="text-[12px]">
            Bosh sahifadan boshlang — kerakli tovarni qidiruv orqali topishingiz yoki to‘plamlarni ko‘rishingiz mumkin
          </span>
          <nuxt-link to="/" class="px-3 py-2 rounded-[10px] bg-purple-500 text-white">Bosh sahifa</nuxt-link>
        </div>

        <!-- Mahsulotlar ro'yxati -->
        <div v-if="cartItems.length !== 0" class="flex-1 bg-white border border-gray-100 rounded-xl p-4 sm:p-6 shadow-sm transition-shadow hover:shadow-md min-h-[200px]">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <input type="checkbox" :checked="allSelected" @change="toggleSelectAll" class="w-5 h-5 accent-purple-600 focus:ring-2 focus:ring-purple-300 rounded" />
              <label class="font-medium text-gray-700">Hammasini yechish</label>
            </div>

            <div v-for="item in cartItems" :key="item.id" class="flex gap-4 border-t border-gray-100 pt-4">
              <input type="checkbox" :checked="selectedItems.includes(item.id)" @change="toggleItemSelection(item.id)" class="w-5 h-5 accent-purple-600 mt-2 focus:ring-2 focus:ring-purple-300 rounded" />
              <img :src="item.product.image" alt="product" class="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg" />
              <div class="flex-1">
                <p class="text-sm text-gray-500">Uzum Market omborida</p>
                <p class="font-semibold text-lg text-gray-800">24-maydan boshlab yetkazamiz</p>
                <p class="mt-1 text-gray-700">{{ item.product.title }}</p>
                <p class="text-sm text-gray-600 mt-1">
                  Sotuvchi:
                  <span class="font-medium">{{ item.product.vendor }}</span>
                </p>
                <div class="flex items-center gap-3 mt-3">
                  <button @click="updateQuantity(item, item.amount - 1)" class="border border-gray-300 rounded-lg px-3 py-1 text-gray-700 hover:bg-gray-100 transition">−</button>
                  <span class="text-gray-800 font-medium">{{ item.amount }}</span>
                  <button @click="updateQuantity(item, item.amount + 1)" class="border border-gray-300 rounded-lg px-3 py-1 text-gray-700 hover:bg-gray-100 transition">+</button>
                </div>
              </div>
              <div class="flex flex-col items-end justify-between">
                <button @click="removeItem(item.id)" class="text-gray-400 hover:text-red-500 text-sm flex items-center gap-1 transition">🗑 Yo‘q qilish</button>
                <p class="text-purple-600 font-bold text-lg">{{ (item.product.price || 0) * item.amount }} so'm</p>
                <p class="text-xs text-gray-500 italic">Arzon narx kafolati</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Buyurtma paneli -->
        <div v-if="cartItems.length !== 0" class="w-full lg:w-96 space-y-4">
          <div class="bg-white border border-gray-100 rounded-xl p-4 sm:p-6 shadow-sm transition-shadow hover:shadow-md">
            <p class="text-sm text-gray-700">
              Topshirish punktiga yetkazib berish
              <span class="font-bold text-gray-800">bepul</span>
            </p>
            <div class="h-3 bg-gray-100 rounded-full mt-3 overflow-hidden">
              <div class="h-3 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full w-full transition-all duration-300"></div>
            </div>
            <p class="text-xs text-gray-500 mt-2">50 000 so'mdan boshlab</p>
          </div>

          <div class="bg-white border border-gray-100 rounded-xl p-4 sm:p-6 shadow-sm transition-shadow hover:shadow-md">
            <p class="flex justify-between text-gray-700">
              <span>Tanlangan mahsulotlar ({{ selectedItems.length }}):</span>
              <span>{{ selectedTotal }} so'm</span>
            </p>
            <p class="flex justify-between font-semibold text-xl text-gray-800 mt-2">
              <span>Jami:</span>
              <span>{{ selectedTotal }} so'm</span>
            </p>
            <button :disabled="selectedItems.length === 0" @click="checkout" class="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg py-3 mt-4 hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
              Rasmiylashtirishga o‘tish
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Checkout Modal -->
    <div v-if="showModal" class="w-full h-screen fixed top-0 left-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-white w-[90%] max-w-md rounded-xl p-6 relative shadow-lg">
        <button @click="showModal = false" class="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl">×</button>
        <h3 class="text-xl font-bold text-gray-800 mb-4">Buyurtmani rasmiylashtirish</h3>
        <p class="text-gray-700 mb-2">
          Umumiy summa:
          <span class="text-purple-600 font-semibold text-lg">{{ selectedTotal }} so'm</span>
        </p>
        <label class="block mb-2 text-sm text-gray-700 font-medium">Yetkazib berish manzili:</label>
        <textarea v-model="address" rows="3" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-purple-300" placeholder="Masalan: Toshkent sh., Chilonzor t., 3-kvartal, uy 5"></textarea>
        <button @click="confirmOrder" class="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition">Buyurtmani yuborish</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const cartItems = ref([]);
const selectedItems = ref([]);
const loading = ref(true);
const showModal = ref(false);
const address = ref("");

const accessToken = ref(null);
const user = ref(null);
const headers = ref({});

const allSelected = computed(() => {
  return cartItems.value.length > 0 && selectedItems.value.length === cartItems.value.length;
});

const toggleSelectAll = () => {
  selectedItems.value = allSelected.value ? [] : cartItems.value.map((item) => item.id);
};

const toggleItemSelection = (id) => {
  const index = selectedItems.value.indexOf(id);
  if (index > -1) {
    selectedItems.value.splice(index, 1);
  } else {
    selectedItems.value.push(id);
  }
};

const selectedTotal = computed(() =>
  cartItems.value.reduce((sum, item) => {
    if (selectedItems.value.includes(item.id)) {
      return sum + (item.product?.price || 0) * item.amount;
    }
    return sum;
  }, 0)
);



const fetchCartItems = async () => {
  loading.value = true;
  try {
    const res = await fetch(`${BASE_URL}cartItems/`, {
      headers: headers.value,
    });
    const allItems = await res.json();
    const userItems = allItems.filter((item) => item.profile === user.value);
    const itemsWithProducts = await Promise.all(
      userItems.map(async (item) => {
        const productRes = await fetch(`${BASE_URL}products/${item.product}/`, {
          headers: headers.value,
        });
        const productData = await productRes.json();
        return { ...item, product: productData };
      })
    );
    cartItems.value = itemsWithProducts;
    selectedItems.value = itemsWithProducts.map((item) => item.id);
  } catch (err) {
    console.error("CartItems olishda xatolik:", err);
  } finally {
    loading.value = false;
  }
};

const removeItem = async (itemId) => {
  try {
    await fetch(`${BASE_URL}cartItems/${itemId}/`, {
      method: "DELETE",
      headers: headers.value,
    });
    await fetchCartItems();
  } catch (err) {
    console.error("Mahsulotni o'chirishda xatolik:", err);
  }
};

const updateQuantity = async (item, newAmount) => {
  if (newAmount < 1) return;
  try {
    await fetch(`${BASE_URL}cartItems/${item.id}/`, {
      method: "PATCH",
      headers: { ...headers.value, "Content-Type": "application/json" },
      body: JSON.stringify({ amount: newAmount }),
    });
    await fetchCartItems();
  } catch (err) {
    console.error("Miqdorni yangilashda xatolik:", err);
  }
};

const checkout = () => {
  if (selectedItems.value.length > 0) showModal.value = true;
};

const confirmOrder = async () => {
  if (!address.value.trim()) {
    alert("Iltimos, manzilni kiriting");
    return;
  }

  try {
    // 1. Buyurtmani yaratish
    const orderRes = await fetch(`${BASE_URL}orders/`, {
      method: "POST",
      headers: {
        ...headers.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: address.value,
        total_price: selectedTotal.value,
        status: "PENDING",
        profile: user.value,
      }),
    });

    if (!orderRes.ok) throw new Error("Buyurtma yaratilmadi");

    const orderData = await orderRes.json();
    const orderId = orderData.id;

    // 2. Har bir tanlangan mahsulot uchun orderItem yaratish
    for (const item of cartItems.value) {
      if (selectedItems.value.includes(item.id)) {
        await fetch(`${BASE_URL}orderItems/`, {
          method: "POST",
          headers: {
            ...headers.value,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: item.amount,
            order: orderId,
            product: item.product.id,
          }),
        });
      }
    }

    // 3. Tanlangan mahsulotlarni savatdan o‘chirish
    for (const id of selectedItems.value) {
      await fetch(`${BASE_URL}cartItems/${id}/`, {
        method: "DELETE",
        headers: headers.value,
      });
    }

    alert("Buyurtma muvaffaqiyatli yuborildi!");
    showModal.value = false;
    address.value = "";
    await fetchCartItems(); // UI yangilanishi uchun

  } catch (err) {
    console.error("Buyurtma yuborishda xatolik:", err);
    alert("Buyurtmani yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.");
  }
};



onMounted(() => {
  accessToken.value = localStorage.getItem("access_token");
  user.value = Number(localStorage.getItem("user"));
  if (!accessToken.value || !user.value) {
    alert("Iltimos, tizimga kiring");
    router.push("/auth/login");
    return;
  }
  headers.value = { Authorization: `Bearer ${accessToken.value}` };
  fetchCartItems();
});
</script>

<style>
.loader {
  border-top-color: #6366f1;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
