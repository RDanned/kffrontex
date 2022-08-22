<template>
  <div>
    <div class="row"><h1>Журнал</h1></div>
    <div class="row">
      <table class="table table-striped table-dark table-bordered">
        <thead>
          <tr>
            <td>
              <div>#</div>
            </td>
            <td>
              <div>Пользователь</div>
            </td>
            <td>
              <div>Дата и время</div>
            </td>
            <td>
              <div>Наименование</div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in journal" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.user.username }}</td>
            <td>{{ item.action_time }}</td>
            <td>{{ item.change_message }}</td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul class="pagination" v-if="pageCount">
          <li
            :class="['page-item', {active: index == currentPage}]"
            v-for="index in pageCount"
            :key="index"
          >
            <a
              class="page-link"
              href="#"
              :data-page="index"
              @click="changePage"
              >{{ index }}</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
import {actionTypes} from '@/store/modules/actionJournal'

export default {
  computed: {
    ...mapState({
      pageCount: (state) => state.journal.pageCount,
      currentPage: (state) => state.journal.currentPage,
    }),
    ...mapGetters({
      journal: 'getCurrentJournalPageItems',
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.loadJournal)
  },
  methods: {
    changePage: function (e) {
      let page = e.currentTarget.dataset.page

      this.$store.dispatch(actionTypes.setCurrentPage, {page})
    },
  },
}
</script>
