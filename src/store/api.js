import axios from "axios";

export default {
    // namespaced: 하나의 stored에서 모듈화하여 사용할 수 있음을 명시적으로 나타내는 개념
    namespaced: true,
    state: {
        cityName: "",
        current: {
            temp: "",  //현재 온도
            desc: "",  // 현재날씨 묘사
            icon: "", // 현재 날씨 아이콘
            pressure: "", // 기압
            feels_like: "", // 체감온도
            humidity: "", // 습도
            uvi: "", // 자외선 수치
        },
        hourly: [],
    },
    getters: {},
    mutations: {},
    actions: { 
       async fetchApi({ state }, payload) {
        try{
            const API_KEY = "aa834c5707d28d7a289c8d263aad3261";

            // 위도 경도 좌표 변수
            let axisLast = payload.lat;
            let axisLon = payload.lon;
    
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${axisLast}&lon=${axisLon}&appid=${API_KEY}&units=metric`);
            console.log(res);
            const data = res.data
            const current = res.data.list[0];
            const hourly = res.data.list;

            // 데이터 설정
            state.cityName = payload.cityName;
            state.current.temp = Math.floor(current.main.temp);
            state.current.desc = current.weather[0].description;
            state.current.pressure = current.main.pressure;
            state.current.feels_like = current.main.feels_like;
            state.current.humidity = current.main.humidity;
            state.current.uvi = current.uvi;
            state.current.icon = current.weather[0].icon;
            state.hourly = hourly.splice(23, hourly.length - 1);
        } catch (error) {
            console.log(error);
        }
       },
    },
};