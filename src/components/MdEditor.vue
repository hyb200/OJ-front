<template>
  <Editor
    :value="value"
    :mode="mode"
    :plugins="plugins"
    @change="handleChange"
    :editorConfig="{ fontSize: '24px' }"
  />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math";
import { Editor, Viewer } from "@bytemd/vue-next";
import { withDefaults, defineProps } from "vue";

interface Props {
  value: string;
  mode?: string;
  handleChange: (v: string) => void;
}

const plugins = [gfm(), highlight(), math()];

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  mode: () => "split",
  handleChange: (v: string) => {
    console.log(v);
  },
});
</script>

<style scoped>
:deep(.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child) {
  display: none;
}

.bytemd {
  font-size: 24px;
}
</style>
