import call from "../async"

const state = {
  fetching: 0
}

// getters
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {
  doFetch(state) {
    state.fetching += 1
  },
  endFetch(state) {
    state.fetching -= 1
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
