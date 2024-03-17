<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="pt-0-important bg-auth">
      <q-page>
        <div class="row" style="height: 100vh">
          <div class="col-12 flex content-center justify-center">
            <q-card class="q-ma-xl">
              <div class="row">
                <div class="col-0 col-sm-5 bg-primary rounded-left-borders xs-hide">
                  <div class="row full-width q-px-xl q-pb-xl full-height flex flex-center">
                    <div class="">
                      <div class="text-h4 text-uppercase text-white fredoka" style="min-width: 220px">Добро пожаловать!</div>
                      <div class="text-white q-my-sm text-subtitle1">Пожалуйста войдите в систему для начала работы. </div>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-sm-7">
                  <div class="row q-ml-sm q-mt-sm sm-and-up-hide">
                    <div class="col-12 fredoka text-subtitle1">
                      <router-link class="text-primary" style="text-decoration: none" to="/">
                        Поисковая система клиентов банка
                      </router-link>
                    </div>
                  </div>
                  <div class="row q-pa-sm-sm q-pa-md">
                    <div class="col-12">
                      <q-card-section>
                        <div class="q-mb-xl">
                          <div class="flex justify-center">
                            <div class="text-h4 text-uppercase q-my-none text-weight-bold text-primary fredoka">
                              Вход</div>
                          </div>
                        </div>

                        <q-form ref="form" class="q-gutter-md" @submit="submit">
                          <q-input v-model="user.email" label="Email" name="Email" required />

                          <q-input v-model="user.password" label="Password" name="password" type="password" required />

                          <div>
                            <q-btn class="full-width fredoka" color="primary" label="Login" rounded
                              type="submit"></q-btn>
                          </div>
                        </q-form>
                      </q-card-section>
                    </div>
                  </div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>

</template>

<script setup>
import { ref, reactive } from 'vue'
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';

const user = reactive({
  email: null,
  password: null
})

const form = ref(null)

const router = useRouter();

const submit = async () => {
  
  if (form.value.validate()) {
    const response = await api.post('user/login', {
      email: user.email,
      password: user.password
    })
    if(response) {
      const token = response.data.token;
      localStorage.setItem('token', token);
      router.push('/search')
    }
  }
}
</script>

<style scoped>
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: 0;
}

.login-image {
  z-index: 1;
}

.bg-auth {
  background-color: #F0F4F3;
  background-image: url("../assets/bg-auth.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>