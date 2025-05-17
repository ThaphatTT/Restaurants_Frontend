import { ref } from "vue";
import { useRuntimeConfig } from "#imports";

export function useSearchRestaurants() {
  const results = ref([]);
  const loading = ref(false);
  const error = ref("");

  const searchRestaurants = async (keyword) => {
    loading.value = true;
    error.value = "";
    results.value = [];

    try {
      const config = useRuntimeConfig();
      const baseUrl = config.public.apiBaseUrl;

      const response = await $fetch(`${baseUrl}/search`, {
        params: { keyword },
      });
      console.log(response);

      results.value = response.results || [];
    } catch (err) {
      console.error(err);
      error.value = "เกิดข้อผิดพลาดในการค้นหา";
    } finally {
      loading.value = false;
    }
  };

  return {
    results,
    loading,
    error,
    searchRestaurants,
  };
}
