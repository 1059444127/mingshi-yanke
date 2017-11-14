export default [
  {
    path: "",
    component: () => import("../pages/home/doc-say.vue")
  },
  {
    path: "ask-doc",
    component: () => import("../pages/home/ask-doc.vue")
  },
  {
    path: "more",
    component: () => import("../pages/home/more.vue")
  }
]
