import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../view/Home.vue";
import Login from "../view/Login.vue";
import PosLogin from "../view/PosLogin.vue";
import { useUserStore } from "@/stores/user";
import { pinia } from "@/main";

const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  {
    path: "/pos-login",
    component: PosLogin,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const loginStore = useUserStore(pinia);
  if (to.path === "/" && !loginStore.isLogged) {
    return next("/login");
  }
  if (["/login"].includes(to.path) && loginStore.isLogged) {
    return next("/");
  }

  return next();
});
export default router;
