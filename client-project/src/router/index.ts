import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "",
    component: Login,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/adminHome",
    name: "adminHome",
    component: () => import("@/views/AdminHomeView.vue"), // 路由懒加载
  },
  {
    path: "/customerHome",
    name: "customerHome",
    component: () => import("@/views/CustomerHomeView.vue"), // 路由懒加载
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
