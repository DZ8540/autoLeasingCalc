<script setup lang="ts">
import Title from '@/components/Title.vue'
import Result from '@/components/Result.vue'
import Button from '@/components/Button.vue'
import RangeInput from '@/components/RangeInput.vue'
import { onBeforeMount, provide, type Ref } from 'vue'
import { formatNumber } from '@/helpers'
import CalcService from '@/service/CalcService'

import { ref } from 'vue'
import type { CalcSendPayload } from './contracts/calc'

const PERCENT_RATE: number = 0.035

const COST_MIN_VALUE: number = 1_000_000
const COST_MAX_VALUE: number = 6_000_000
const costValue: Ref<number> = ref(COST_MIN_VALUE)

const INITIAL_FEE_MIN_VALUE: number = 10
const INITIAL_FEE_MAX_VALUE: number = 60
const initialFeeValue: Ref<number> = ref(INITIAL_FEE_MIN_VALUE)
const calculatedInitialFeeValue: Ref<number> = ref(0)
provide('calculatedPercentValue', calculatedInitialFeeValue)

const LEASING_EXPIRE_MIN_VALUE: number = 1
const LEASING_EXPIRE_MAX_VALUE: number = 60
const leasingExpireValue: Ref<number> = ref(LEASING_EXPIRE_MIN_VALUE)

const sum: Ref<number> = ref(0)
const everyMonthPrice: Ref<number> = ref(0)
const isLoading: Ref<boolean> = ref(false)

function calculateInitialFeeValue(): void {
  calculatedInitialFeeValue.value = Math.floor(costValue.value * (initialFeeValue.value / 100))
}

function calculateSum(): void {
  sum.value = Math.floor(calculatedInitialFeeValue.value + (leasingExpireValue.value * everyMonthPrice.value))
}

function calculateEveryMonthPrice(): void {
  const calculatedEveryMonthPrice: number = (costValue.value - calculatedInitialFeeValue.value) *
    ((PERCENT_RATE * Math.pow((1 + PERCENT_RATE), leasingExpireValue.value)) / 
    (Math.pow((1 + PERCENT_RATE), leasingExpireValue.value) - 1))

  everyMonthPrice.value = Math.floor(calculatedEveryMonthPrice)
}

function calculateAll(): void {
  calculateEveryMonthPrice()
  calculateSum()
}

function setNewCostValue(newValue: number): void {
  costValue.value = newValue

  calculateInitialFeeValue()
  calculateAll()
}

function setNewInitialFeeValue(newValue: number): void {
  initialFeeValue.value = newValue

  calculateInitialFeeValue()
  calculateAll()
}

function setNewLeasingExpireValue(newValue: number): void {
  leasingExpireValue.value = newValue

  calculateAll()
}

async function sendPayload(): Promise<void> {
  isLoading.value = true

  const payload: CalcSendPayload = {
    car_coast: costValue.value,
    initail_payment: calculatedInitialFeeValue.value,
    initail_payment_percent: initialFeeValue.value,
    lease_term: leasingExpireValue.value,
    monthly_payment_from: everyMonthPrice.value,
    total_sum: sum.value,
  }

  await CalcService.sendData(payload)
  isLoading.value = false
}

onBeforeMount(() => {
  calculateInitialFeeValue()
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
                @on-calculated-value="setNewCostValue" 
                :min-value="COST_MIN_VALUE" 
                :max-value="COST_MAX_VALUE" 
                name="cost" 
                cost-type="money"
              >
                Стоимость автомобиля
              </RangeInput>
            </div>

            <div>
              <RangeInput 
                @on-calculated-value="setNewInitialFeeValue" 
                :min-value="INITIAL_FEE_MIN_VALUE" 
                :max-value="INITIAL_FEE_MAX_VALUE"
                name="initialFee" 
                cost-type="percent"
              >
                Первоначальный взнос
              </RangeInput>
            </div>

            <div>
              <RangeInput 
                @on-calculated-value="setNewLeasingExpireValue"
                :min-value="LEASING_EXPIRE_MIN_VALUE" 
                :max-value="LEASING_EXPIRE_MAX_VALUE"
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