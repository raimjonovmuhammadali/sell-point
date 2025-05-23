<template>
  <section id="products" class="mb-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Mahsulotlarni Boshqarish</h1>
    <div class="bg-white p-6 rounded-xl shadow-md">
      <div class="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h2 class="text-sm font-semibold text-gray-800">Mahsulotlar</h2>
        <div class="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Mahsulot qidirish..."
            class="border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />
          <button
            @click="openModal('add')"
            class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors duration-300"
          >
            Mahsulot Qo‘shish
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-gray-100 text-gray-600 text-sm">
              <th class="p-3 text-left">Rasm</th>
              <th class="p-3 text-left">Mahsulot</th>
              <th class="p-3 text-left">Narx</th>
              <th class="p-3 text-left">Zahira</th>
              <th class="p-3 text-left">Kategoriya</th>
              <th class="p-3 text-left">Harakatlar</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in filteredProducts"
              :key="product.id"
              class="border-b hover:bg-gray-50 transition-colors duration-200"
            >
              <td class="p-3">
                <img
                  :src="getImageUrl(product.image)"
                  :alt="product.title"
                  class="w-12 h-12 object-cover rounded-lg"
                />
              </td>
              <td class="p-3 text-xs text-gray-800">{{ product.title }}</td>
              <td class="p-3 text-xs text-gray-800">{{ product.price }} so‘m</td>
              <td class="p-3 text-xs text-gray-800">{{ product.piece }}</td>
              <td class="p-3 text-xs text-gray-800">
                {{ getCategoryName(product.category) }}
              </td>
              <td class="p-3">
                <button
                  @click="openModal('edit', product)"
                  class="text-blue-500 hover:text-blue-600 text-[10px] mr-2"
                >
                  Tahrirlash
                </button>
                <button
                  @click="deleteProduct(product.id)"
                  class="text-red-500 hover:text-red-600 text-[10px]"
                >
                  O‘chirish
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-between items-center mt-4">
        <p class="text-xs text-gray-600">
          Jami {{ filteredProducts.length }} mahsulotdan {{ filteredProducts.length }} ko‘rsatilmoqda
        </p>
        <div class="flex gap-2">
          <button class="px-3 py-1 border border-gray-300 rounded-lg text-xs hover:bg-gray-200">
            Oldingi
          </button>
          <button class="px-3 py-1 border border-gray-300 rounded-lg text-xs hover:bg-gray-200">
            Keyingi
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <transition name="modal">
      <div
        v-if="modalState.isOpen"
        class="w-full absolute top-0 backdrop-blur-sm flex items-center justify-center z-50"
        role="dialog"
        :aria-labelledby="modalState.mode === 'add' ? 'add-modal-title' : 'edit-modal-title'"
        aria-modal="true"
      >
        <transition name="modal-content">
          <div class="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg" v-if="modalState.isOpen">
            <h2
              :id="modalState.mode === 'add' ? 'add-modal-title' : 'edit-modal-title'"
              class="text-lg font-semibold text-gray-800 mb-4"
            >
              {{ modalState.mode === 'add' ? 'Yangi Mahsulot Qo‘shish' : 'Mahsulotni Tahrirlash' }}
            </h2>
            <form class="space-y-4">
              <div>
                <label class="text-xs text-gray-600">Mahsulot Nomi</label>
                <input
                  v-model="currentProduct.title"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Mahsulot nomi"
                />
              </div>
              <div>
                <label class="text-xs text-gray-600">Brend</label>
                <input
                  v-model="currentProduct.brand"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Brend"
                />
              </div>
              <div>
                <label class="text-xs text-gray-600">Tavsif</label>
                <textarea
                  v-model="currentProduct.description"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Tavsif"
                ></textarea>
              </div>
              <div>
                <label class="text-xs text-gray-600">Narx (so‘m)</label>
                <input
                  v-model.number="currentProduct.price"
                  type="number"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Narx"
                />
              </div>
              <div>
                <label class="text-xs text-gray-600">Zahira</label>
                <input
                  v-model.number="currentProduct.piece"
                  type="number"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Zahira"
                />
              </div>
              <div>
                <label class="text-xs text-gray-600">Shahar</label>
                <select
                  v-model="currentProduct.city"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Shahar tanlash"
                >
                  <option v-for="region in regions" :key="region" :value="region">
                    {{ region }}
                  </option>
                </select>
              </div>
              <div>
                <label class="text-xs text-gray-600">Kategoriya</label>
                <select
                  v-model="currentProduct.category"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Kategoriya tanlash"
                >
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                    {{ cat.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="text-xs text-gray-600">Foydalanuvchi ID</label>
                <input
                  v-model="currentProduct.user"
                  type="number"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readonly
                  aria-label="Foydalanuvchi ID"
                />
              </div>
              <div>
                <label class="text-xs text-gray-600">Rasm Yuklash</label>
                <input
                  type="file"
                  @change="handleImageUpload($event)"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs"
                  aria-label="Rasm yuklash"
                />
              </div>
              <div>
                <label class="text-xs text-gray-600">Holati</label>
                <select
                  v-model="currentProduct.status"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Mahsulot holatini tanlash"
                >
                  <option value="active" class="text-green-600">Aktiv</option>
                  <option value="inactive" class="text-red-600">Aktiv emas</option>
                </select>
              </div>
              <div class="flex justify-end gap-2">
                <button
                  type="button"
                  @click="closeModal"
                  class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-300"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  @click.prevent="modalState.mode === 'add' ? addProduct() : saveProduct()"
                  class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors duration-300"
                >
                  {{ modalState.mode === 'add' ? 'Qo‘shish' : 'Saqlash' }}
                </button>
              </div>
            </form>
          </div>
        </transition>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// O‘zbekiston viloyatlari ro‘yxati
const regions = ref([
  'Andijon',
  'Buxoro',
  'Farg‘ona',
  'Jizzax',
  'Xorazm',
  'Namangan',
  'Navoiy',
  'Qashqadaryo',
  'Qoraqalpog‘iston',
  'Samarqand',
  'Sirdaryo',
  'Surxondaryo',
  'Toshkent'
])

// Modal holati va joriy mahsulot
const modalState = ref({
  isOpen: false,
  mode: 'add' // 'add' yoki 'edit'
})
const currentProduct = ref({
  title: '',
  image: null,
  brand: '',
  description: '',
  price: 0,
  piece: 0,
  city: '',
  category: 0,
  user: 0,
  status: 'active'
})

// Mahsulotlar, kategoriyalar va localStorage ma’lumotlari
const products = ref([])
const categories = ref([])
const city = ref('Andijon') // Default value, updated in onMounted
const user = ref(0) // Default value, updated in onMounted

// Foydalanuvchi bo‘yicha filtrlangan mahsulotlar
const filteredProducts = computed(() => {
  return products.value.filter(product => product.user === user.value)
})

// Rasm URL’ini to‘liq shaklga keltirish
const getImageUrl = (imagePath) => {
  return imagePath ? `https://market111.pythonanywhere.com${imagePath}` : '/images/placeholder.jpg'
}

// Kategoriya nomini olish
const getCategoryName = (categoryId) => {
  const category = categories.value.find(cat => cat.id === categoryId)
  return category ? category.name : 'Noma’lum'
}

// Mahsulotni validatsiya qilish
const validateProduct = (product) => {
  const requiredFields = ['title', 'brand', 'description', 'price', 'piece', 'category', 'city']
  const missingFields = requiredFields.filter(field => !product[field] || product[field] === 0)
  return missingFields.length
    ? `Iltimos, quyidagi maydonlarni to‘ldiring: ${missingFields
        .map(field => field === 'piece' ? 'zahira' : field === 'city' ? 'shahar' : field)
        .join(', ')}`
    : null
}

// Modalni ochish
const openModal = (mode, product = null) => {
  modalState.value = { isOpen: true, mode }
  currentProduct.value = product
    ? { ...product, image: null } // Tahrirlashda yangi rasm yuklash uchun image ni null qilamiz
    : {
        title: '',
        image: null,
        brand: '',
        description: '',
        price: 0,
        piece: 0,
        city: city.value,
        category: 0,
        user: user.value,
        status: 'active'
      }
}

// Modalni yopish
const closeModal = () => {
  modalState.value.isOpen = false
  currentProduct.value = {
    title: '',
    image: null,
    brand: '',
    description: '',
    price: 0,
    piece: 0,
    city: city.value,
    category: 0,
    user: user.value,
    status: 'active'
  }
}

// Rasm yuklash
const handleImageUpload = (event) => {
  currentProduct.value.image = event.target.files[0] || null // File ob'ektini saqlaymiz
}

// Mahsulotlarni API’dan olish
const fetchProducts = async () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
  if (!token) {
    alert('Xato: Kirish tokeni topilmadi! Iltimos, tizimga qayta kiring.')
    return
  }
  if (!user.value) {
    alert('Xato: Foydalanuvchi ID topilmadi!')
    return
  }

  try {
    const response = await fetch('https://market111.pythonanywhere.com/products/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    products.value = data.results || []
  } catch (error) {
    console.error('Mahsulotlarni olishda xato:', error)
    products.value = [
      {
        id: 1,
        title: 'Namuna Mahsulot 1',
        image: '/images/product1.jpg',
        brand: 'Brand A',
        description: 'Mahsulot tavsifi 1',
        price: 29999,
        piece: 100,
        city: city.value,
        category: 1,
        user: user.value,
        status: 'active'
      },
      {
        id: 2,
        title: 'Namuna Mahsulot 2',
        image: '/images/product2.jpg',
        brand: 'Brand B',
        description: 'Mahsulot tavsifi 2',
        price: 49999,
        piece: 50,
        city: city.value,
        category: 2,
        user: user.value,
        status: 'inactive'
      }
    ]
  }
}

// Mahsulot qo‘shish
const addProduct = async () => {
  const validationError = validateProduct(currentProduct.value)
  if (validationError) {
    alert(validationError)
    return
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
  if (!token) {
    alert('Xato: Kirish tokeni topilmadi! Iltimos, tizimga qayta kiring.')
    return
  }

  const formData = new FormData()
  formData.append('title', currentProduct.value.title)
  formData.append('brand', currentProduct.value.brand)
  formData.append('description', currentProduct.value.description)
  formData.append('price', currentProduct.value.price)
  formData.append('piece', currentProduct.value.piece)
  formData.append('city', currentProduct.value.city)
  formData.append('category', currentProduct.value.category)
  formData.append('user', currentProduct.value.user)
  formData.append('status', currentProduct.value.status)
  if (currentProduct.value.image) {
    formData.append('image', currentProduct.value.image)
  }

  console.log('API’ga yuborilayotgan ma’lumotlar:', formData)

  try {
    const response = await fetch('https://market111.pythonanywhere.com/products/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    console.log('API javobi:', response)

    if (response.ok) {
      alert('Mahsulot muvaffaqiyatli qo‘shildi!')
      closeModal()
      await fetchProducts() // Yangi mahsulot qo‘shilgandan so‘ng ro‘yxatni yangilash
    } else {
      const errorData = await response.json()
      console.error('API xatosi:', errorData)
      alert(`Xato: ${errorData.message || 'Mahsulot qo‘shishda xato yuz berdi!'}`)
    }
  } catch (error) {
    console.error('API so‘rovida xato:', error)
    alert('Xato: Server bilan bog‘lanishda muammo yuz berdi!')
  }
}

// Mahsulotni saqlash (Tahrirlash)
const saveProduct = async () => {
  const validationError = validateProduct(currentProduct.value)
  if (validationError) {
    alert(validationError)
    return
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
  if (!token) {
    alert('Xato: Kirish tokeni topilmadi! Iltimos, tizimga qayta kiring.')
    return
  }

  const formData = new FormData()
  formData.append('title', currentProduct.value.title)
  formData.append('brand', currentProduct.value.brand)
  formData.append('description', currentProduct.value.description)
  formData.append('price', currentProduct.value.price)
  formData.append('piece', currentProduct.value.piece)
  formData.append('city', currentProduct.value.city)
  formData.append('category', currentProduct.value.category)
  formData.append('user', currentProduct.value.user)
  formData.append('status', currentProduct.value.status)
  if (currentProduct.value.image) {
    formData.append('image', currentProduct.value.image)
  }

  try {
    const response = await fetch(
      `https://market111.pythonanywhere.com/products/${currentProduct.value.id}/`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    )

    if (response.ok) {
      alert('Mahsulot muvaffaqiyatli yangilandi!')
      closeModal()
      await fetchProducts()
    } else {
      const errorData = await response.json()
      alert(`Xato: ${errorData.message || 'Mahsulot yangilashda xato yuz berdi!'}`)
    }
  } catch (error) {
    console.error('API so‘rovida xato:', error)
    alert('Xato: Server bilan bog‘lanishda muammo yuz berdi!')
  }
}

// Mahsulotni o‘chirish
const deleteProduct = async (productId) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
  if (!token) {
    alert('Xato: Kirish tokeni topilmadi! Iltimos, tizimga qayta kiring.')
    return
  }

  try {
    const response = await fetch(`https://market111.pythonanywhere.com/products/${productId}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.ok) {
      alert('Mahsulot muvaffaqiyatli o‘chirildi!')
      await fetchProducts()
    } else {
      const errorData = await response.json()
      alert(`Xato: ${errorData.message || 'Mahsulot o‘chirishda xato yuz berdi!'}`)
    }
  } catch (error) {
    console.error('API so‘rovida xato:', error)
    alert('Xato: Server bilan bog‘lanishda muammo yuz berdi!')
  }
}

// Kategoriyalarni va localStorage ma’lumotlarini olish
onMounted(async () => {
  // localStorage ni faqat browserda olish
  if (typeof window !== 'undefined') {
    city.value = localStorage.getItem('city') || 'Andijon'
    user.value = Number(localStorage.getItem('user')) || 0
  }

  try {
    const response = await fetch('https://market111.pythonanywhere.com/categories/')
    categories.value = await response.json()
  } catch (error) {
    console.error('Kategoriyalarni olishda xato:', error)
    categories.value = [
      { id: 1, name: 'Elektronika' },
      { id: 2, name: 'Kiyim' }
    ]
  }

  await fetchProducts() // Mahsulotlarni olish
})
</script>

<style scoped>
/* Jadval va modal uchun qo‘shimcha uslublar */
select option {
  background: white;
}
textarea {
  resize: vertical;
  min-height: 80px;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-content-enter-active,
.modal-content-leave-active {
  transition: transform 0.2s ease;
}
.modal-content-enter-from,
.modal-content-leave-to {
  transform: translateY(-20px);
}
</style>