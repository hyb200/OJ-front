<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<style>
#app {
}
</style>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

//  全局初始化函数，全局单次调用
const doInit = () => {
  console.log("hello world");
};

onMounted(() => {
  doInit();
});

const router = useRouter();
const store = useStore();
console.log(store.state.user?.loginUser?.role);
</script>
