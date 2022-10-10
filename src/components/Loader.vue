<script lang="ts" setup>
const props = defineProps({
  size: {
    type: Number,
    default: 21,
  },
})
</script>

<template>
  <div class="Loader" :style="{ width: props.size, height: props.size }">
    <div :style="{ width: props.size, height: props.size }"></div>
    <div :style="{ width: props.size, height: props.size }"></div>
    <div :style="{ width: props.size, height: props.size }"></div>
    <div :style="{ width: props.size, height: props.size }"></div>
  </div>
</template>

<style>
.Loader {
  display: inline-block;
  position: relative;
  width: 21px;
  height: 21px;
}

.Loader div {
  display: block;
  position: absolute;
  width: 21px;
  height: 21px;
  border: 2px solid #fff;
  border-radius: 50%;
  animation: rotating 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}

.Loader div:nth-child(1) {
  animation-delay: -0.45s;
}

.Loader div:nth-child(2) {
  animation-delay: -0.3s;
}

.Loader div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>