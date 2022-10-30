<template>
  <div>
    <el-row>
      <el-col :span="4">&nbsp;</el-col>
      <el-col :span="16">
        <h2>修改用户信息</h2>

        <el-row justify="center">
          <el-col :span="12">
            <el-card>
              <el-form ref="updateForm" :model="form" :rules="rules">
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

                <el-row justify="center">
                  <el-button type="primary" @click="update">确认</el-button>
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
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { queryCustomerById, updateCustomer } from "@/api/customer";

export default defineComponent({
  name: "CustomerUpdate",
  components: {},
  props: {},
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    const updateForm = ref();

    const form = ref({
      customerId: "",
      customerAccount: "",
      customerName: "",
      customerGender: "",
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
    });

    const update = () => {
      updateForm.value.validate((valid: any) => {
        if (valid) {
          console.log(form.value);
          updateCustomer(form.value).then((res: any) => {
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

    onMounted(() => {
      queryCustomerById(route.query.customerId).then((res: any) => {
        if (res.data.statusCode === 0) {
          form.value = res.data.data;
        }
      });
    });

    return {
      updateForm,
      form,
      rules,

      update,
      cancel,
    };
  },
  data() {
    return {};
  },
});
</script>

<style scoped lang="scss"></style>
