<template>
  <div style="width: 1280px; margin: 0 auto">
    <div
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <h2>题目列表</h2>
      <a-button type="outline" @click="toCreateQuestion">
        新建题目
        <template #icon>
          <i class="iconfont icon-jia"></i>
        </template>
      </a-button>
    </div>
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
      <template #optional="{ record }">
        <a-space>
          <a-button @click="doUpdate(record)"> Edit </a-button>
          <a-button status="danger" @click="doDelete(record)"> Del </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { onMounted, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { Question, QuestionControllerService } from "../../../generated/index";

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
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
    dataIndex: "title",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
  },
  {
    title: "创建者ID",
    dataIndex: "userId",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
  },
  {
    slotName: "optional",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });

  if (res.code === 0) {
    Message.success("删除成功");
    loadData();
  } else {
    Message.error("删除失败, " + res.message);
  }
};

const router = useRouter();

const toCreateQuestion = () => {
  router.push({
    path: "/question/add",
  });
};

const doUpdate = (question: Question) => {
  router.push({
    path: "/question/update",
    query: {
      id: question.id,
    },
  });
};
</script>

<style scoped></style>
