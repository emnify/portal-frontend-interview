<script setup>
import { computed } from 'vue';

import LayoutNavLink from '@/components/layout/LayoutNavLink.vue';
import { routeNames } from '@/router/routeNames';

const navList = computed(() => [
  {
    list: [
      {
        text: 'dashboard.title',
        icon: 'workspace-home',
        exact: true,
        route: { name: routeNames.dashboard },
      },
      {
        text: 'users.title',
        icon: 'sim-device-event-device-on',
        route: { name: routeNames.users },
      },
    ],
  },
]);
</script>
<template>
  <div
    class="layout-nav"
    :class="{
      'layout-nav--support-access': isSupportAccessMode,
    }"
  >
    <div class="layout-nav__data">
      <div class="layout-nav__box layout-nav__box--list">
        <div
          v-for="(navGroup, index) in navList"
          :key="index"
          class="layout-nav__group"
        >
          <LayoutNavLink
            v-for="(navLink, navLinkIndex) in navGroup.list"
            :key="navLinkIndex"
            :nav-link="navLink"
            @click="onCloseNav"
          />
          <i
            v-if="index !== 0"
            aria-hidden="true"
            class="layout-nav__group-sep"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-nav {
  background: var(--eui-sys-layout-surface-02);
  -webkit-overflow-scrolling: touch;
  box-shadow: none;
}

.layout-nav__close {
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
  width: calc(100% - var(--base-nav-width));
  height: 100%;
  background: rgb(0 0 0 / 28%);

  @media (--viewport-large-tablet) {
    display: none;
  }
}

.layout-nav__data {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}

.layout-nav__group {
  position: relative;
  padding-top: 16px;
}

.layout-nav__group-sep {
  display: block;
  width: 23px;
  height: 1px;
  margin-top: 16px;
  margin-left: 19px;
  background: var(--eui-sys-layout-border);
}

.layout-nav__box {
  box-sizing: border-box;
}

.layout-nav__box--list {
  flex: 1;
  margin-bottom: 8px;
  -webkit-overflow-scrolling: touch;

  @mixin scrollbar-thumb;
}

.layout-nav__box--meta {
  overflow: hidden;
  min-width: var(--base-nav-width);
  padding: 5px 15px 0;
}

.layout-nav__co-branding {
  padding: 10px 20px;
}

.layout-nav--support-access {
  background: var(--eui-sys-layout-border) url('/images/dotted-pattern.png') center;
}
</style>
