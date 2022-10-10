<script lang="ts" setup>
// * Components
import Loader from '@/components/Loader.vue'
// * Components

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  loaderSize: Number,
})
</script>

<template>
  <button class="Button font__medium font__nekst__black color__white" :disabled="props.isLoading">
    <Loader v-if="props.isLoading" :size="loaderSize" />
    
    <slot v-else>Button component</slot>
  </button>
</template>

<style>
.Button {
  --padding: 24px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 68px;
  width: 100%;
  background-color: #FF9514;
  padding: 0 var(--padding);
  border-radius: 40px;
}

.Button:hover {
  background-color: #111;
}

.Button:active {
  background-color: #575757;
}

.Button:disabled {
  background: rgba(255, 149, 20, 0.4);
}

/* 
  * Breakpoints
*/

@media (max-width: 800px) {
  .Button {
    width: unset;
  }
}

@media (max-width: 500px) {
  .Button {
    width: 100%;
    height: 60px;
  }
}
</style>