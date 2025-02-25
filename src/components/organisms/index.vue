<template>
    <div class="page">
        <header class="page__header">
            <span class="page__header__region">{{ cityName }}, Korea</span>
            <span class="page__header__date">{{ date }}</span>
        </header>
        <div class="page__body">
            <div class="page__body__main">
                <div class="data-box">
                    <WEATHERBOX :data="currentData" />
                    <div class="data-box__graph-box">
                        <GRAPH v-for="item in graphData" :key="item.label" :data="item" />
                    </div>
                </div>
                <MAP />
            </div>
            <div class="page__body__daily">
                <DAILYWEATHER v-for="item in hourlyData" :key="item" :data="item" />
            </div>
        </div>
    </div>
</template>

<script setup>
import WEATHERBOX from "../molecules/WeatherBox.vue";
import MAP from "../molecules/Map.vue";
import DAILYWEATHER from "../molecules/DailyWeather.vue";
import GRAPH from "../molecules/Graph.vue";
import dayjs from "dayjs";
import store from "@store/index";

import { ref, reactive, computed } from "vue";

const axis = reactive({
    // Default Seoul Axis
    lat: 37.5683,
    lon: 126.9778,
    cityName: "Seoul"
});
store.dispatch("openWeatherApi/fetchApi", axis);

// 해당 도시이름
const cityName = computed(() => {
    return store.state.openWeatherApi.cityName;
});
// 현재 날짜 및 시간
const date = computed(() => {
    const current = dayjs(new Date());
    return current.format("dd, DD MMM YYYY");
});
// 현재 시간에 따른 날씨 데이터
const currentData =  computed(() => {
    return store.state.openWeatherApi.current;
});
// 그래프 데이터
const graphData = computed(() => {
    const res =  [
        {
            label: "Precipitation", 
            value: "38%"
        }, 
        {
            label: "Humidity", 
            value: currentData.value.humidity + "%",
        }, 
        {
            label: "UV Index",
             value: "10",
        },
    ];
    return res;
});
// 시간대별 데이터
const hourlyData = computed(() => {
    const res= store.state.openWeatherApi.hourly;
    res.forEach((item) => {
        item.dt = Unix_timeStamp(item.dt);
    });
    return res;
});

function Unix_timeStamp(dt) {
    let date = new Date(dt * 1000);
    let hour = date.getHours().toString().padStart(2, "0");

    return hour.substring(-2) + "시";
}
</script>

<style lang="scss" scoped>

.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    &__header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &__region {
            font-size: 48px;
        }
        &__date {
            font-weight: 300;
        }
    }
    &__body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;

        &__main {
            display: flex;
            align-items: center;
            justify-content: center;

            gap: 100px;

            .data-box {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                &__graph-box {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    gap: 80px;
                    margin-top: 32px;
                }
            }
        }
        &__daily {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            width: 82.5%;

            margin-top: 48px;
            gap: 48px;

            overflow-x: scroll;
        }
    }
}
</style>