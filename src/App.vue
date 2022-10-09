<script setup lang="ts">
import Title from '@/components/Title.vue'
import Result from '@/components/Result.vue'
import Button from '@/components/Button.vue'
import RangeInput from '@/components/RangeInput.vue'
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
              <RangeInput name="cost" cost-type="money">
                Стоимость автомобиля
              </RangeInput>
            </div>

            <div>
              <RangeInput name="cost" cost-type="percent">
                Первоначальный взнос
              </RangeInput>
            </div>

            <div>
              <RangeInput name="cost" cost-type="month">
                Срок лизинга
              </RangeInput>
            </div>
          </div>

          <div class="calcBlock__footer">
            <div>
              <Result>
                Сумма договора лизинга

                <template #cost>4 467 313 ₽</template>
              </Result>
            </div>

            <div>
              <Result>
                Ежемесячный платеж от

                <template #cost>4 467 313 ₽</template>
              </Result>
            </div>

            <div>
              <Button>Оставить заявку</Button>
            </div>
          </div>
        </div>

      </div>
    </div>

  </main>
</template>

<style></style>