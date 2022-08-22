import Vue from 'vue'
import VueRouter from 'vue-router'
import ApplicationForm from '@/views/ApplicationForm'
import Admin from '@/views/Admin'
import Basket from '@/views/admin/Basket'
//import AdminApplicationDetail from '@/views/admin/trash/AdminApplicationDetail'
import AdminSettings from '@/views/admin/AdminSettings'
import AdminUsers from '@/views/admin/AdminUsers'
import AdminLogin from '@/views/admin/AdminLogin'
import AdminActionJournal from '@/views/admin/AdminActionJournal'
import Applications from '@/views/admin/Applications'
import {getItem} from '@/helpers/persistanceStorage'
import Evicted from '@/views/admin/Evicted'
import AdminIndex from '@/views/admin'
import Settlement from '@/views/admin/Settlement'
import {actionTypes as adminActionTypes} from '@/store/modules/admin'
import {actionTypes as modalActionTypes} from '@/store/modules/modal'
import store from '@/store'
import Archive from '@/views/admin/Archive'
import ApplicationDetail from '@/views/admin/ApplicationDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ApplicationForm,
  },
  {
    path: '/form/',
    name: 'form',
    component: ApplicationForm,
  },
  {
    path: '/admin/login/',
    name: 'login',
    component: AdminLogin,
  },
  {
    path: '/admin/',
    component: Admin,
    meta: {needAuth: true},
    children: [
      {
        path: '/',
        name: 'admin-index',
        component: AdminIndex
      },
      // {
      //   path: 'applications/:id/',
      //   name: 'application',
      //   component: AdminApplicationDetail,
      //   meta: {permission: 'access_applications'},
      // },
      {
        path: 'basket/',
        name: 'basket',
        component: Basket,
        meta: {permission: 'access_basket'},
      },
      {
        path: 'settings/',
        name: 'settings',
        component: AdminSettings,
        meta: {permission: 'view_settings'},
      },
      {
        path: 'users/',
        name: 'users',
        component: AdminUsers,
        meta: {permission: 'view_user'},
      },
      {
        path: 'journal/',
        name: 'journal',
        component: AdminActionJournal,
        meta: {permission: 'access_journal'},
      },
      {
        path: 'applications/',
        name: 'applications',
        component: Applications,
        meta: {permission: 'access_applications'},
      },
      {
        path: 'settlement/',
        name: 'settlement',
        component: Settlement,
        meta: {permission: 'access_settlement'},
      },
      {
        path: 'evicted/',
        name: 'evicted',
        component: Evicted,
        meta: {permission: 'access_evicted'},
      },
      {
        path: 'archive/',
        name: 'archive',
        component: Archive,
        meta: {permission: 'access_archive'},
      },
      {
        path: 'applications/:id',
        name: 'application',
        component: ApplicationDetail,
        meta: {permission: 'access_applications'},
      },
      // {
      //   path: 'category/',
      //   name: 'category',
      //   component: AdminCategoryPage,
      //   meta: {permission: 'access_applications'},
      // },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  if(to.name !== from.name){
    store.dispatch(adminActionTypes.clearState)
  }
  store.dispatch(modalActionTypes.resetApplicationDetail)
  store.dispatch(modalActionTypes.resetEvictApplication)

  //check if user login
  if (to.matched.some((record) => record.meta.needAuth)) {
    if (!getItem('token')) {
      next({
        path: '/admin/login/',
        query: {redirect: to.fullPath},
      })
    } else {
      next()
    }
  } else {
    next()
  }

  if (to.meta.permission) {
    let permissions = getItem('permissions')
    let hasAccess = false

    permissions.forEach((permission) => {
      if (permission.codename === to.meta.permission) hasAccess = true
    })

    if (hasAccess) next()
    else next({name: 'category', params: {category: 'applications'}})
  }
})

export default router
