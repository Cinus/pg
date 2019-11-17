import Vue from "vue"
import Vuex from "vuex"
import user from "./modules/user"
import sys from "./modules/sys"
import createPersistedState from "vuex-persistedstate"
import * as Cookies from "js-cookie"
// import example from './module-example'

Vue.use(Vuex)

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      sys,
      user
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
    plugins: [
      createPersistedState({
        paths: ["user"],
        getState: key => Cookies.getJSON(key),
        setState: (key, state) =>
          Cookies.set(key, state, {
            expires: 7,
            secure: false
          })
      })
    ]
  })

  return Store
}
