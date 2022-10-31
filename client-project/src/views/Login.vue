<!-- Login.vue -->
<template>
  <el-row justify="center" class="mt-25">
    <el-col :span="6">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>登录</span>
          </div>
        </template>

        <el-form ref="loginForm" :model="form" :rules="rules">
          <el-form-item label="账号" prop="account">
            <el-input v-model="form.account" />
          </el-form-item>

          <el-form-item label="密码" prop="pwd">
            <el-input v-model="form.pwd" type="password" show-password />
          </el-form-item>

          <el-form-item label="角色" prop="role">
            <el-radio-group v-model="form.role">
              <el-radio label="admin">管理员</el-radio>
              <el-radio label="customer">普通用户</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-row justify="center">
            <el-button type="primary" @click="loginHandler">登录</el-button>
            <el-button type="danger" @click="reset">重置</el-button>
          </el-row>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

import { ElMessage, FormRules } from "element-plus";
import { useRouter } from "vue-router";

import { login } from "@/api/login";

export default defineComponent({
  name: "LoginView",
  components: {},
  props: {},
  setup(props, context) {
    const router = useRouter();
    const loginForm = ref();

    let form = reactive({
      account: "",
      pwd: "",
      role: "",
    });
    let rules = reactive<FormRules>({
      account: [{ required: true, message: "请输入账号", trigger: "change" }],
      pwd: [{ required: true, message: "请输入密码", trigger: "change" }],
      role: [{ required: true, message: "请选择角色", trigger: "change" }],
    });

    // let rules = {
    //   account: [{ required: true, message: "请输入账号", trigger: "change" }],
    //   pwd: [{ required: true, message: "请输入密码", trigger: "change" }],
    //   role: [{ required: true, message: "请选择角色", trigger: "change" }],
    // };

    const loginHandler = () => {
      console.log(form);
      loginForm.value.validate((valid: any, fields: any) => {
        if (valid) {
          login(form)
            .then((res: any) => {
              console.log(res);
              if (res.data.statusCode === 0) {
                // 在登录成功后获取到 JWT token 时，需要将其保存起来，以供后续请求的校验使用
                sessionStorage.setItem("token", res.data.data.token);

                ElMessage({
                  showClose: true,
                  message: res.data.message,
                  type: "success",
                });
                if (form.role === "admin") {
                  router.push("/adminHome");
                } else {
                  router.push("/customerHome");
                }
              } else {
                ElMessage({
                  showClose: true,
                  message: res.data.message,
                  type: "error",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          // console.log(fields);
        }
      });
    };

    const reset = () => {
      // form.account = "";
      // form.pwd = "";
      // form.role = "";
      loginForm.value.resetFields();
    };

    return {
      loginForm,
      form,
      rules,

      loginHandler,
      reset,
    };
  },
  data() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.mt-25 {
  margin-top: 25vh;
}
</style>
