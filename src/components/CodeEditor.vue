<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    style="min-height: 100px; height: 60vh"
  />
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, withDefaults, defineProps, watch } from "vue";

interface Props {
  value: string;
  language: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "cpp",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const codeEditorRef = ref();
const editor = ref();

watch(
  () => props.language,
  () => {
    changeLang(props.language);
  }
);

onMounted(() => {
  if (!codeEditorRef.value) return;

  editor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    lineNumbers: "on",
    minimap: {
      enabled: false,
    },
    roundedSelection: false,
    automaticLayout: true,
    scrollBeyondLastLine: false,
    readOnly: false,
    fontSize: 18,
    theme: "vs",
  });

  //  监听编辑器内容变化
  editor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(editor.value).getValue());
  });
});

const changeLang = (v: string) => {
  monaco.editor.setModelLanguage(toRaw(editor.value).getModel(), v);
};

const updateEditorOptions = () => {
  editor.value.updateOptions({
    fontSize: 30,
    readOnly: true,
  });
};
</script>

<style scoped></style>
