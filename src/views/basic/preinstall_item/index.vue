<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input
          v-model="listData.value"
          placeholder="请输入单品名称搜索"
        ></el-input>
      </el-col>
      <el-col :span="10">
        <el-button @click="searchBtn" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="4" style="display: flex; justify-content: flex-end">
        <el-button type="success" icon="el-icon-plus" @click="addMeal"
          >新增单品</el-button
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
      <el-table-column width="120" align="center" label="单品ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="单品图片">
        <template slot-scope="scope">
          <img
            style="width: 150px; height: 150px"
            :src="scope.row.image"
            alt=""
          />
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="单品名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="配方版本">
        <template slot-scope="scope">
          <span>{{ scope.row.formula_count }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="实验次数">
        <template slot-scope="scope">
          <span>{{ scope.row.test_count }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="最近一次实验版本">
        <template slot-scope="scope">
          <span>{{ scope.row.recently_formula }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="最近一次实验编号">
        <template slot-scope="scope">
          <span>{{ scope.row.recently_test }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="最近一次实验时间">
        <template slot-scope="scope">
          <span>{{ scope.row.recently_test_time }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="定版状态">
        <template slot-scope="scope">
          <span>{{ scope.row.version_name }}</span>
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
import { getList } from "@/api/basic/preinstall_item";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      list: [],
      listData: {
        page: 1,
        page_size: 10,
        value: "",
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
      this.$router.push("/basic/preinstall_item_add");
    },
    goDetail(id) {
      this.$router.push(`/basic/preinstall_item_detail?id=${id}`);
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


