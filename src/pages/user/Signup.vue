<template>
  <div class="row q-pt-md">
    <div class="col-md-4 offset-md-4">
      <q-card class="q-pb-md">
        <q-card-section>
          회원가입
        </q-card-section>
        <div class="q-px-md">
          <q-form
            @submit="submit"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="name"
              label="이름을 입력하세요."
              lazy-rules
              :rules="[
                ( val => val && val.length > 0 || '이름을 입력하세요.' ),
                ( val => nameRe.test(val.toLowerCase()) || '한글/영문/숫자만 입력 가능합니다.' )
              ]"
            />

            <q-input
              filled
              v-model="email"
              label="이메일을 입력하세요."
              lazy-rules
              :rules="[
                ( val => val && val.length > 0 || '이메일을 입력하세요.' ),
                ( val => emailRe.test(val.toLowerCase()) || '형식에 맞지 않습니다.' )
              ]"
            />

            <q-input
              filled
              type="password"
              v-model="password"
              label="비밀번호를 입력하세요."
              lazy-rules
              :rules="[ val => val && val.length > 0 || '비밀번호를 입력하세요.']"
            />

            <q-input
              filled
              type="password"
              v-model="passwordConf"
              label="비밀번호를 한 번 더 입력하세요."
              lazy-rules
              :rules="[
                ( val => val && val == password || '비밀번호가 서로 다릅니다.' )
              ]"
            />

            <div class="text-center">
              <q-btn label="회원가입" type="submit" color="primary"/>
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
  name: "Signup",

  data() {
    return {
      nameRe: /^([a-zA-Z0-9가-힣])+$/,
      emailRe: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      crypto: crypto,
      name: '',
      email: '',
      password: '',
      passwordConf: ''
    }
  },
  watch: {
    'password': function() {
      this.passwordConf = ''
    }
  },
  methods: {
    ...mapActions("user", ["signup"]),
    submit () {
      let form = {
        email: this.email,
        name: this.name
      }
      this.crypto.pbkdf2(this.password, process.env.SECRET_KEY, 100000, 64, 'sha512', (err, key) => {
        form.password = key.toString('base64')
        this.signup(form)
      })
    }
  }
}
</script>
