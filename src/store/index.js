import Vue from 'vue'
import Vuex from 'vuex'
import app from '@/store/modules/app'
import auth from '@/store/modules/auth'
import admin from '@/store/modules/admin'
import modal from '@/store/modules/modal'
import application from '@/store/modules/application'
import users from '@/store/modules/users'
import groups from '@/store/modules/groups'
import journal from '@/store/modules/actionJournal'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    auth,
    admin,
    modal,
    application,
    users,
    groups,
    journal,
  },
})
