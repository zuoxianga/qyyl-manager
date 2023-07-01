import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:()=>import('../views/Index.vue')
  },
  {
    path:'/layout',
    component:()=>import('../views/Layout.vue'),
    children:[
      {
        path:'',
        component:()=>import('../views/Home.vue')
      },
      {
        path:'userlist',
        component:()=>import('../views/UserList.vue')
      },
      {
        path:'adduser',
        component:()=>import('../views/AddUser.vue')
      },
      {
        path:'visitlist',
        component:()=>import('../views/VisitList.vue')
      },
      {
        path:'addvisit',
        component:()=>import('../views/AddVisit.vue')
      }
    ]
  },
  {
    path:'*',
    component:()=>import('../views/NotFount.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
