<script lang="ts" setup>
// * Types
import type { PropType, Ref } from 'vue'
// * Types

import { ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  costType: {
    type: String as PropType<'money' | 'percent' | 'month'>,
    required: true,
  },
})

const value: Ref<number> = ref(0)
</script>

<template>
  <div class="Input">

    <div class="Input__label">
      <label :for="props.name" class="color__gray font__gilroy__regular font__text">
        <slot>Input component label</slot>
      </label>
    </div>

    <div class="Input__info">
      <span class="font__nekst__black font__medium color__gray">{{ value }}</span>

      <div>
        <span v-if="props.costType === 'money'" class="font__nekst__black font__medium color__gray">₽</span>
        <span v-if="props.costType === 'month'" class="font__nekst__black font__medium color__gray">мес.</span>

        <div v-if="props.costType === 'percent'" class="Input__percentage">
          <span class="Input__percentage__text font__nekst__black color__gray">50%</span>
        </div>
      </div>

      <input v-model="value" :name="props.name" :id="props.name" type="range" class="Input__range">
    </div>

  </div>
</template>

<style>
.Input__label {
  margin-bottom: 24px;
}

.Input__info {
  position: relative;
  display: flex;
  height: 68px;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background-color: #F3F3F4;
  border-radius: 16px;
}

.Input__range {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;

  width: calc(100% - (24px * 2));
  position: absolute;
  bottom: -2px;
}

.Input__percentage {
  --padding: 7px;
  
  position: absolute;
  right: var(--padding);
  top: var(--padding);
  display: flex;
  align-items: center;
  background-color: #EBEBEC;
  padding: 0 17px;
  height: calc(100% - (var(--padding) * 2));
  border-radius: 16px;
}

.Input__percentage__text {
  font-size: 20px;
}

.Input__range:focus {
  outline: none;
}

/* 
  * Thumb
*/

.Input__range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 20px;
  width: 20px;
  cursor: pointer;
  border-radius: 50%;
  background-color: #FF9514;
  margin-top: -9px;
}

.Input__range::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: #FF9514;
  cursor: pointer;
}

.Input__range::-ms-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: #FF9514;
  cursor: pointer;
}

/* 
  * Track
*/

.Input__range::-webkit-slider-runnable-track {
  height: 2px;
  cursor: pointer;
  background-color: #FF9514;
}

.Input__range:focus::-webkit-slider-runnable-track {
  background-color: #FF9514;
}

.Input__range::-moz-range-track {
  height: 2px;
  cursor: pointer;
  background-color: #FF9514;
}

.Input__range::-ms-track {
  width: 100%;
  height: 2px;
  cursor: pointer;

  background: transparent; 
  border-color: transparent;
  color: transparent;
}

.Input__range::-ms-fill-lower {
  background-color: #FF9514;
}

.Input__range:focus::-ms-fill-lower {
  background-color: #FF9514;
}

.Input__range::-ms-fill-upper {
  background-color: #FF9514;
}

.Input__range:focus::-ms-fill-upper {
  background-color: #FF9514;
}
</style>