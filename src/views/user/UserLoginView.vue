<template>
  <div id="userLoginView">
    <a-form
      label-align="left"
      :model="form"
      size="large"
      :style="{ width: '450px', margin: '0 auto' }"
      auto-label-width
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于8位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
          allow-clear
        />
      </a-form-item>
    </a-form>
    <div>
      <a-button
        type="primary"
        html-type="submit"
        style="width: 200px"
        @click="handleSubmit"
      >
        登录
      </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();

const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败");
  }
};
</script>

<style scoped>
#userLoginView {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
