<template>
  <div
    class="map-container rounded shadow"
    ref="mapRef"
    style="height: 700px"
  ></div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { loadGoogleMaps, showUserLocation } from "@/utils/googleMapUtils";

const props = defineProps({
  places: Array,
});
const mapRef = ref(null);
let map = null;
let markers = [];

const config = useRuntimeConfig();
const apiKey = config.public.googleMapsApiKey;

const initMap = () => {
  map = new google.maps.Map(mapRef.value, {
    center: { lat: 13.754946445780057, lng: 100.50648399270706 },
    zoom: 10,
  });
};

const addMarkers = (places) => {
  markers.forEach((m) => m.setMap(null));
  markers = [];

  places.forEach((place) => {
    const lat = place.geometry?.location?.lat;
    const lng = place.geometry?.location?.lng;

    if (!lat || !lng) return;

    const marker = new google.maps.Marker({
      position: { lat, lng },
      map,
      title: place.name,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="font-size:14px;">
          <strong>${place.name}</strong><br/>
          ${place.formatted_address}
        </div>
      `,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });

    markers.push(marker);
  });

  if (places[0]) {
    const { lat, lng } = places[0].geometry.location;
    map.setCenter({ lat, lng });
    map.setZoom(14);
  }
};

onMounted(async () => {
  await loadGoogleMaps(apiKey);
  initMap();
  showUserLocation(map);
});

watch(
  () => props.places,
  (newPlaces) => {
    if (newPlaces && newPlaces.length > 0) {
      addMarkers(newPlaces);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
