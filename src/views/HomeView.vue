<template>
  <div class="home">
    <MdEditor :value="value" :handle-change="onChange" />
    <CodeEditor :value="value" :handle-change="onChange" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MdEditor from "../components/MdEditor.vue";
import CodeEditor from "../components/CodeEditor.vue";

const value = ref("");

const onChange = (v: string) => {
  value.value = v;
};
</script>
