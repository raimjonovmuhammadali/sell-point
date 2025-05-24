<template>
  <div class="min-h-screen bg-gray-50">
    <LayoutsHeader/>

    <slot/>
    
    <LayoutsFooter/>
  </div>
</template>

<script setup>
const { profile } = await useProfile()
import { useCart } from '@/composables/useCart'

useHead({
  title: 'SELL-POINT'
})

onMounted(() => {
  profile
})


</script>

<style>
/* Tailwind CSS loyiha konfiguratsiyasi orqali qo‘llaniladi */
</style>