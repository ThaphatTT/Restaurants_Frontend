<template>
  <div class="d-flex gap-2 mb-4">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      class="form-control"
      placeholder="ค้นหาร้านอาหารที่คุณต้องการ ...."
    />
    <button @click="$emit('search')" class="btn btn-primary">ค้นหา</button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
});
defineEmits(["update:modelValue", "search"]);
</script>
