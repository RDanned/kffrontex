<template>
  <div
    class="nav flex-column nav-pills"
    id="v-pills-tab"
    role="tablist"
    aria-orientation="vertical"
  >
    <router-link
      v-for="(item, index) in menuItemsFiltered"
      :key="index"
      class="nav-link"
      data-toggle="pill"
      :to="item.route"
      role="tab"
      aria-controls="v-pills-home"
      aria-selected="true"
      active-class="active"
      exact
    >
      {{ item.title }}
    </router-link>
    <a @click="logout" class="nav-link" href="#">Выход</a>
  </div>
</template>
<script>
import {actionTypes} from '@/store/modules/auth'
import {getItem} from '@/helpers/persistanceStorage'

export default {
  name: 'AdminMenu',
  data() {
    return {
      menuItems: [
        /*{
          title: 'Список заявителей',
          route: {
            name: 'category',
            params: {category: 'applications'},
          },
          permission: 'access_applications',
        },
        {
          title: 'Список расселения',
          route: {
            name: 'category',
            params: {category: 'settlement'},
          },
          permission: 'access_applications',
        },
        {
          title: 'Список выселенных',
          route: {
            name: 'evicted',
            //params: {category: 'evicted'},
          },
          permission: 'access_applications',
        },*/
        {
          title: 'Список заявителей',
          route: {
            name: 'applications',
          },
          permission: 'access_applications',
        },
        {
          title: 'Список вселенных',
          route: {
            name: 'settlement',
          },
          permission: 'access_settlement',
        },
        {
          title: 'Список выселенных',
          route: {
            name: 'evicted',
          },
          permission: 'access_evicted',
        },
        {
          title: 'Архив',
          route: {
            name: 'archive',
          },
          permission: 'access_archive',
        },
        {
          title: 'Корзина',
          route: {
            name: 'basket',
          },
          permission: 'access_basket',
        },
        {
          title: 'Настройки',
          route: {
            name: 'settings',
          },
          permission: 'view_settings',
        },
        {
          title: 'Пользователи',
          route: {
            name: 'users',
          },
          permission: 'view_user',
        },
        {
          title: 'Журнал действий',
          route: {
            name: 'journal',
          },
          permission: 'access_journal',
        },
      ],
    }
  },
  mounted(){
    if(this.$route.name === 'admin-index' && this.$route.name !== this.menuItemsFiltered[0].route.name)
    this.$router.push({name: this.menuItemsFiltered[0].route.name})
  },
  computed: {
    menuItemsFiltered: function () {
      let permissions = getItem('permissions')
      let items = this.menuItems.filter((item) => {
        let hasAccess = false

        permissions.forEach((permission) => {
          if (permission.codename == item.permission) hasAccess = true
        })

        return hasAccess
      })

      return items
    },
  },
  methods: {
    logout: function () {
      this.$store.dispatch(actionTypes.logout)
      this.$router.push({name: 'login'})
    },
  },
}
</script>
