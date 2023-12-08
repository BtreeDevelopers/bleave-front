import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../view/Home.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
