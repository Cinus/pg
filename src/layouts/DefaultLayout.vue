<template>
  <q-layout view="hHh Lpr lFf">
    <q-btn class="fixed-top-right" icon="close" round @click="$q.fullscreen.toggle()"/>
    <q-header elevated v-show="!$q.fullscreen.isActive">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          <q-avatar rounded>
            <router-link :to="{ name: 'home' }">
              <img alt="logo" class="full-width" src="~assets/img/logo.png" />
            </router-link>
          </q-avatar>
        </q-toolbar-title>

        <q-btn-dropdown
          stretch
          flat
        >
          <template v-slot:label>
            <div class="row items-center no-wrap">
              <q-avatar rounded v-if="logined" color="info">
                {{capChar}}
              </q-avatar>
              <q-avatar rounded v-else icon="account_circle"/>
            </div>
          </template>

          <q-list>
            <template v-if="logined">
              <q-item clickable v-close-popup v-show="logined" @click="signout">
                <q-item-section avatar>
                  <q-avatar icon="exit_to_app" color="negative" text-color="white" size="md" />
                </q-item-section>
                <q-item-section>
                  <q-item-label >로그아웃</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-else>
              <q-item clickable v-close-popup :to="{ name: 'signin' }" :active="false">
                <q-item-section avatar>
                  <q-avatar icon="vpn_key" color="primary" text-color="white" size="md" />
                </q-item-section>
                <q-item-section>
                  <span class="text-black">로그인</span>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup :to="{ name: 'signup' }" :active="false">
                <q-item-section avatar>
                  <q-avatar icon="person_add" color="primary" text-color="white" size="md" />
                </q-item-section>
                <q-item-section>
                  <span class="text-black">회원가입</span>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>게시판</q-item-label>
        <q-item clickable :to="{ name: 'posts', params: { board_id: 24 } }">
          <q-item-section avatar>
            <q-icon name="speaker_notes" />
          </q-item-section>
          <q-item-section>
            <q-item-label>자유게시판</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'coloring' }">
          <q-item-section avatar>
            <q-icon name="speaker_notes" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Coloring</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: "DefaultLayout",

  data() {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    ...mapMutations('user',[
      'signout'
    ]),
  },
  computed: {
    ...mapState([
      'user'
    ]),
    ...mapGetters('user', [
      'logined', 'capChar'
    ])
  }
}
</script>
