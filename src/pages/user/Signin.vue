<template>
  <div class="row q-pt-md">
    <div class="col-md-4 offset-md-4">
      <q-card class="q-pb-md">
        <q-card-section>
          로그인
        </q-card-section>
        <div class="q-px-md">
          <q-form
            @submit="submit"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="name"
              label="이름 또는 이메일을 입력하세요."
              lazy-rules
              :rules="[ val => val && val.length > 0 || '아무거나 입력해봐요']"
            />

            <q-input
              filled
              type="password"
              v-model="password"
              label="비밀번호를 입력하세요."
              lazy-rules
              :rules="[ val => val && val.length > 0 || '안 볼테니 뭐라도 좀 입력해봐요']"
            />

            <div class="text-center">
              <q-btn label="로그인" type="submit" color="primary"/>
            </div>
          </q-form>
        </div>
      </q-card>

    </div>
  </div>
</template>

<style></style>

<script>
const crypto = require('crypto')

import { mapActions } from "vuex"

export default {
  name: "Signin",

  data() {
    return {
      re: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      crypto: crypto,
      name: '',
      password: ''
    }
  },
  methods: {
    ...mapActions("user", ["signin"]),
    submit () {
      let form = {}
      this.crypto.pbkdf2(this.password, process.env.SECRET_KEY, 100000, 64, 'sha512', (err, key) => {
        form.password = key.toString('base64')
        if(this.re.test(this.name.toLowerCase())){
          form.email = this.name
        }
        else{
          form.name = this.name
        }
        this.signin(form)
      })
    }
  }
}
</script>
