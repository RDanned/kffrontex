<template>
  <div>
    <div class="row"><h1>Настройки</h1></div>
    <div class="row mb-3">
      <button class="btn btn-primary col-2" @click="toggleAdding">
        Добавить пользователя
      </button>
    </div>
    <div class="row">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Логин</th>
            <th>Группы</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.id }}</td>
            <td>
              {{ user.username }}
            </td>
            <td>{{ user.groups.map((group) => group.name).join(', ') }}</td>
            <td>
              <button
                class="trash-btn btn btn-warning mt-0 float-left"
                :data-user-id="user.id"
                @click="toggleEditing"
              >
                <font-awesome-icon icon="edit" />
              </button>
              <button
                class="trash-btn btn btn-warning mt-0 float-left"
                :data-user-id="user.id"
                @click="deleteUser"
              >
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <modal-window v-if="isAdding">
      <template v-slot:footer>
        <h1>Добавление пользователя</h1>
      </template>
      <template v-slot:body>
        <form>
          <div class="form-group">
            <label for="username">Логин</label>
            <input
              type="text"
              id="username"
              class="form-control"
              v-model="addData.username"
            />
          </div>
          <div class="form-group">
            <label for="password">Пароль</label>
            <input
              type="text"
              id="password"
              class="form-control"
              v-model="addData.password"
            />
          </div>
          <div class="form-group">
            <label for="group">Группа пользователя</label>
            <select
              name="group"
              id="group"
              multiple
              class="form-control"
              v-model="addData.groups"
            >
              <option
                v-for="(group, index) in groups"
                :key="index"
                :value="group.name"
              >
                {{ group.name }}
              </option>
            </select>
          </div>
        </form>
      </template>
      <template v-slot:footer>
        <button class="btn" @click="addUser">Сохранить</button>
        <button class="btn" @click="toggleAdding">Закрыть</button>
      </template>
    </modal-window>

    <modal-window v-if="isEditing">
      <template v-slot:footer>
        <h1>Редактирование пользователя пользователя</h1>
      </template>
      <template v-slot:body>
        <form>
          <div class="form-group">
            <label for="username">Логин</label>
            <input
              type="text"
              class="form-control"
              v-model="editData.username"
            />
          </div>
          <div class="form-group">
            <label for="password">Пароль</label>
            <input
              type="text"
              class="form-control"
              v-model="editData.password"
            />
          </div>
          <div class="form-group">
            <label for="group">Группа пользователя</label>
            <select
              name="group"
              multiple
              class="form-control"
              v-model="editData.groups"
            >
              <option
                v-for="(group, index) in groups"
                :key="index"
                :value="group.name"
              >
                {{ group.name }}
              </option>
            </select>
          </div>
        </form>
      </template>
      <template v-slot:footer>
        <button class="btn" @click="updateUser">Сохранить</button>
        <button class="btn" @click="toggleEditing">Закрыть</button>
      </template>
    </modal-window>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {actionTypes as userActions} from '@/store/modules/users'
import {actionTypes as groupActions} from '@/store/modules/groups'
import ModalWindow from '@/components/ModalWindow'

export default {
  components: {ModalWindow},
  data() {
    return {
      isAdding: false,
      isEditing: false,
      addData: {
        username: '',
        password: '',
        groups: [],
      },
      editData: {
        username: '',
        password: '',
        groups: [],
      },
    }
  },
  computed: {
    ...mapState({
      users: (state) => state.users.users,
      groups: (state) => state.groups.groups,
    }),
  },
  mounted() {
    this.$store.dispatch(userActions.loadUsers)
    this.$store.dispatch(groupActions.loadGroups)
  },
  methods: {
    toggleAdding: function () {
      this.isAdding = !this.isAdding
    },
    toggleEditing: function (e) {
      this.editData = this.users.find(
        (user) => user.id == e.currentTarget.dataset.userId
      )
      this.isEditing = !this.isEditing
    },
    updateUser: function () {
      this.$store
        .dispatch(userActions.updateUser, {user: this.editData})
        .then(() => {
          this.editData = {}
          this.isEditing = !this.isEditing
        })
    },
    addUser: function () {
      this.$store
        .dispatch(userActions.addUser, {user: this.addData})
        .then(() => {
          this.$store.dispatch(userActions.loadUsers)
          this.$store.dispatch(groupActions.loadGroups)
          this.isAdding = !this.isAdding
        })
    },
    deleteUser: function (e) {
      let user = this.users.find(
        (user) => e.currentTarget.dataset.userId == user.id
      )
      this.$store.dispatch(userActions.deleteUser, {user})
    },
  },
}
</script>
