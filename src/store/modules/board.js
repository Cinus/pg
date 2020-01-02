/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import call from "../async"

// initial state
// shape: [{ id, quantity }]
const state = {
  posts: [],
  postDetail: {}
}

// getters
const getters = {

}

// actions
const actions = {
  getPosts({
    commit
  }, params) {
    return call(this, "get", `boards/${params.board_id}/posts`, params, {
      commit: 'board/getPosts'
    })
  },
  getPostDetail({
    commit
  }, params) {
    return call(this, "get", `boards/${params.board_id}/posts/${params.id}`, {}, {
      commit: 'board/getPostDetail'
    })
  }
}

// mutations
const mutations = {
  getPosts(state, data) {
    state.posts = data
  },
  getPostDetail(state, data) {
    state.postDetail = data
  },
  clearPosts(state) {
    state.posts.splice(0, state.posts.length)
  },
  clearPostDetail(state) {
    state.postDetail = {}
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
