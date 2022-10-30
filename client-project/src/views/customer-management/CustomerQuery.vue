<!-- CustomerQuery.vue -->
<template>
  <div>
    <el-row>
      <el-col :span="4">&nbsp;</el-col>
      <el-col :span="16">
        <h2>查询条件</h2>
        <el-form ref="queryForm" :model="form" label-position="right">
          <el-row>
            <el-col :span="8">
              <el-form-item label="账号：" prop="customerAccount">
                <el-input v-model="form.customerAccount" clearable />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="性别：" prop="customerGender">
                <el-radio-group v-model="form.customerGender">
                  <el-radio label="男" />
                  <el-radio label="女" />
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态：" prop="isValid">
                <el-radio-group v-model="form.isValid">
                  <el-radio label="Y">已生效</el-radio>
                  <el-radio label="N">已失效</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row justify="end">
            <el-button type="primary" @click="clickQuery"> 查询 </el-button>
            <el-button @click="reset">重置</el-button>
          </el-row>
        </el-form>

        <h2>用户列表</h2>
        <el-row justify="end">
          <el-button type="primary" @click="add"> 新增 </el-button>
        </el-row>

        <el-table
          border
          style="width: 100%"
          size="small"
          ref="multipleTable"
          :data="data.list"
          tooltip-effect="dark"
          class="mt-15"
          height="500"
          v-loading="isLoading"
        >
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="50"
          ></el-table-column>

          <el-table-column
            sortable
            label="ID"
            prop="customerId"
            align="center"
            min-width="8%"
            showOverflowTooltip
          ></el-table-column>

          <el-table-column
            sortable
            label="账号"
            prop="customerAccount"
            align="center"
            min-width="8%"
            showOverflowTooltip
          ></el-table-column>

          <el-table-column
            sortable
            label="姓名"
            prop="customerName"
            align="center"
            min-width="8%"
            showOverflowTooltip
          ></el-table-column>

          <el-table-column
            sortable
            label="性别"
            prop="customerGender"
            align="center"
            min-width="8%"
            showOverflowTooltip
          ></el-table-column>

          <el-table-column
            sortable
            label="状态"
            prop="isValid"
            align="center"
            min-width="8%"
            showOverflowTooltip
          >
            <template v-slot="scope">
              <el-switch
                v-model="scope.row.isValid"
                size="large"
                inline-prompt
                style="
                  --el-switch-on-color: #13ce66;
                  --el-switch-off-color: #ff4949;
                "
                active-text="已生效"
                inactive-text="已失效"
                :beforeChange="() => beforeChange(scope.row)"
              />
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="150">
            <template v-slot="scope">
              <Edit
                style="width: 2em; height: 2em; color: #409eff"
                @click="edit(scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>

        <el-row justify="end" class="mt-15">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageParam.page + 1"
            :page-sizes="[10, 50, 100, 300]"
            :page-size="pageParam.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="data.totalCount"
            background
          ></el-pagination>
        </el-row>
      </el-col>
      <el-col :span="4">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { queryCustomer, validCustomer } from "@/api/customer";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "CustomerQuery",
  components: {},
  props: {},
  setup(props, context) {
    const queryForm = ref();
    const isLoading = ref(true);
    const form = ref({
      customerAccount: "",
      customerGender: "",
      isValid: "",
    });

    const pageParam = ref({
      page: 0,
      size: 10,
    });

    let data = ref({
      list: [],
      totalCount: 0,
    });

    const router = useRouter();

    const query = () => {
      isLoading.value = true;
      queryCustomer(Object.assign({}, form.value, pageParam.value)).then(
        (res) => {
          res.data.data.list.forEach((e: any) => {
            e["isValid"] = e["isValid"] == "Y";
          });
          console.log(data);
          data.value = res.data.data;

          nextTick(() => {
            isLoading.value = false;
          });
        }
      );
    };

    // 分页
    const handleSizeChange = (val: number) => {
      pageParam.value.size = val;
      pageParam.value.page = 0;
      query();
    };

    const handleCurrentChange = (val: number) => {
      pageParam.value.page = val - 1;
      query();
    };

    const clickQuery = () => {
      pageParam.value.page = 0;
      query();
    };

    const add = () => {
      // window.open("/#/customer/add");
      router.push("/customer/add");
    };

    const beforeChange = (row: any) => {
      if (row.customerId) {
        validCustomer({
          customerId: row.customerId,
          isValid: row.isValid ? "N" : "Y", // 取反
        }).then((res: any) => {
          if (res.data.statusCode === 0) {
            row.isValid = !row.isValid;
            ElMessage({
              showClose: true,
              message: res.data.message,
              type: "success",
            });
            return true;
          }
          return false;
        });
      }
      return false;
    };

    const edit = (info: any) => {
      // alert(JSON.stringify(info));
      router.push({
        path: "/customer/update",
        query: { customerId: info.customerId },
      });
    };

    const reset = () => {
      queryForm.value.resetFields();
    };

    onMounted(() => {
      // 初始化查询
      clickQuery();
    });

    return {
      queryForm,
      isLoading,
      form,
      pageParam,
      data,

      handleSizeChange,
      handleCurrentChange,
      clickQuery,
      add,
      beforeChange,
      edit,
      reset,
    };
  },
  data() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.mt-15 {
  margin-top: 15px;
}
</style>
