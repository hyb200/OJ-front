import { RouteRecordRaw } from "vue-router";
import HomeViewVue from "../views/HomeView.vue";
import NotFoundViewVue from "../views/NotFoundView.vue";
import AboutViewVue from "../views/AboutView.vue";
import ACCESS_ENUM from "@/access/AccessEnum";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeViewVue,
  },
  {
    path: "/hide",
    name: "隐藏页面",
    component: HomeViewVue,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/about",
    name: "about",
    component: AboutViewVue,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/404",
    name: "404",
    component: NotFoundViewVue,
  },
];
