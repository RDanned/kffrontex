<template>
  <div class="auth-login__wrapper">
    <div class="auth-login">
      <div class="auth-login__logo">
        <img :src="require(`@/assets/img/kafu-logo.png`)" alt="" />
      </div>
      <div class="login-form border">
        <div v-if="isFailed" class="alert alert-danger">
          Неверный логин или пароль
        </div>
        <form action="" @submit.prevent="login">
          <div class="form-group">
            <input
              type="text"
              id="login"
              placeholder="Логин"
              class="form-control"
              v-model="username"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              id="password"
              placeholder="Пароль"
              class="form-control"
              v-model="password"
            />
          </div>
          <div class="form-group">
            <input
              type="submit"
              id="submit"
              value="Войти"
              class="form-control"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/auth'

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  computed: {
    ...mapState({
      isFailed: (state) => state.auth.isFailed,
    }),
  },
  methods: {
    login: function () {
      this.$store
        .dispatch(actionTypes.login, {
          credentials: {
            username: this.username,
            password: this.password,
          },
        })
        .then(() =>
          this.$router.push({
            name: 'admin-index',
            //params: {category: 'applications'},
          })
        )
    },
  },
}
</script>
<style>
body,
html {
  height: 100%;
}

.border {
  border: 1px solid #f4cb7c !important;
}

.auth-login__wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 510px;
  padding: 48px 27px 5px;
  background: #fff;
  margin-top: 25px;
}

.login-form input {
  margin-bottom: 27px;
  height: 62px;
  font-size: 24px;
}

#submit {
  margin-top: 50px;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  background: #394188;
  color: #fff;
}

.auth-login__logo {
  width: 250px;
  margin-left: auto;
  margin-right: auto;
}

.auth-login__logo img {
  width: 100%;
}
</style>
