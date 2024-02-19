<template>
  <div class="box">
    <a-row class="grid-demo" :gutter="24">
      <a-col :span="10">
        <a-card style="height: 100%" :title="question?.title" :bordered="true">
          <template #extra>
            <a-space>
              <a-tag
                bordered
                v-if="question?.difficulty === '简单'"
                color="green"
              >
                {{ question?.difficulty }}
              </a-tag>
              <a-tag
                bordered
                v-else-if="question?.difficulty === '中等'"
                color="orange"
              >
                {{ question?.difficulty }}
              </a-tag>
              <a-tag bordered v-else color="magenta">
                {{ question?.difficulty }}
              </a-tag>
              <a-tag
                v-for="(tag, index) of question?.tags"
                color="cyan"
                :key="index"
                >{{ tag }}
              </a-tag>
            </a-space>
          </template>
          <a-tabs type="text" style="height: 100%">
            <a-tab-pane key="question" title="题目描述">
              <div class="question-msg">
                <a-descriptions :data="data" title="相关信息" bordered />
              </div>
              <a-divider size="0"></a-divider>
              <div class="viewer">
                <MdViewer :value="question?.content" />
              </div>
            </a-tab-pane>
            <a-tab-pane key="comment" title="评论区"> 评论区 </a-tab-pane>
            <a-tab-pane key="solution" title="题解"> 题解页面 </a-tab-pane>
            <a-tab-pane key="record" title="提交记录"> 提交记录 </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
      <a-col :span="14">
        <div class="right-pane">
          <div class="editor">
            <CodeEditor />
          </div>
          <a-divider size="0"></a-divider>
          <div class="debug-box">
            <div class="status-bar">111</div>
            <div class="debug-msg">
              <a-form :model="form" layout="vertical">
                <a-form-item field="input" label="Input">
                  <a-textarea auto-size />
                </a-form-item>
                <a-form-item field="output" label="Onput">
                  <a-textarea auto-size />
                </a-form-item>
                <a-form-item>
                  <a-button>Submit</a-button>
                </a-form-item>
              </a-form>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { ref, withDefaults, defineProps, onMounted } from "vue";
import CodeEditor from "../../components/CodeEditor.vue";
import MdViewer from "../../components/MdViewer.vue";
import {
  QuestionControllerService,
  QuestionVO,
} from "../../../generated/index";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const question = ref<QuestionVO>();
const data = ref<any>([]);

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  console.log(res);
  if (res.code === 0) {
    question.value = res.data;
    data.value.push(
      {
        label: "时间限制",
        value: question.value?.judgeConfig?.timeLimit,
      },
      {
        label: "内存限制",
        value: question.value?.judgeConfig?.memoryLimit,
      }
    );
  } else {
    Message.error("加载失败, " + res.message);
  }
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.box {
  background-color: gray;
  height: calc(100vh - 78px - 16px - 48px - 20px);
  display: flex;
  /* align-items: center; */
  justify-content: center;
}

.grid-demo {
  width: 90%;
  height: 100%;
}

.grid-demo .arco-col {
  height: 100%;
  color: var(--color-black);
}

.viewer {
  overflow-x: hidden;
  overflow-y: auto;
}

.right-pane {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.debug-box {
  height: 300px;
  /* flex: 1; */
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.status-bar {
  height: 42px;
  background-color: green;
}

.debug-msg {
  height: 100%;
  background-color: yellow;
  padding: 20px;
  overflow: auto;
}
</style>
