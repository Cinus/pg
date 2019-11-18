/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import call from "../async"

// initial state
// shape: [{ id, quantity }]
const state = {}

// getters
const getters = {
  logined: state => {
    return !!(state && state.id)
  },
  capChar: (state, getters) => {
    return getters.logined ? state.name[0].toUpperCase() : ''
  }
}

// actions
const actions = {
  signin({
    commit
  }, user) {
    return call(this, "post", `signin`, user, {
      success: res => {
        commit("signin", res.data)
        this.$router.push({
          name: 'home'
        })
      }
    })
  },
  signup({
    commit
  }, user) {
    return call(this, "post", `signup`, user, {
      success: res => {
        commit("signup", res.data)
        this.$router.push({
          name: 'signupFinished'
        })
      }
    })
  },
  signupVerify({
    commit
  }, code) {
    return call(
      this,
      "post",
      `signupVerify`, {
        code: code
      }, {
        success: res => {
          commit("signin", res.data)
          this.$router.push({
            name: 'home'
          })
        },
        error: res => {
          if (res.data && res.data.errCode == 'ERR001') {
            this.$router.push({
              name: 'signin'
            })
          } else {
            this.$router.push({
              name: 'home'
            })
          }
        }
      }
    )
  }
}

// mutations
const mutations = {
  signin(state, data) { // 그냥 state로 하면 안 먹힘.. 그래서 store에 접근해서 사용함
    delete data.user["password"]
    this.state.user = {
      ...this.state.user,
      id: data.user.id,
      email: data.user.email,
      name: data.user.name,
      token: data.user.token
    }
  },
  signout(state) {
    this.state.user = {}
  },
  signup(state, data) {
    this.state.user.tempEmail = data.email
    this.state.user.tempName = data.name
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
