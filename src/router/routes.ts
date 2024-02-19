import { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import AboutView from "../views/AboutView.vue";
import ACCESS_ENUM from "@/access/AccessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import QuestionEditView from "../views/question/QuestionEditView.vue";
import ManageQuestionView from "../views/question/ManageQuestionView.vue";
import QuestionListView from "../views/question/QuestionListView.vue";
import QuestionSubmitView from "../views/question/QuestionSubmitView.vue";
import SubmitRecordView from "../views/question/SubmitRecordView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/question",
    name: "题库",
    component: QuestionListView,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/hide",
    name: "隐藏页面",
    component: HomeView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/question/add",
    name: "创建题目",
    component: QuestionEditView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/question/update",
    name: "修改题目",
    component: QuestionEditView,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/question/submit_record",
    name: "提交记录",
    component: SubmitRecordView,
    meta: {
      // hideInMenu: true,
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/question/view/:id",
    name: "在线做题",
    component: QuestionSubmitView,
    props: true,
    meta: {
      hideInMenu: true,
      // access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/question/manager",
    name: "题目管理",
    component: ManageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/404",
    name: "404",
    component: NotFoundView,
  },
];
