<template>
  <div style="width: 1280px; margin: 0 auto">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="id" label="ID">
        <a-input-number
          v-model="searchParams.id"
          placeholder="请输入题目ID"
          hide-button
          style="min-width: 240px"
        />
      </a-form-item>
      <a-form-item field="title" label="标题">
        <a-input
          v-model="searchParams.title"
          placeholder="请输入题目标题"
          style="min-width: 240px"
        />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag
          v-model="searchParams.tags"
          placeholder="请输入题目标签"
          style="min-width: 240px"
        />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" @click="doSearch">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider />
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
      <template #title="{ record }">
        <div class="title" @click="toQuestionView(record.id)">
          {{ record.title }}
        </div>
      </template>
      <template #acceptedRate="{ record }">
        {{
          `${record.submitNum ? record.acceptedNum / record.submitNum : "0"} %`
        }}
      </template>
      <template #difficulty="{ record }">
        <a-tag bordered v-if="record.difficulty === '简单'" color="green">{{
          record.difficulty
        }}</a-tag>
        <a-tag
          bordered
          v-else-if="record.difficulty === '中等'"
          color="orange"
          >{{ record.difficulty }}</a-tag
        >
        <a-tag bordered v-else color="magenta">{{ record.difficulty }}</a-tag>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { onMounted, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { QuestionControllerService } from "../../../generated/index";
import { QuestionQueryRequest } from "../../../generated/models/QuestionQueryRequest";

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionQueryRequest>({
  id: undefined,
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
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
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "标题",
    slotName: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acceptedRate",
  },
  {
    title: "难度",
    slotName: "difficulty",
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
