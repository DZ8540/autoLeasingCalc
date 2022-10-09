<script lang="ts" setup>
// const props = defineProps({})
</script>

<template>
  <button class="Button font__medium font__nekst__black color__white">
    <slot>Button component</slot>
  </button>
</template>

<style>
.Button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 68px;
  background-color: #FF9514;
  /* padding: 0 92.5px; */
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
</style>