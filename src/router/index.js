import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/pages/Home";
const Profile = () =>
  import(/* webpackChunkName: "profile" */ "@/pages/Profile");

const NewProject = () =>
  import(/* webpackChunkName: "new-project" */ "@/pages/NewProject");

const ProjectsList = () =>
  import(/* webpackChunkName: "projects" */ "@/pages/Projects");

const Accelerators = () =>
  import(/* webpackChunkName: "accelerators" */ "@/pages/Accelerators");

const Mentors = () =>
  import(/* webpackChunkName: "mentors" */ "@/pages/Mentors");

  Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/projects",
    name: "Projects",
    component: ProjectsList
  },
  {
    path: "/projects/new",
    name: "New Project",
    component: NewProject
  },
  {
    path: "/accelerators",
    name: "Accelerators",
    component: Accelerators
  },
  {
    path: "/mentors",
    name: "Mentors",
    component: Mentors
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
