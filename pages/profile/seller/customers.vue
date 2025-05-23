<script setup>

definePageMeta({
    layout: 'profile'
})

</script>
<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <AdminHeader />
    <main class="flex-1 p-6 container mx-auto">
      <LayoutsProfileSellersHeader />
      <LayoutsProfileSellersBreadcrumb />
      <LayoutsProfileSellersCustomers />
    </main>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
