export const useProducts = () => {
  const products = ref([])
  const userProducts = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const getProducts = async () => {
    isLoading.value = true
    error.value = null
    try {
      const { data } = await useFetch(`${BASE_URL}products/`)
      products.value = data.value?.results || []

      // Localdagi foydalanuvchi ID ni olish (misol: localStorage yoki cookie)
      const userId = parseInt(localStorage.getItem('user'))

      // Faqat shu userga tegishli mahsulotlar
      userProducts.value = products.value.filter(product => product.user === userId)
      
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  return {
    products,
    userProducts,
    isLoading,
    error,
    getProducts
  }
}
