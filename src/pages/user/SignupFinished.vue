<template>
  <div class="row q-pt-md">
    <div class="col-md-6 offset-md-3">
      <q-card class="q-pb-md text-center">
        <q-card-section>
          <h2>
            <q-avatar  size="100px" font-size="82px" color="teal" text-color="white" icon="email"/>
          </h2>
          <h5 class="vertical-middle q-px-xl">
            입력하신 메일 주소<small>({{email}})</small>로 <br>인증 메일이 발송되었습니다.
          </h5>
        </q-card-section>
        <div class="q-px-md">

        </div>
      </q-card>

    </div>
  </div>
</template>

<style></style>

<script>

export default {
  name: "SignupFinished",

  data() {
    return {
      email: this.$store.state.user.tempEmail,
      name: this.$store.state.user.tempName
    }
  },
  mountd() {
    console.log("mail : ", this.user.tempEmail, "  // name : ", this.user.tempName)
  }
}
</script>
