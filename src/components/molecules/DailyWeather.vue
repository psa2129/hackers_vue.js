<template>
    <div class="daily-weather">
        <div class="daily-weather__data">
            <span class="daily-weather__data__date">{{ data.dt }}</span>
            <div class="daily-weather__data__temp">
                <span class="high">{{ Math.round(data.main.temp) + "&deg;" }}</span>
                /
                <span class="low">{{ Math.floor(data.wind.speed) }}</span>
                <span class="low" style="font-size: 20px; margin-top: 8px">m/s</span>
            </div>
            <div class="daily-weather__data__icon">
                <img :src="`src/assets/images/${data.weather[0].icon}.png`" alt="" />
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});
</script>

<style lang="scss" scoped>
@import "@assets/styles/main.scss";

.daily-weather {
    display: flex;
    align-items: center;
    justify-content: center;

    &__data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &__date {
        font-size: 24px;
        font-weight: 100;
      }
      &__temp {
        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 32px;
        font-weight: 100;

        color: $color-white-200;

        .high {
            color: $color-black-900;
        }
      }
      &__icon {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 80px;
            height: 80px;
        }
      }
    }
}
</style>