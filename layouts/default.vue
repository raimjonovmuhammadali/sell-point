<template>
  <div class="min-h-screen bg-gray-50">
    <LayoutsHeader/>

    <slot/>
    
    <LayoutsFooter/>
  </div>
</template>

<script setup>

useHead({
  title: 'SELL-POINT'
})


</script>

<style>
/* Tailwind CSS loyiha konfiguratsiyasi orqali qo‘llaniladi */
</style>