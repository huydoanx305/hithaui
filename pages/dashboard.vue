<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})
</script>

<template>
  <div class="dashboard-page">
    <NuxtPage />
  </div>
</template>
