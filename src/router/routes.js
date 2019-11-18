const routes = [{
  path: "/",
  component: () => import("layouts/DefaultLayout.vue"),
  children: [{
    path: "",
    name: "home",
    component: () => import("pages/Index.vue")
  }, {
    path: "signup/verify/:hashCode",
    name: "signupVerify",
    component: () => import("pages/user/SignupVerify.vue")
  }, {
    path: "signin",
    name: "signin",
    component: () => import("pages/user/Signin.vue")
  }, {
    path: "signup",
    name: "signup",
    component: () => import("pages/user/Signup.vue")
  }, {
    path: "signupFinished",
    name: "signupFinished",
    component: () => import("pages/user/SignupFinished.vue")
  }]
}]

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  })
}

export default routes
