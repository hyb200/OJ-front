<template>
  <a-row id="globalHeader" class="grid-demo" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title_bar">STOJ</div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user?.loginUser?.userName ?? "未登录" }}</div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import CheckAccess from "@/access/CheckAccess";
import ACCESS_ENUM from "@/access/AccessEnum";

const router = useRouter();
const store = useStore();

const visibleRoutes = computed(() => {
  return routes.filter((item, idx) => {
    if (item.meta?.hideInMenu) {
      return false;
    }

    if (!CheckAccess(store.state.user.loginUser, item.meta?.access as string)) {
      return false;
    }

    return true;
  });
});

setTimeout(() => {
  store.dispatch("getLoginUser", {
    userName: "ikun",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);

const selectedKeys = ref(["/"]);

router.afterEach((to) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
.title_bar {
  color: black;
  font-weight: bolder;
  font-size: 42px;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
</style>
