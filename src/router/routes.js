import BlogsPage from "../pages/Blogs.vue";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import NotFoundErrorPage from "../pages/errors/NotFoundErrorPage.vue";
import HomePage from "../pages/HomePage.vue";

const routes = [
  {
    path: "/",
    component: HomePage,
    name: "home",
  },
  {
    path: "/blogs",
    component: BlogsPage,
    name: "blogs",
    meta: {
      auth: true,
    },
  },
  {
    path: "/login",
    component: LoginPage,
    name: "login",
  },
  {
    path: "/register",
    component: RegisterPage,
    name: "register",
  },
  {
    path: "/:notFound(.*)",
    component: NotFoundErrorPage,
    name: "error.404",
  }
];

export default routes;
