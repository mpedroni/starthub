import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/pages/Home";
const Profile = () =>
  import(/* webpackChunkName: "profile" */ "@/pages/Profile");

const NewProject = () =>
  import(/* webpackChunkName: "new-project" */ "@/pages/NewProject");

const ProjectsList = () =>
  import(/* webpackChunkName: "projects" */ "@/pages/Projects");

const Project = () =>
  import(/* webpackChunkName: "project" */ "@/pages/Project");

const Accelerators = () =>
  import(/* webpackChunkName: "accelerators" */ "@/pages/Accelerators");

const Mentors = () =>
  import(/* webpackChunkName: "mentors" */ "@/pages/Mentors");

const Academy = () =>
  import(/* webpackChunkName: "academy" */ "@/pages/Academy");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
    props: ({ params }) => ({
      id: params.id
    })
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
    path: "/projects/:projectCode",
    name: "Project",
    component: Project,
    props: ({ params }) => ({
      projectCode: params.projectCode
    })
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
  },
  {
    path: "/academy",
    name: "Academy",
    component: Academy
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
