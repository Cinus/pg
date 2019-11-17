<template>
  <h3>HAHA</h3>
</template>

<style></style>

<script>
import { mapActions } from "vuex"

export default {
  name: "SignupVerify",
  created() {
    this.signupVerify(this.$route.params.hashCode).then(() => {
      console.log("this.$store.state.user => ", this.$store.state.user)
    })
  },
  methods: {
    ...mapActions("user", ["signupVerify"])
  }
}
</script>
