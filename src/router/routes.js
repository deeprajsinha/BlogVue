import BlogsPage from "../pages/Blog/Blogs.vue";
import BlogsForGuest from "../pages/Blog/BlogsForGuest.vue";
import CreateBlogs from "../pages/Blog/CreateBlogs.vue";
import EditBlogs from "../pages/Blog/EditBlog.vue";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import NotFoundErrorPage from "../pages/errors/NotFoundErrorPage.vue";
import HomePage from "../pages/HomePage.vue";
import ForgotPassword from "../pages/ForgotPassword.vue";

const routes = [
  {
    path: "/home",
    component: HomePage,
    name: "home",
  },
  {
    path: "/blogs",
    component: BlogsPage,
    name: "blogs",
    meta: {
      auth: true,
    }
  },
  {
    path: "/",
    component: BlogsForGuest,
    name: "all-blogs",
    meta: {
      auth: true,
    }
  },
  {
      path: "/create-blog",
      component: CreateBlogs,
      name: "create-blog",
      meta: {
        auth: true,
      },
  },
  {
    path: "/edit-blog/:blog_id",
    component: EditBlogs,
    name: "edit-blog",
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
    path: "/forgot-password",
    component: ForgotPassword,
    name: "forgot-password",
  },
  {
    path: "/:notFound(.*)",
    component: NotFoundErrorPage,
    name: "error.404",
  }
];

export default routes;
