<template>
  <main class="min-h-screen bg-light py-5">
    <div class="container">
      <MainPage />
      <slot />
    </div>
  </main>
</template>

<script setup>
import MainPage from "@/pages/index.vue";
</script>
