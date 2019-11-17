<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
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
            <q-item clickable v-close-popup v-show="logined" @click="signout">
              <q-item-section avatar>
                <q-avatar icon="exit_to_app" color="negative" text-color="white" size="md" />
              </q-item-section>
              <q-item-section>
                <q-item-label >로그아웃</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup v-show="!logined" :to="{ name: 'signin' }" :active="false">
              <q-item-section avatar>
                <q-avatar icon="vpn_key" color="primary" text-color="white" size="md" />
              </q-item-section>
              <q-item-section>
                <span class="text-black">로그인</span>
              </q-item-section>
            </q-item>
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
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
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
