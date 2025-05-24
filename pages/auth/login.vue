<template>
  <section
    class="bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Kirish
      </h1>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700"
            >Foydalanuvchi nomi</label
          >
          <input
            v-model="username"
            id="username"
            type="text"
            class="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            placeholder="Foydalanuvchi nomini kiriting"
            aria-label="Foydalanuvchi nomi"
            required
          />
          <p v-if="errors.username" class="mt-1 text-xs text-red-600">
            {{ errors.username }}
          </p>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Parol</label
          >
          <input
            v-model="password"
            id="password"
            type="password"
            class="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            placeholder="Parolni kiriting"
            aria-label="Parol"
            required
          />
          <p v-if="errors.password" class="mt-1 text-xs text-red-600">
            {{ errors.password }}
          </p>
        </div>
        <div v-if="error" class="text-red-600 text-sm text-center">
          {{ error }}
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-sm font-medium"
        >
          {{ loading ? "Kirilmoqda..." : "Kirish" }}
        </button>
      </form>
      <p class="mt-4 text-sm text-gray-600 text-center">
        Hisobingiz yo‘qmi?
        <nuxt-link
          to="./register"
          class="text-indigo-600 hover:text-indigo-800 font-medium"
          >Ro‘yxatdan o‘tish</nuxt-link
        >
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const loading = ref(false);
const error = ref(null);
const errors = ref({});
const router = useRouter();
const accessToken = ref(null)
const user = ref(null)


const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (!username.value) {
    errors.value.username = "Foydalanuvchi nomi kiritilishi shart";
    isValid = false;
  }
  if (!password.value) {
    errors.value.password = "Parol kiritilishi shart";
    isValid = false;
  }

  return isValid;
};

const handleLogin = async () => {
  if (!validateForm()) return;

  loading.value = true;
  error.value = null;

  try {
    const res = await fetch(`${BASE_URL}token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    if (!res.ok) {
      throw new Error("Foydalanuvchi nomi yoki parol noto‘g‘ri.");
    }

    const data = await res.json();
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);

    router.push("/"); // Login muvaffaqiyatli bo‘lsa bosh sahifaga yo‘naltiramiz
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  accessToken.value = localStorage.getItem("access_token");
  user.value = Number(localStorage.getItem("user"));
  if (accessToken.value || user.value) {
    router.push("/");
    return;
  }
});
</script>

<style scoped>
/* No additional styles needed as Tailwind handles everything */
</style>
