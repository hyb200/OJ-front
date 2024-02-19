<!--创建题目界面（管理员）-->
<template>
  <div class="return-btn" @click="doReturn">
    <i class="iconfont icon-fanhui"></i>
  </div>
  <div style="width: 1280px; margin: 0 auto">
    <h2 v-if="!isUpdate">创建题目</h2>
    <h2 v-else>编辑题目</h2>
    <a-form :model="form" layout="vertical">
      <a-form-item field="title" label="题目标题">
        <a-input v-model="form.title" placeholder="Please enter the title" />
      </a-form-item>
      <a-form-item field="tags" label="题目标签">
        <a-select
          placeholder="Please select difficulty"
          :style="{ width: '320px', marginRight: '10px' }"
          v-model="form.difficulty"
        >
          <a-option :tag-props="{ color: 'green' }">简单</a-option>
          <a-option :tag-props="{ color: 'orange' }">中等</a-option>
          <a-option :tag-props="{ color: 'red' }">困难</a-option>
        </a-select>
        <a-input-tag
          v-model="form.tags"
          placeholder="Please enter the tags"
          allow-clear
        />
      </a-form-item>
      <a-form-item field="content" label="题目内容">
        <MdEditor
          :value="form.content"
          :handle-change="onContentChange"
          style="width: 100%"
        />
      </a-form-item>

      <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
        <a-space fill>
          <a-form-item field="judgeConfig.timeLimit" label="时间限制(s)">
            <a-input-number v-model="form.judgeConfig.timeLimit" :min="0" />
          </a-form-item>
          <a-form-item field="judgeConfig.memoryLimit" label="内存限制(MB)">
            <a-input-number v-model="form.judgeConfig.memoryLimit" :min="0" />
          </a-form-item>
        </a-space>
      </a-form-item>

      <a-form-item
        label="测试用例配置"
        :content-flex="false"
        :merge-props="false"
      >
        <a-form-item
          v-for="(judgeCaseItem, index) of form.judgeCase"
          :key="index"
          no-style
        >
          <a-space style="min-width: 640px">
            <a-form-item
              :field="`form.judgeCase[${index}].input`"
              :label="`输入用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.input"
                placeholder="请输入测试输入用例"
              />
            </a-form-item>
            <a-form-item
              :field="`form.judgeCase[${index}].output`"
              :label="`输出用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.output"
                placeholder="请输入测试输出用例"
              />
            </a-form-item>
            <a-button status="danger" @click="handleDelete(index)">
              删除
            </a-button>
          </a-space>
        </a-form-item>
        <div>
          <a-button @click="handleAdd" type="outline" status="success">
            新增测试用例
          </a-button>
        </div>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" style="width: 300px" @click="doSubmit">
          确定提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { onMounted, ref } from "vue";
import { QuestionControllerService } from "../../../generated/index";
import MdEditor from "../../components/MdEditor.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

//  如果页面地址包含update，更新页面
const isUpdate = route.path.includes("update");

let form = ref({
  title: "",
  tags: [],
  content: "",
  difficulty: "",
  judgeConfig: {
    timeLimit: 1000,
    memoryLimit: 1000,
  },
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
});

/**
 * 根据题目id获取原始数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  );

  console.log("res", res);

  if (res.code === 0) {
    form.value = res.data as any;
    if (!form.value.judgeCase) {
      form.value.judgeCase = [
        {
          input: "",
          output: "",
        },
      ];
    } else {
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any);
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = {
        memoryLimit: 1000,
        timeLimit: 1000,
      };
    } else {
      form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
    }

    if (!form.value.tags) {
      form.value.tags = [];
    } else {
      form.value.tags = JSON.parse(form.value.tags as any);
    }
  } else {
    Message.error("加载失败，" + res.message);
  }
};

onMounted(() => {
  loadData();
});

const doSubmit = async () => {
  console.log(form.value);
  if (isUpdate) {
    console.log("update");
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      Message.success("更新成功");
    } else {
      Message.error("更新失败，" + res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      Message.success("创建成功");
    } else {
      Message.error("创建失败，" + res.message);
    }
  }
};

const onContentChange = (v: string) => {
  form.value.content = v;
};

/**
 * 新增判题用例
 */
const handleAdd = () => {
  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};

/**
 * 删除判题用例
 */
const handleDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1);
};

/**
 * 点击后退按钮返回上一页
 */
const doReturn = () => {
  router.go(-1);
};
</script>

<style scoped>
.return-btn {
  position: fixed;
}

.return-btn i {
  font-size: 24px;
  cursor: pointer;
}
</style>
