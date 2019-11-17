const routes = [
  {
    path: "/",
    component: () => import("layouts/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/Index.vue")
      }, {
        path: "signup/verify/:hashCode",
        name: "signup",
        component: () => import("pages/user/SignupVerify.vue")
      }, {
        path: "signin",
        name: "signin",
        component: () => import("pages/user/Signin.vue")
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  })
}

export default routes
