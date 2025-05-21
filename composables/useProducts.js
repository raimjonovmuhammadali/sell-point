// composables/useProfile.js
import { ref } from 'vue'
import { BASE_URL } from './useApi'

export const useProducts = () => {
  const productsdata = useState('products', () => null)
  const error = useState('producterror', () => null)
  const loading = useState('productloading', () => false)

  const fetchProducts = async () => {

    loading.value = true
    try {
      const res = await fetch(`${BASE_URL}/products/`)

      if (!res.ok) {
        throw new Error('Ma’lumot yuklanmadi')
      }

      const data = await res.json()
      productsdata.value = data
    } catch (err) {
      error.value = err.message || 'Xatolik yuz berdi'
    } finally {
      loading.value = false
    }
  }

  return { productsdata, error, loading, fetchProducts }
}