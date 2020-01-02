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
  }, {
    path: "boards/:boardId/posts",
    name: "posts",
    component: () => import("pages/post/Posts.vue")
  }, {
    path: "boards/:boardId/posts/:id",
    name: "postDetail",
    component: () => import("pages/post/PostDetail.vue")
  }, {
    path: "games/coloring",
    name: "coloring",
    component: () => import("pages/game/Coloring.vue")
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
