<template>
    <q-layout view="hHh lpR fFf">
  
      <q-header class="bg-primary text-white">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>
            Title
          </q-toolbar-title>
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