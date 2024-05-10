<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar @click="goToSearch" class="cursor-pointer">
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Поисковая система Politex
        </q-toolbar-title>
        <q-btn v-if="isLogin" flat round dense icon="logout" @click="logout">
          <q-tooltip>Выйти</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container class="pt-0-important bg-auth">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<style scoped>
.bg-auth {
  background-color: #F0F4F3;
  background-image: url("../assets/bg-auth.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isLogin = computed(() => localStorage.getItem('token'))

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

const goToSearch = () => {
  router.push('/search')
}

</script>