<script setup>
import LayoutNav from '@/components/layout/LayoutNav.vue';
import LayoutTopBar from '@/components/layout/LayoutTopBar.vue';

</script>

<template>
  <div class="layout">
    <div class="layout__box layout__box--top-bar">
      <LayoutTopBar />
    </div>
    <div class="layout__data">
      <div class="layout__box layout__box--nav">
        <LayoutNav class="layout__nav" />
      </div>
      <div class="layout__box layout__box--content">
        <div class="wrapper">
          <RouterView />
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.layout__data {
  display: flex;
  width: 100%;
  height: 100%;
}

.layout__box--top-bar {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 990;
  height: 70px;
}

.layout__box--content {
  flex: 1;
}

.layout__box--nav {
  position: relative;
  width: 270px;
  height: calc(100vh - 70px);
}

.layout__nav {
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 70px;
  width: 270px;
  height: 100%;
  box-sizing: border-box;
}
</style>
