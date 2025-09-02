<script setup>
import { routeNames } from '@/router/routeNames';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';


const router = useRouter();

const authStore = useAuthStore();

function handleSignOut() {
  authStore.signOut();
  router.push({ name: routeNames.signIn });
}
</script>

<template>
  <div class="layout-top-bar">
    <div class="wrapper">
      <div class="layout-top-bar__data">
        <div class="layout-top-bar__box">
          <img src="@/assets/logo.svg" alt="emnify">
        </div>

        <div class="layout-top-bar__box layout-top-bar__box--menu">
          <button @click="handleSignOut" class="signout-btn">{{ $t('navigation.signOut') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.layout-top-bar, .wrapper, .layout-top-bar__data {
  height: 100%;
}
.layout-top-bar__data {
  display: flex;
  align-items: center;
}
.layout-top-bar__box--menu {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}
</style>
