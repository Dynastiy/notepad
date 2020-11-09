import { createWebHistory, createRouter } from "vue-router";
import Home from "../src/components/notes";
import addNote from "../src/components/addNote.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/add",
    name: "Add Note",
    component: addNote,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;