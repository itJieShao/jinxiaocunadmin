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
          >新增供应商</el-button
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
      <el-table-column width="100" align="center" label="供应商ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="供应商名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="公司地址">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column width="140" align="center" label="联系人">
        <template slot-scope="scope">
          <span>{{ scope.row.contacts }}</span>
        </template>
      </el-table-column>

      <el-table-column width="140" align="center" label="联系电话">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.contact_moblies" :key="index">
            {{ item }}
          </p>
        </template>
      </el-table-column>

      <el-table-column width="140" align="center" label="历史订单">
        <template slot-scope="scope">
          <span>{{ scope.row.procurement_plan_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="140" align="center" label="最近采购订单">
        <template slot-scope="scope">
          <span>{{ scope.row.last_procurement_plan_id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="交易总金额">
        <template slot-scope="scope">
          <span>{{ scope.row.trading_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="已结金额">
        <template slot-scope="scope">
          <span>{{ scope.row.settlement_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80" align="center" label="待结欠款">
        <template slot-scope="scope">
          <span>{{ scope.row.settlementing_price }}</span>
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
import { getList,updateStatus } from "@/api/basic/supplier";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      list: null,
      listData: {
        page: 1,
        page_size: 10,
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
    goAdd() {
      this.$router.push("/basic/supplier_add");
    },
    goEdit(id) {
      this.$router.push(`/basic/supplier_edit?id=${id}`);
    },
    goDetail(id) {
      this.$router.push(`/basic/supplier_detail?id=${id}`);
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
    updateStatus(supplier_id, status, index) {
      updateStatus({
        supplier_id,
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


