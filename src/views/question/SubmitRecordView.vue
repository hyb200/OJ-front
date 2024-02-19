<template>
  <div style="width: 1280px; margin: 0 auto">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="id" label="题目ID">
        <a-input-number
          v-model="searchParams.questionId"
          placeholder="请输入题目ID"
          hide-button
          style="min-width: 240px"
        />
      </a-form-item>
      <a-form-item field="tags" label="语言">
        <a-select
          size="small"
          v-model="searchParams.language"
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
      </a-form-item>

      <a-form-item>
        <a-button type="primary" @click="doSearch">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(tag, index) of record.tags"
            :key="index"
            color="green"
            >{{ tag }}</a-tag
          >
        </a-space>
      </template>
      <template #judgeInfo="{ record }">
        {{ JSON.stringify(record.judgeInfo) }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
        <!-- {{ record.createTime }} -->
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { onMounted, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import {
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated/index";
import moment from "moment";

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionSubmitQueryRequest>({
  language: undefined,
  questionId: undefined,
  pageSize: 10,
  current: 1,
  sortField: "createTime",
  sortOrder: "descend",
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    searchParams.value
  );
  console.log(res);
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    Message.error("加载失败, " + res.message);
  }
};

/**
 * 监听loadData中的变量的值，执行loadData重新加载数据
 */
watchEffect(() => {
  loadData();
});

onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "提交号",
    dataIndex: "id",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题信息",
    slotName: "judgeInfo",
  },
  {
    title: "判题状态",
    dataIndex: "status",
  },
  {
    title: "题目 id",
    dataIndex: "questionId",
  },
  {
    title: "提交者 id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const router = useRouter();

const toQuestionView = (id: number) => {
  router.push({
    path: `/question/view/${id}`,
  });
};

/**
 * 搜索题目
 */
const doSearch = () => {
  //  注意重置页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
.title:hover {
  user-select: none;
  cursor: pointer;
  color: rgb(25, 25, 182);
}
</style>
