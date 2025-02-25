import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@pages/index.vue";
import About from "@pages/about.vue";
    

export default createRouter ({
    history: createWebHashHistory(),
    // 페이지를 구분해주는 개념
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/about",
            name: "/about",
            component: About
        }
    ],
});