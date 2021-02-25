<template>
  <div class="app-container">
    <h2>采购计划详情</h2>
    <el-card shadow="always">
      <h4>审核进度</h4>
      <el-table :data="detail.audit_data" stripe style="width: 100%">
        <el-table-column
          align="center"
          prop="level"
          label="审核级别"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="audit_user_name"
          label="审核人"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="audit_at"
          label="审核时间"
          width="180"
        >
        </el-table-column>
        <el-table-column align="center" label="审核状态" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.audit_status == 1">审核通过</span>
            <span v-else-if="scope.row.audit_status == 0">等待审核</span>
            <span v-else>审核失败</span>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template
            slot-scope="scope"
            v-if="
              scope.row.audit_status == 0 &&
              scope.row.first_audit &&
              scope.row.can_audit == 1
            "
          >
            <div style="display: flex">
              <el-button @click="examine_click(1)" type="success"
                >同意采购</el-button
              >
              <el-button @click="examine_click(-1)" type="danger"
                >驳回采购</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-divider />
      <el-row :gutter="12">
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>采购计划ID</p>
              <p>{{ detail.id }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>申请人员</p>
              <p>{{ detail.created_user_name }}</p>
            </div>
          </el-card>
        </el-col>
        <!-- <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>申请部门</p>
            <p>{{ detail.name }}</p>
          </div>
        </el-card>
      </el-col> -->
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>采购商品</p>
              <p>{{ detail.good_species }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>总数量</p>
              <p>{{ detail.good_num }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>税前总额</p>
              <p>{{ detail.pre_tax_price }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>税后总额</p>
              <p>{{ detail.after_tax_price }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px" :gutter="12">
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>应付总额</p>
              <p>{{ detail.pay_price }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>入库状态</p>
              <p>{{ detail.in_stock_status_name }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>关联退单ID</p>
              <p>{{ detail.valid_at }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px" :gutter="12">
        <el-col :span="12">
          <el-card shadow="always">
            <div class="item_flex">
              <p>指定采购人员</p>
              <p>
                <el-select
                  v-model="procurementer"
                  clearable
                  filterable
                  placeholder="请选择采购人员"
                >
                  <el-option
                    v-for="item in userData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <el-button
                  style="margin-left: 15px"
                  type="primary"
                  @click="setProcurementer"
                  >提交</el-button
                >
                <span style="display: block; margin-top: 2px; font-size: 12px"
                  >tip:（指定之后不可修改）</span
                >
              </p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="always">
            <div class="item_flex">
              <p>采购状态</p>
              <p>
                <el-select
                  v-model="procurement_status"
                  clearable
                  filterable
                  placeholder="请选择采购状态"
                >
                  <el-option label="已采购" value="1"> </el-option>
                  <el-option label="取消采购" value="-1"> </el-option>
                </el-select>
                <el-button
                  style="margin-left: 15px"
                  type="primary"
                  @click="setStatus"
                  >提交</el-button
                >
                <span style="display: block; margin-top: 2px; font-size: 12px"
                  >tip:（采购状态提交之后，整个表格无法修改）</span
                >
              </p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-divider />
      <div style="margin-bottom: 20px">
        <div v-if="btnFlag" style="display: flex; justify-content: flex-end">
          <el-button type="warning" @click="tbtnClick(1)">采购调整</el-button>
          <el-button type="danger" @click="tbtnClick(2)">退回采购</el-button>
          <el-button type="success" @click="tbtnClick(3)">采购入库</el-button>
        </div>
        <div v-else style="display: flex; justify-content: flex-end">
          <el-button v-if="btnType == 1" type="primary" @click="optBtn(1)"
            >保存调整</el-button
          >
          <div class="btn_box" v-else-if="btnType == 2">
            <el-button type="danger" @click="optBtn(2)">去退回</el-button>
            <span class="count_tip">21</span>
          </div>
          <div class="btn_box" v-else>
            <el-button type="success" @click="optBtn(3)">去入库</el-button>
            <span class="count_tip">12</span>
          </div>
          <el-button v-if="btnType != 1" @click="cancelBtn">取消</el-button>
        </div>
      </div>
      <el-table
        :data="detail.detail"
        border
        fit
        highlight-current-row
        show-summary
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
        <el-table-column width="120" align="center" label="计划采购数量">
          <template slot-scope="scope">
            <span>{{ scope.row.num }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="调整增加数量">
          <template slot-scope="scope">
            <span>{{ scope.row.add_num }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="调整减少数量">
          <template slot-scope="scope">
            <span>{{ scope.row.reduce_num }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="实际采购数量">
          <template slot-scope="scope">
            <span>{{ scope.row.real_num }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="单价">
          <template slot-scope="scope">
            <span>{{ scope.row.unit_price }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="运费">
          <template slot-scope="scope">
            <span>{{ scope.row.freight }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="税前总额">
          <template slot-scope="scope">
            <span>{{ scope.row.pre_tax_price }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="税率">
          <template slot-scope="scope">
            <span>{{ scope.row.tax_rate }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="税额">
          <template slot-scope="scope">
            <span>{{ scope.row.tax_price }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="税后总额">
          <template slot-scope="scope">
            <span>{{ scope.row.after_tax_price }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="应付总额">
          <template slot-scope="scope">
            <span>{{ scope.row.pay_price }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="入库状态">
          <template slot-scope="scope">
            <span>{{ scope.row.in_stock_status_name }}</span>
          </template>
        </el-table-column>
        <el-table-column width="200" fixed="right" align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="goDetail(scope.row.id)"
              >退回</el-button
            >
            <el-button size="mini" @click="goDetail(scope.row.id)"
              >入库</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {
  getDetail,
  setProcurementer,
  setStatus,
} from "@/api/basic/procurement_plan";
import { userData } from "@/api/main";
export default {
  data() {
    return {
      detail: {},
      btnFlag: true,
      btnType: "",
      procurementer: "", //采购人员ID
      procurement_status: "", //采购状态ID
      userData: [], //采购人员列表
    };
  },
  created() {
    this.getDetail();
    this.getLabelList();
  },
  methods: {
    //提交采购人员
    setProcurementer() {
      setProcurementer({
        procurement_plan_id: this.detail.id,
        procurementer: this.procurementer,
      }).then((res) => {});
    },
    //提交采购状态
    setStatus() {
      setStatus({
        procurement_plan_id: this.detail.id,
        procurement_status: this.procurement_status,
      }).then((res) => {});
    },
    //采购人员下拉框列表
    getLabelList() {
      userData().then((res) => {
        this.userData = res;
      });
    },
    tbtnClick(type) {
      this.btnFlag = false;
      this.btnType = type;
    },
    optBtn(type) {
      switch (type) {
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
      }
    },
    cancelBtn() {
      this.btnFlag = true;
      this.btnType = "";
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 元";
        } else {
          sums[index] = "N/A";
        }
      });
      return sums;
    },
    examine_click(status) {
      audit({ audit_process_id: this.detail.audit_process_id, status }).then(
        (res) => {
          if (res) {
            this.getDetail();
            this.$notify({
              title: "成功",
              message: "操作成功",
              type: "success",
              duration: 1000,
            });
          }
        }
      );
    },
    getDetail() {
      getDetail({
        procurement_plan_id: this.$route.query.id,
      }).then((res) => {
        let index = res.audit_data.findIndex((item) => item.audit_status == 0);
        if (index != -1) {
          res.audit_data[index].first_audit = true;
        }
        this.detail = res;
      });
    },
  },
};
</script>
<style scoped>
.btn_box {
  position: relative;
  margin-right: 15px;
}
.count_tip {
  display: block;
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: #fff;
  padding: 5px;
  border-radius: 50%;
  font-size: 12px;
}
</style>