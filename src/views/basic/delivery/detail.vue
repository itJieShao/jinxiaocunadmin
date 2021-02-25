<template>
  <div class="app-container">
    <h2>出库单详情</h2>
    <el-card shadow="always">
      <el-row :gutter="12">
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>出库单ID</p>
              <p>{{ detail.id }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>出库单类型</p>
              <p>{{ detail.type_name }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>取货部门</p>
              <p>{{ detail.name }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>仓管出单员</p>
              <p>{{ detail.condition_price }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>仓管配货员</p>
              <p>{{ detail.favourable_price }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>部门取货员</p>
              <p>{{ detail.discount }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px" :gutter="12">
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>出库商品</p>
              <p>{{ detail.valid_at }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>出库总数量</p>
              <p>{{ detail.created_at }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>实际出库总数量</p>
              <p>{{ detail.num }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>调整增加</p>
              <p>{{ detail.receive_num }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>调整减少</p>
              <p>{{ detail.created_user_name }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>差额</p>
              <p>{{ detail.created_user_name }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px" :gutter="12">
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>调整次数</p>
              <p>{{ detail.created_user_name }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>出库仓库</p>
              <p>{{ detail.created_user_name }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>申请时间</p>
              <p>{{ detail.created_user_name }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-divider />
      <h4>出库进度</h4>
      <el-table :data="detail.audit_process_detail" stripe style="width: 100%">
        <el-table-column
          align="center"
          prop="level"
          label="出库程序"
          width="180"
        >
        </el-table-column>
        <el-table-column align="center" prop="level" label="核对人" width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="level"
          label="核对时间"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="level"
          label="核对状态"
          width="180"
        >
        </el-table-column>
        <el-table-column align="center">
          <template
            slot-scope="scope"
            v-if="
              scope.row.audit_status == 0 &&
              scope.row.first_audit &&
              detail.can_audit == 1
            "
          >
            <div style="display: flex">
              <el-button @click="examine_click(1)" type="success"
                >同意进货</el-button
              >
              <el-button @click="examine_click(-1)" type="danger"
                >驳回进货</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-divider />
      <h4>出库信息</h4>
      <el-table
        v-loading="loading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column width="120" align="center" label="商品编码">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品名称">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="单位">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column width="200" align="center" label="出库仓库">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="出库数量">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
// import { couponDetail, disableCoupon } from "@/api/basic";
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
    copy() {},
    disable() {
      disableCoupon({ coupon_id: this.detail.id }).then((res) => {
        if (res) {
          this.detail.status = 0;
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
    getDetail() {
      couponDetail({
        coupon_id: this.$route.query.coupon_id,
      }).then((res) => {
        this.detail = res;
      });
    },
  },
};
</script>