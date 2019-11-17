import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import router from "../router"

Vue.use(Vuex)

const call = ({ state, commit }, method, path, params, option) => {
  let headers = {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
  if (state.user && state.user.token) {
    headers["Authorization"] = "Token " + state.user.token
  }
  return new Promise((resolve, reject) => {
    let conf = {
      method: method,
      url: option.url ? option.url : `${process.env.VUE_APP_API_URL}/${path}`,
      headers: headers
    }
    if (method === "get") {
      conf.params = params
    } else if (method === "post") {
      conf.data = params
    }
    commit('sys/doFetch')
    axios(conf)
      .then(res => {
        commit('sys/endFetch')
        if (option) {
          if (option.success) option.success(res)
          if (option.commit) commit(option.commit, res.data.response)
          if (option.push) {
            if (typeof option.push === "string") {
              router.push({ name: option.push })
            } else {
              router.push(option.push)
            }
          }
        }
        resolve(res)
      })
      .catch(e => {
        commit('sys/endFetch')
        console.log("Error: ", e)
        console.log("Error: ", e.response)
        if (e.response && e.response.data && e.response.data.msg) {
          alert(e.response.data.msg)
        }
        if (option && option.error) option.error(e.response)
      })
  })
}

export default call
