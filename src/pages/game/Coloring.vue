<template>
  <div>
    <div class="row" v-if="isMobile">
      <div class="col text-center" >
        <q-btn
          v-show="!$q.fullscreen.isActive"
          class="q-mt-md"
          color="secondary"
          @click="$q.fullscreen.toggle()"
          :icon="'fullscreen'"
          :label="'Go Fullscreen'"
        />
      </div>
    </div>
    <div v-show="$q.fullscreen.isActive" class="window-height column justify-center text-center" @touch="noPop">
      <q-btn
        round
        v-touch-hold:10.mouse="doPop"
        size="lg"
        id="smile"
        icon="sentiment_satisfied_alt"
        class="absolute bg-white"
        :style="btnPos"
      >
      </q-btn>
      <div class="absolute-center q-my-none">
        <h1>{{num}}</h1>
      </div>
    </div>
  </div>
</template>

<style>
  #smile{
    z-index: 10;
    -webkit-transition: left 2s, top 2s;
    transition: left 2s, top 2s;
  }
</style>

<script>
import { mapActions } from "vuex"

export default {
  name: "Coloring",

  data() {
    return {
      num: 0,
      colors: [
        'red-7',
        'pink-3',
        'purple-10',
        'teal-6',
        'green-6',
        'cyan-6',
        'blue-6',
        'yellow-5',
      ],
      btn: {
        pos: {
          left: 175,
          top: 450
        }
      }
    }
  },
  computed: {
    btnPos: function() {
      return {
        left: this.btn.pos.left + 'px',
        top: this.btn.pos.top + 'px'
      }
    },
    isMobile: function () {
      return this.$q.screen.lt.md
    }
  },
  mounted() {
    console.log("HELLO!")
    console.log(this.$q)
    console.log(this.$q.screen)
    console.log(this.$q.fullscreen)
  },
  methods: {
    doPop: function () {
      let left = Math.round(Math.random() * 350)
      let top = Math.round(Math.random() * 700)
      console.log(left)
      console.log(top)
      this.num += 1
      this.btn.pos.left = left
      this.btn.pos.top = top
      new Audio(require('../../statics/audio/ppop.mp3')).play()
    },
    noPop: function () {
      this.num = Math.max(this.num-1, 0)
    }

  }
}
</script>
