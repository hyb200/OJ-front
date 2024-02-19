<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-content class="content">
        <div class="main">
          <div class="title">STOJ</div>
          <div class="menu">
            <div class="menu-item" @click="handleClick('login')">登录</div>
            <span style="font-size: large">|</span>
            <div class="menu-item" @click="handleClick('register')">注册</div>
          </div>
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer class="footer">STOJ By Mendicus</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#userLayout {
  text-align: center;
  background: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png")
    0% 0% / 100% 100%;
}

#userLayout .header {
  margin-bottom: 16px;
}

#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}

#userLayout .footer {
  background: #efefef;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

#userLayout .main {
  max-width: 600px;
  height: 700px;
  margin: 0 auto;
  margin-top: 130px;
  background-color: rgba(235, 101, 101, 0.1);
  border-radius: 1.5em;
}

#userLayout .main .title {
  padding: 20px;
  font-size: 48px;
  font-weight: 700;
}

.menu {
  /* width: 100%; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.menu .menu-item {
  width: 100px;
  height: 40px;
  line-height: 40px;
  font-size: large;
  user-select: none;
}
</style>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleClick = (path: string) => {
  router.push({
    path: path,
    replace: true,
  });
};
</script>
