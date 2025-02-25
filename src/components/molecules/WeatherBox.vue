<template>
    <div class="weather-box">
        <div class="weather-box__icon-box">
            <div class="weather-box__icon-box__info">
                <span class="temp">{{ data.temp + "&deg;C" }}</span>
                <span class="desc">{{ data.desc }}</span>
                <span class="update">Updated 1:48pm</span>
            </div>
            <img 
               :src="`src/assets/images/${data.icon}.png`"
               alt=""
               class="weather-box__icon-box__icon"
            />
        </div>
        <div class="weather-box__detail">
            <span class="weather-box__detail__item">Barometer: {{ data.pressure }}mb</span>
            <span class="weather-box__detail__item">Feels Like: {{ Math.floor(data.feels_like) + "&deg;C" }}</span>
            <span class="weather-box__detail__item">Humidity: {{ data.humidity }}%</span>
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
.weather-box {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__icon-box {
        display: flex;
        align-items: center;
        justify-content: center;

        gap: 48px;

        &__info {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .temp {
                font-weight: 500;
                font-size: 88px;
            } 

            .desc {
                font-weight: 100;
                font-size: 28px;

                margin-top: -12px;
            }
            
            .update {
                font-weight: 100;
            }
        }
        &__icon {
            height: 160px;
        }
    }
    &__detail {
        display: flex;
        align-items: center;
        justify-content: center;

        gap: 24px;
        margin-top: 16px;

        font-weight: 300;
    }
}
</style>