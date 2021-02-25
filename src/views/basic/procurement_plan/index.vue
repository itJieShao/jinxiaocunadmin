<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input
          v-model="listData.name"
          placeholder="请输入搜索内容"
        ></el-input>
      </el-col>
      <el-col :span="10">
        <el-button @click="searchBtn" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="4" style="display: flex; justify-content: flex-end">
        <el-button type="success" icon="el-icon-plus" @click="addMeal"
          >新增采购计划</el-button
        >
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column width="140" align="center" label="采购计划ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="采购状态">
        <template slot-scope="scope">
          <span>{{ scope.row.procurement_status_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="采购商品">
        <template slot-scope="scope">
          <span>{{ scope.row.good_species }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="总数量">
        <template slot-scope="scope">
          <span>{{ scope.row.good_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="税前总额">
        <template slot-scope="scope">
          <span>{{ scope.row.pre_taxt_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="税后总额">
        <template slot-scope="scope">
          <span>{{ scope.row.after_taxt_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="应付总额">
        <template slot-scope="scope">
          <span>{{ scope.row.pay_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="采购人员">
        <template slot-scope="scope">
          <span>{{ scope.row.procurement_user_name }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="120" align="center" label="申请部门">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column> -->

      <el-table-column width="200" align="center" label="申请人员">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="申请时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="审核时间">
        <template slot-scope="scope">
          <span>{{ scope.row.audit_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="140" align="center" label="入库状态">
        <template slot-scope="scope">
          <span>{{ scope.row.in_stock_status_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="140" align="center" label="审核状态">
        <template slot-scope="scope">
          <span>{{ scope.row.audit_status_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="goDetail(scope.row.id)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listData.page"
      :limit.sync="listData.page_size"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { getList } from "@/api/basic/procurement_plan";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      list: null,
      listData: {
        page: 1,
        page_size: 10,
      },
      loading: false,
      total: 0,
    };
  },
  components: { Pagination },
  created() {
    this.getList();
  },
  methods: {
    addMeal() {
      this.$router.push("/basic/procurement_plan_add");
    },
    goDetail(id) {
      this.$router.push(`/basic/procurement_plan_detail?id=${id}`);
    },
    getList() {
      this.loading = true;
      getList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
    searchBtn() {
      this.listData.page = 1;
      this.getList();
    },
  },
};
</script>


