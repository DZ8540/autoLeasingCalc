<script setup lang="ts">
// * Types
import type { Ref } from 'vue'
import type { CalcSendPayload } from './contracts/calc'
// * Types

// * Components
import Title from '@/components/Title.vue'
import Result from '@/components/Result.vue'
import Button from '@/components/Button.vue'
import RangeInput from '@/components/RangeInput.vue'
// * Components

import CalcService from '@/service/CalcService'
import { formatNumber } from '@/helpers'
import { onBeforeMount, provide, ref } from 'vue'

const PERCENT_RATE: number = 0.035

const COST_MIN: number = 1_000_000
const COST_MAX: number = 6_000_000
const cost: Ref<number> = ref(COST_MIN)

const INITIAL_FEE_MIN: number = 10
const INITIAL_FEE_MAX: number = 60
const initialFee: Ref<number> = ref(INITIAL_FEE_MIN)

const calculatedInitialFee: Ref<number> = ref(0)
provide('calculatedInitialFee', calculatedInitialFee)

const calculatedInitialFeeMin: Ref<number> = ref(0)
provide('calculatedInitialFeeMin', calculatedInitialFeeMin)

const calculatedInitialFeeMax: Ref<number> = ref(0)
provide('calculatedInitialFeeMax', calculatedInitialFeeMax)

const LEASING_EXPIRE_MIN: number = 1
const LEASING_EXPIRE_MAX: number = 60
const leasingExpire: Ref<number> = ref(LEASING_EXPIRE_MIN)

const sum: Ref<number> = ref(0)
const everyMonthPrice: Ref<number> = ref(0)
const isLoading: Ref<boolean> = ref(false)

function calculateInitialFee(): void {
  calculatedInitialFee.value = Math.floor(cost.value * (initialFee.value / 100))
  calculatedInitialFeeMin.value = Math.floor(cost.value * (INITIAL_FEE_MIN / 100))
  calculatedInitialFeeMax.value = Math.floor(cost.value * (INITIAL_FEE_MAX / 100))
}

function calculateSum(): void {
  sum.value = Math.floor(calculatedInitialFee.value + (leasingExpire.value * everyMonthPrice.value))
}

function calculateEveryMonthPrice(): void {
  const calculatedEveryMonthPrice: number = (cost.value - calculatedInitialFee.value) *
    ((PERCENT_RATE * Math.pow((1 + PERCENT_RATE), leasingExpire.value)) / 
    (Math.pow((1 + PERCENT_RATE), leasingExpire.value) - 1))

  everyMonthPrice.value = Math.floor(calculatedEveryMonthPrice)
}

function calculateAll(): void {
  calculateEveryMonthPrice()
  calculateSum()
}

function setCostValue(val: number): void {
  cost.value = val

  calculateInitialFee()
  calculateAll()
}

function setInitialFee(val: number): void {
  initialFee.value = val

  calculateInitialFee()
  calculateAll()
}

function setLeasingExpire(val: number): void {
  leasingExpire.value = val

  calculateAll()
}

async function sendPayload(): Promise<void> {
  isLoading.value = true

  const payload: CalcSendPayload = {
    car_coast: cost.value,
    initail_payment: calculatedInitialFee.value,
    initail_payment_percent: initialFee.value,
    lease_term: leasingExpire.value,
    monthly_payment_from: everyMonthPrice.value,
    total_sum: sum.value,
  }

  await CalcService.sendData(payload)
  isLoading.value = false
}

onBeforeMount(() => {
  calculateInitialFee()
  calculateAll()
})
</script>

<template>
  <main>

    <div class="fullPage">
      <div class="container">

        <div class="calcBlock">
          <div class="calcBlock__header">
            <Title>
              Рассчитайте стоимость <br>
              автомобиля в лизинг
            </Title>
          </div>

          <div class="calcBlock__body">
            <div>
              <RangeInput 
                @on-calculated-value="setCostValue" 
                :min="COST_MIN" 
                :max="COST_MAX" 
                name="cost" 
                cost-type="money"
              >
                Стоимость автомобиля
              </RangeInput>
            </div>

            <div>
              <RangeInput 
                @on-calculated-value="setInitialFee" 
                :min="INITIAL_FEE_MIN" 
                :max="INITIAL_FEE_MAX"
                name="initialFee" 
                cost-type="percent"
              >
                Первоначальный взнос
              </RangeInput>
            </div>

            <div>
              <RangeInput 
                @on-calculated-value="setLeasingExpire"
                :min="LEASING_EXPIRE_MIN" 
                :max="LEASING_EXPIRE_MAX"
                name="leasingExpire" 
                cost-type="month" 
              >
                Срок лизинга
              </RangeInput>
            </div>
          </div>

          <div class="calcBlock__footer">
            <div>
              <Result>
                Сумма договора лизинга

                <template #cost>{{ formatNumber(sum) }} ₽</template>
              </Result>
            </div>

            <div>
              <Result>
                Ежемесячный платеж от

                <template #cost>{{ formatNumber(everyMonthPrice) }} ₽</template>
              </Result>
            </div>

            <div>
              <Button @click="sendPayload" :is-loading="isLoading">Оставить заявку</Button>
            </div>
          </div>
        </div>

      </div>
    </div>

  </main>
</template>

<style></style>