<script setup>
import { ref } from "vue";
import SearchSection from "@/components/main/search.vue";
import MapSection from "@/components/main/map.vue";
import { useSearchRestaurants } from "@/composables/useSearchRestaurants";

const keyword = ref("");
const { results, loading, error, searchRestaurants } = useSearchRestaurants();

const search = () => {
  if (!keyword.value.trim()) {
    alert("กรุณากรอกคำค้น");
    results.value = [];
    return;
  }

  searchRestaurants(keyword.value);
};
</script>

<template>
  <div class="container py-4">
    <SearchSection v-model="keyword" @search="search" />
    <MapSection :places="results" />
  </div>
</template>
