<script lang="ts" setup>
// * Types
import type { PropType, Ref } from 'vue'
// * Types

import { formatNumber } from '@/helpers'
import { nextTick, onMounted, ref, inject, watch } from 'vue'

const emit = defineEmits<{ (e: 'onCalculatedValue', value: number): void }>()
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  costType: {
    type: String as PropType<'money' | 'percent' | 'month'>,
    required: true,
  },
  minValue: {
    type: Number,
    default: 0,
  },
  maxValue: {
    type: Number,
    default: 100,
  },
  debounceMs: {
    type: Number,
    default: 1500,
  },
})

const value: Ref<number> = ref(props.minValue) // If cost type === 'percent' then that value is percents
const calculatedInputValue: Ref<number> = ref(inject('calculatedPercentValue', 0))
  
const inputElement: Ref<HTMLInputElement | null> = ref(null)

function emitNewValue(): void {
  emit('onCalculatedValue', Number(value.value))
}

async function formatValue(): Promise<void> {
  await nextTick()
  
  const valueForFormatting: number = props.costType === 'percent' ? calculatedInputValue.value : value.value

  inputElement.value!.value = formatNumber(valueForFormatting)
}

function changeValueByRange(): void {
  emitNewValue()
  formatValue()
}

async function removeLetters(e: Event): Promise<void> {
  const valueWithoutLetters: string = (e.target as HTMLInputElement).value.replace(/\D/g, '')

  if (props.costType !== 'percent')
    value.value = Number(valueWithoutLetters)
  else
    calculatedInputValue.value = Number(valueWithoutLetters)

  formatValue()
}

async function validateValue(): Promise<void> {
  if (props.costType !== 'percent') {
    if (value.value < props.minValue || !value.value)
      value.value = props.minValue

    if (value.value > props.maxValue)
      value.value = props.maxValue
  }

  emitNewValue()
  formatValue()
}

watch(calculatedInputValue, () => {
  formatValue()
})

onMounted(() => {
  formatValue()
})
</script>

<template>
  <div class="Input">

    <div class="Input__label">
      <label :for="props.name" class="color__gray font__gilroy__regular font__text">
        <slot>Input component label</slot>
      </label>
    </div>

    <div class="Input__info">
      <input
        v-if="props.costType !== 'percent'"
        ref="inputElement"
        v-model="value" 
        @input="removeLetters" 
        @focusout="validateValue" 
        :id="props.name"
        type="string" 
        class="Input__input font__nekst__black font__medium color__gray"
      >
      <input
        v-else
        ref="inputElement"
        v-model="calculatedInputValue" 
        @input="removeLetters"
        :id="props.name"
        type="string"
        class="Input__input font__nekst__black font__medium color__gray"
      >

      <div>
        <span v-if="props.costType === 'money'" class="font__nekst__black font__medium color__gray">₽</span>
        <span v-if="props.costType === 'month'" class="font__nekst__black font__medium color__gray">мес.</span>

        <div v-if="props.costType === 'percent'" class="Input__percentage">
          <span class="Input__percentage__text font__nekst__black color__gray">{{ value }}%</span>
        </div>
      </div>

      <input 
        v-model="value" 
        @input="changeValueByRange"
        :min="props.minValue" 
        :max="props.maxValue"
        type="range" 
        class="Input__range"
      >
    </div>

  </div>
</template>

<style>
.Input--disabled {
  opacity: 0.4;
}

.Input__info:hover .Input__range::-webkit-slider-runnable-track {
  height: 1px;
}

.Input__info:hover .Input__range::-moz-range-track {
  height: 1px;
}

.Input__info:hover .Input__range::-ms-track {
  height: 1px;
}

.Input__label {
  margin-bottom: 24px;
}

.Input__info {
  position: relative;
  display: flex;
  height: 68px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background-color: #F3F3F4;
  border-radius: 16px;
}

.Input__info--active {
  border: 2px solid #F3F3F4;
  background: #FFF;
}

.Input__info--active .Input__range {
  bottom: -4px;
}

.Input__input {
  background-color: transparent;
  border: none;
  width: 100%;
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

/* 
  * Breakpoints
*/

@media (max-width: 500px) {
  .Input__label {
    margin-bottom: 8px;
  }

  .Input__info {
    height: 60px;
    padding: 0 20px;
  }

  .Input__percentage {
    padding: 0 14px;
  }
}
</style>