export const useProfile = async () => {
  const profile = ref(null)
  const error = ref(null)
  const loading = ref(true)

  const getProfile = async () => {
    try {
      loading.value = true
      error.value = null

      const token = localStorage.getItem('access_token')
      if (!token) {
        throw new Error('Token mavjud emas')
      }

      const { data, error: fetchError } = await useFetch(`${BASE_URL}profile/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      localStorage.setItem('role', data.value.role)
      localStorage.setItem('city', data.value.address)
      localStorage.setItem('user', data.value.id)
      

      

      if (fetchError.value) {
        throw new Error(fetchError.value.message || 'So‘rovda xatolik')
      }

      profile.value = data.value
    } catch (err) {
      error.value = err.message
      profile.value = null
    } finally {
      loading.value = false
    }
  }

  // Avtomatik chaqirish
  await getProfile()

  return {
    profile,
    error,
    loading,
    getProfile
  }
}
