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
</style>