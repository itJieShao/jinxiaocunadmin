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
          >新增仓库</el-button
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
      <el-table-column width="100" align="center" label="仓库ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="仓库名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="140" align="center" label="仓库类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="仓库主管">
        <template slot-scope="scope">
          <span>{{ scope.row.manage_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="仓库入库员">
        <template slot-scope="scope">
          <span>{{ scope.row.in_store_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="仓库出库员">
        <template slot-scope="scope">
          <span>{{ scope.row.out_store_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="商品款数">
        <template slot-scope="scope">
          <span>{{ scope.row.good_species }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="总可用库存">
        <template slot-scope="scope">
          <span>{{ scope.row.good_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="出库中数量">
        <template slot-scope="scope">
          <span>{{ scope.row.in_store_good_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="仓库面积">
        <template slot-scope="scope">
          <span>{{ scope.row.area }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="租金">
        <template slot-scope="scope">
          <span>{{ scope.row.rent }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="联系电话">
        <template slot-scope="scope">
          <p v-for="(item,index) in scope.row.mobile" :key="index">{{ item }}</p>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="仓库地址">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="120"
        class-name="status-col"
        align="center"
        label="启用状态"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="240" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.status ? 'danger' : 'success'"
            size="mini"
            @click="updateStatus(scope.row.id, scope.row.status, scope.$index)"
            >{{ scope.row.status ? "禁用" : "启用" }}</el-button
          >
          <el-button size="mini" @click="goEdit(scope.row.id)">编辑</el-button>
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
import { getList,updateStatus } from "@/api/basic/warehouse";
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
      this.$router.push("/basic/warehouse_add");
    },
    goEdit(id) {
      this.$router.push(`/basic/warehouse_edit?id=${id}`);
    },
    goDetail(id) {
      this.$router.push(`/basic/warehouse_detail?id=${id}`);
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
    updateStatus(store_id, status, index) {
      updateStatus({
        store_id,
        status: status ? 0 : 1,
      }).then((res) => {
        if (res) {
          this.list[index].status = status ? 0 : 1;
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
  },
};
</script>


