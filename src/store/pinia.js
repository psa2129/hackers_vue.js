import { defineStore } from "pinia";
import axios from "axios";

export const useStore = defineStore("openWeatherApi", {
    state: () => {
        return {
            cityName: "", // 도시 이름
            current: {
            temp: "",  //현재 온도
            desc: "",  // 현재날씨 묘사
            icon: "", // 현재 날씨 아이콘
            pressure: "", // 기압
            feels_like: "", // 체감온도
            humidity: "", // 습도
            uvi: "", // 자외선 수치
            },
            hourly: [], // 시간대별 날씨 데이터
        };
    },
    actions: {
        async fetchApi(payload) {
            try{
                const API_KEY = "aa834c5707d28d7a289c8d263aad3261";
    
                // 위도 경도 좌표 변수
                let axisLast = payload.lat;
                let axisLon = payload.lon;
        
                const res = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${axisLast}&lon=${axisLon}&appid=${API_KEY}&units=metric`);
      
                const data = res.data
                const current = res.data.list[0];
                const hourly = res.data.list;
    
                // 데이터 설정
                this.cityName = payload.cityName;
                this.current.temp = Math.floor(current.main.temp);
                this.current.desc = current.weather[0].description;
                this.current.pressure = current.main.pressure;
                this.current.feels_like = current.main.feels_like;
                this.current.humidity = current.main.humidity;
                this.current.uvi = current.uvi;
                this.current.icon = current.weather[0].icon;
                this.hourly = hourly.splice(23, hourly.length - 1);
            } catch (error) {
                console.log(error);
            }
           },
    },
});