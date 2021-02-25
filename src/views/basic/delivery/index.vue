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
        <el-button type="success" icon="el-icon-plus" @click="goAdd"
          >新增出库单</el-button
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
      <el-table-column width="120" align="center" label="出库单ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="出库单类型">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="取货部门/仓库">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="仓管出单员">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="仓库配货员">
        <template slot-scope="scope">
          <span>{{ scope.row.distribution_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="部门取货人">
        <template slot-scope="scope">
          <span>{{ scope.row.take_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="出库商品">
        <template slot-scope="scope">
          <span>{{ scope.row.good_species }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="出库总数量">
        <template slot-scope="scope">
          <span>{{ scope.row.good_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="实际出库数量">
        <template slot-scope="scope">
          <span>{{ scope.row.real_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="调整增加">
        <template slot-scope="scope">
          <span>{{ scope.row.add_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="调整减少">
        <template slot-scope="scope">
          <span>{{ scope.row.reduce_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="差额">
        <template slot-scope="scope">
          <span>{{ scope.row.diff_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="调整次数">
        <template slot-scope="scope">
          <span>{{ scope.row.set_count }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="出库仓库">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="申请时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="核对时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="核对状态">
        <template slot-scope="scope">
          <span>{{ scope.row.audit_at }}</span>
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
import { getList } from "@/api/basic/delivery";
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
    goAdd() {
      this.$router.push("/basic/delivery_add");
    },
    goDetail(id) {
      this.$router.push(`/basic/delivery_detail?id=${id}`);
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


