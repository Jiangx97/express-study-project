<template>
  <div>
    <el-row>
      <el-col :span="4">&nbsp;</el-col>
      <el-col :span="16">
        <h2>新增用户信息</h2>

        <el-row justify="center">
          <el-col :span="12">
            <el-card>
              <el-form ref="addForm" :model="form" :rules="rules">
                <el-form-item label="账号：" prop="customerAccount">
                  <el-input v-model="form.customerAccount" clearable />
                </el-form-item>

                <el-form-item label="姓名：" prop="customerName">
                  <el-input v-model="form.customerName" clearable />
                </el-form-item>

                <el-form-item label="性别：" prop="customerGender">
                  <el-radio-group v-model="form.customerGender">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="密码：" prop="customerPwd">
                  <el-input
                    v-model="form.customerPwd"
                    type="password"
                    show-password
                    clearable
                    readonly
                    @click="
                      (e:any) => {
                        e.target.readOnly = false;
                      }
                    "
                  />
                </el-form-item>
                <el-form-item label="确认密码：" prop="confirmPwd">
                  <el-input
                    v-model="form.confirmPwd"
                    type="password"
                    show-password
                    clearable
                    readonly
                    @click="
                      (e:any) => {
                        e.target.readOnly = false;
                      }
                    "
                  />
                </el-form-item>

                <el-row justify="center">
                  <el-button type="primary" @click="add">确认</el-button>
                  <el-button type="danger" @click="cancel">取消</el-button>
                </el-row>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

import { addCustomer } from "@/api/customer";

export default defineComponent({
  name: "CustomerAdd",
  components: {},
  props: {},
  setup(props, context) {
    const router = useRouter();
    const addForm = ref();

    const form = ref({
      customerAccount: "",
      customerName: "",
      customerGender: "",
      customerPwd: "",
      confirmPwd: "",
    });
    const rules = ref({
      customerAccount: [
        { required: true, message: "请输入账号", trigger: "change" },
      ],
      customerName: [
        { required: true, message: "请输入姓名", trigger: "change" },
      ],
      customerGender: [
        { required: true, message: "请选择性别", trigger: "change" },
      ],
      customerPwd: [
        { required: true, message: "请输入密码", trigger: "change" },
        { min: 6, message: "密码至少要6位", trigger: "change" },
      ],
      confirmPwd: [
        { required: true, message: "请确认密码", trigger: "change" },
      ],
    });

    const add = () => {
      addForm.value.validate((valid: any) => {
        if (valid) {
          console.log(form.value);
          if (form.value.customerPwd !== form.value.confirmPwd) {
            ElMessage({
              showClose: true,
              message: "两次密码输入不一致",
              type: "error",
            });
            form.value.customerPwd = "";
            form.value.confirmPwd = "";
            return;
          }
          addCustomer(form.value).then((res: any) => {
            if (res.data.statusCode === 0) {
              ElMessage({
                showClose: true,
                message: res.data.message,
                type: "success",
              });
              router.back();
            }
          });
        }
      });
    };

    const cancel = () => {
      router.back();
    };
    return {
      addForm,
      form,
      rules,

      add,
      cancel,
    };
  },
  data() {
    return {};
  },
});
</script>

<style scoped lang="scss"></style>
