import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/movie:movieId",
    name: "Movie",
    component: HomeView,
    meta: {
      title: "Home",
    },
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
