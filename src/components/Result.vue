<script lang="ts" setup>
// const props = defineProps({})
</script>

<template>
  <div class="Result">

    <span class="Result__title color__gray font__text font__gilroy__regular">
      <slot>Result component</slot>
    </span>

    <span class="color__black font__title font__nekst__black">
      <slot name="cost">Result component cost</slot>
    </span>

  </div>
</template>

<style>
.Result__title {
  display: block;
  margin-bottom: 8px;
}
</style>