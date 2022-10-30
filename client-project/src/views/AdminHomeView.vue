<template>
  <div>
    <h1>ADMIN HOME</h1>

    <router-link to="/customer/query">用户管理</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { home } from "@/api/admin";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "AdminHomeView",
  components: {},

  setup() {
    // 测试token能否使用
    home().then((res) => {
      ElMessage({
        showClose: true,
        message: res.data.message,
        type: "success",
      });
    });

    return {};
  },
});
</script>
