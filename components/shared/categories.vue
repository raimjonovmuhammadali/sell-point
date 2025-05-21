<script setup>
import { ref } from 'vue'
const config = useRuntimeConfig()

const data = ref([])  // Boshlang'ich qiymat bo'sh massiv
const error = ref(null)

const fetchData = async () => {
  try {
    const response = await useFetch(`${config.public.apiBase}/categories/`)
    
    // API javobini tekshirish
    console.log('API Response:', response.data)
    console.log(`${config.public.apiBase}/categories/`);
    

    if (response.data) {
      data.value = response.data  // faqat results ni saqlash
    } else {
      console.error('No results in the response.')
    }
  } catch (err) {
    error.value = err
    console.error('Error fetching data:', err)
  }
}

fetchData()

</script>

<template>
  <div class="container-fluid pt-5">
    <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4">
      <span class="bg-secondary pr-3">Categories</span>
    </h2>
    <div class="row px-xl-5 pb-3">
      <div
        v-for="category in data"
        class="col-lg-3 col-md-4 col-sm-6 pb-1"
      >
        <a class="text-decoration-none" href="#">
          <div class="cat-item img-zoom d-flex align-items-center mb-4">
            <div class="overflow-hidden" style="width: 100px; height: 100px">
              <img
                class="img-fluid"
                :src="category.image || '/placeholder.jpg'"
                alt="Category image"
              />
            </div>
            <div class="flex-fill pl-3">
              <h6>{{ category.name }}</h6>
              <small class="text-body">{{ category.products_count || 0 }} Products</small>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
