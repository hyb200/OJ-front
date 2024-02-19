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
    <a-col flex="200px">
      <div class="user-login">
        <a-button
          type="outline"
          v-if="store.state.user.loginUser.userRole === ACCESS_ENUM.NOT_LOGIN"
          @click="toLoginView"
          >登录 / 注册
        </a-button>
        <div v-else>
          {{ store.state.user.loginUser.userName }}
        </div>
      </div>
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

    // if (!CheckAccess(store.state.user.loginUser, item.meta?.access as string)) {
    //   return false;
    // }

    return true;
  });
});

const selectedKeys = ref(["/"]);

router.afterEach((to) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

const toLoginView = () => {
  router.push({
    path: "/user/login",
    replace: true,
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

.user-login {
  text-align: center;
}
</style>
