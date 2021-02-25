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
    </el-row>
    <el-table
      v-loading="loading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column width="100" align="center" label="退单ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="140" align="center" label="关联采购计划ID">
        <template slot-scope="scope">
          <span>{{ scope.row.procurement_plan_id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="申请采购人员">
        <template slot-scope="scope">
          <span>{{ scope.row.procurement_user_name }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="160" align="center" label="申请采购部门">
        <template slot-scope="scope">
          <span>{{ scope.row.package_box_name }}</span>
        </template>
      </el-table-column> -->

      <el-table-column width="140" align="center" label="退单商品">
        <template slot-scope="scope">
          <span>{{ scope.row.good_species }}</span>
        </template>
      </el-table-column>

      <el-table-column width="140" align="center" label="退单总数量">
        <template slot-scope="scope">
          <span>{{ scope.row.good_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="退单人员">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="申请退单时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="审核时间">
        <template slot-scope="scope">
          <span>{{ scope.row.audit_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="140" align="center" label="审核状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status_name }}</span>
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
import { getList } from "@/api/basic/charge_back";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      list: null,
      listData: {
        page: 1,
        page_size: 10,
        vendor_id: "",
        export: "",
        name: "",
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
    goDetail(id) {
      this.$router.push(`/basic/charge_back_detail?id=${id}`);
    },
    getList() {
      this.loading = true;
      getList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
    searchBtn(){
      this.listData.page = 1;
      this.getList();
    },
  },
};
</script>