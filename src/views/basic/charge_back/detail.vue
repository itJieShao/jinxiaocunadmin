<template>
  <div class="app-container">
    <h2>退单详情</h2>
    <el-card shadow="always">
      <h4>审核进度</h4>
      <el-table :data="detail.audit_detail" stripe style="width: 100%">
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
                >同意退单</el-button
              >
              <el-button @click="examine_click(-1)" type="danger"
                >驳回退单</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row :gutter="12" style="margin-top: 20px">
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>退单ID</p>
              <p>{{ detail.id }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>关联采购计划ID</p>
              <p>{{ detail.procurement_plan_id }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>申请采购人员</p>
              <p>{{ detail.procurement_user_name }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>退单人员</p>
              <p>{{ detail.created_user_name }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>退单商品</p>
              <p>{{ detail.good_species }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>退单总数量</p>
              <p>{{ detail.good_num }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-divider />
      <el-table
        :data="detail.detail"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column width="100" align="center" label="商品编码">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column width="140" align="center" label="商品名称">
          <template slot-scope="scope">
            <span>{{ scope.row.good_name }}</span>
          </template>
        </el-table-column>
        <el-table-column width="140" align="center" label="采购途径">
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
        <el-table-column width="120" align="center" label="退回数量">
          <template slot-scope="scope">
            <span>{{ scope.row.refund_num }}</span>
          </template>
        </el-table-column>
        <el-table-column width="240" align="center" label="备注">
          <template slot-scope="scope">
            <span>{{ scope.row.refund_remark }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getDetail } from "@/api/basic/charge_back";
export default {
  data() {
    return {
      detail: {},
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      getDetail({
        refund_id: this.$route.query.id,
      }).then((res) => {
        this.detail = res;
      });
    },
  },
};
</script>