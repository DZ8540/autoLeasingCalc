<script lang="ts" setup></script>

<template>
  <div class="Result">

    <span class="Result__title color__gray font__text font__gilroy__regular">
      <slot>Result component</slot>
    </span>

    <span class="Result__cost color__black font__title font__nekst__black">
      <slot name="cost">Result component cost</slot>
    </span>

  </div>
</template>

<style>
.Result__title {
  display: block;
  margin-bottom: 8px;
}

/* 
  * Breakpoints
*/

@media (max-width: 500px) {
  .Result__title {
    margin-bottom: 0;
  }

  .Result__cost {
    font-size: 22px !important;
  }
}
</style>