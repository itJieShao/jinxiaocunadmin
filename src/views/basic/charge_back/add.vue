<template>
  <div class="app-container">
    <h2>新增退单</h2>
    <el-card shadow="always">
      <el-table
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column width="120" align="center" label="商品编码">
          <template slot-scope="scope">
            <span>{{ scope.row.procurement_plan_detail_id }}</span>
          </template>
        </el-table-column>
        <el-table-column width="200" align="center" label="商品名称">
          <template slot-scope="scope">
            <span>{{ scope.row.good_name }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="采购途径">
          <template slot-scope="scope">
            <span>{{ scope.row.way }}</span>
          </template>
        </el-table-column>
        <el-table-column width="200" align="center" label="供应商">
          <template slot-scope="scope">
            <span>{{ scope.row.supplier_name }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="单位">
          <template slot-scope="scope">
            <span>{{ scope.row.unit_name }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="单价">
          <template slot-scope="scope">
            <span>{{ scope.row.unit_price }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="计划采购数量">
          <template slot-scope="scope">
            <span>{{ scope.row.num }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="实际采购数量">
          <template slot-scope="scope">
            <span>{{ scope.row.real_num }}</span>
          </template>
        </el-table-column>
        <el-table-column width="160" align="center" label="退回数量">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.refund_num"
              placeholder="请输入退回数量"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column width="300" align="center" label="备注">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.remark"
              type="textarea"
              placeholder="请输入备注"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column width="160" fixed="right" align="center" label="操作">
          <template slot-scope="scope">
            <i
              @click="delItem(scope.row.$index)"
              style="color: red; cursor: pointer"
              class="el-icon-delete"
            ></i>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" class="row-bg" justify="end" style="margin-top: 15px">
        <el-button type="primary" @click="onSubmit">确认退单</el-button>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { refundApi } from "@/api/basic/charge_back";
export default {
  data() {
    return {
      procurement_plan_id: "",
      list: [],
    };
  },
  created() {
    if (localStorage.getItem("chargeBackData")) {
      let chargeBackData = JSON.parse(localStorage.getItem("chargeBackData"));
      this.procurement_plan_id = chargeBackData.procurement_plan_id;
      chargeBackData.checkedList.forEach(item => {
        item.remark = "";
      })
      this.list = chargeBackData.checkedList;
      console.log(this.list);
    }
  },
  destroy() {
    localStorage.removeItem("chargeBackData");
  },
  methods: {
    delItem(index) {
      this.list.splice(index, 1);
    },
    //提交
    onSubmit() {
      let list = this.list;
      if (!list.length) {
        return this.$message({
          message: "没有可退单的商品",
          type: "error",
          duration: 1000,
          onClose: () => {
            this.$router.go(-1);
          },
        });
      }
      let aData = [];
      list.forEach((item) => {
        aData.push({
          procurement_plan_detail_id: item.procurement_plan_detail_id,
          refund_num: item.refund_num,
          remark: item.remark,
        });
      });
      console.log(aData)
      refundApi({
        procurement_plan_id: this.procurement_plan_id,
        refund_data: JSON.stringify(aData),
      }).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "退单成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.$router.go(-1);
            },
          });
        }
      });
    },
  },
};
</script>
<style lang="scss">
p {
  margin: 0;
}
.item_title,
.item_content {
  width: 100%;
  display: flex;
  p {
    display: flex;
    justify-content: center;
    flex: 1;
  }
}
.item_content {
  margin-bottom: 20px;
  align-items: center;
  div {
    flex: 1;
  }
}
.el-input-number {
  flex: 1;
}
.del_btn {
  margin-left: 20px;
  cursor: pointer;
}
.i_position {
  position: absolute;
  left: 0;
}
.i_right {
  position: relative;
  display: flex;
  align-items: center;
}
.main_img_hide .el-upload--picture-card {
  display: none;
}
</style>