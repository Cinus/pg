<template>
  <div class="q-pa-md">
    <h2>게시판!</h2>
    <q-table
      title="자유게시판"
      :data="posts"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<style></style>

<script>
import { mapActions, mapState } from "vuex"

export default {
  name: "Posts",

  data() {
    return {
      columns: [
        // {
        //   name: 'no',
        // },
        { name: 'title', label: '제목', field: 'title' },
        { name: 'views', label: '조회수', field: 'views' }
      ]
    }
  },
  mounted() {
    console.log(this.$route.params)
    this.getPosts(this.$route.params)
  },
  computed: {
    ...mapState('board', [
      'posts'
    ]),
  },
  methods: {
    ...mapActions("board", ["getPosts"])
  }
}
</script>
