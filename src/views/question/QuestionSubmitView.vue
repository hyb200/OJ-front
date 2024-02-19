<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
                bordered
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig?.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig?.memoryLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" />
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
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论" disabled> 评论区</a-tab-pane>
          <a-tab-pane key="solution" title="题解"> 暂时无法查看题解</a-tab-pane>
          <a-tab-pane key="record" title="提交记录"> 提交记录</a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <div id="editor-box">
          <div class="code-editor-title">
            <i class="iconfont icon-daima"></i>
            代码
          </div>
          <div class="code-editor-menu">
            <a-select
              size="small"
              :default-value="'cpp'"
              v-model="form.language"
              :style="{ width: '120px' }"
              placeholder="Language"
            >
              <a-option value="cpp">C++</a-option>
              <a-option value="c">C</a-option>
              <a-option value="java">Java</a-option>
              <a-option value="python">Python</a-option>
              <a-option value="go">Go</a-option>
              <a-option value="html">Html</a-option>
            </a-select>
            <i class="iconfont icon-shezhi shezhi"></i>
          </div>

          <CodeEditor
            :value="form.code"
            :language="form.language"
            :handle-change="changeCode"
          />
        </div>
        <a-divider size="0" />
        <a-button type="primary" style="min-width: 200px" @click="doSubmit">
          提交代码
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, withDefaults, defineProps } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const question = ref<QuestionVO>();

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载失败，" + res.message);
  }
};

const form = ref<QuestionSubmitAddRequest>({
  language: "cpp",
  code: "",
});

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }

  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败," + res.message);
  }
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const changeCode = (value: string) => {
  form.value.code = value;
};
</script>

<style>
#viewQuestionView {
  max-width: 90%;
  margin: 0 auto;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}

#editor-box {
  background-color: white;
  border: 1px lightgray solid;
}

#editor-box .code-editor-title {
  display: flex;
  background-color: whitesmoke;
  height: 35px;
  font-size: 20px;
  text-align: left;
  align-items: center;
  user-select: none;
}

#editor-box .code-editor-title .iconfont {
  font-size: 24px;
  margin-right: 6px;
}

.code-editor-menu {
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px whitesmoke solid;
}

.shezhi {
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
}
</style>
