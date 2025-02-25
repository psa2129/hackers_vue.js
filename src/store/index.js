import { createStore } from "vuex";
import openWeatherApi from "./api.js";

export default createStore({
    modules: {
        openWeatherApi,
    },
});