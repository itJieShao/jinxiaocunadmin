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
          >新增商品</el-button
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
      <el-table-column width="100" align="center" label="商品ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="商品图片">
        <template slot-scope="scope">
          <img
            style="width: 100px; height: 100px"
            :src="scope.row.image"
            alt=""
          />
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="商品名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="总库存">
        <template slot-scope="scope">
          <span>{{ scope.row.qty }}</span>
        </template>
      </el-table-column>

      <el-table-column width="140" align="center" label="存储仓库">
        <template slot-scope="scope">
          <p v-for="(item,index) in scope.row.store_names" :key="index">{{ item }}</p>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="可用库存">
        <template slot-scope="scope">
          <p v-for="(item,index) in scope.row.store_qty" :key="index">{{ item }}</p>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="分类">
        <template slot-scope="scope">
          <span>{{ scope.row.category_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="单位">
        <template slot-scope="scope">
          <span>{{ scope.row.unit_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="规格">
        <template slot-scope="scope">
          <span>{{ scope.row.specification }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="成本预警价">
        <template slot-scope="scope">
          <span>{{ scope.row.warn_cost_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="供应商">
        <template slot-scope="scope">
          <p v-for="(item,index) in scope.row.supplier_data" :key="index">{{ item.name }}</p>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="最近一次采购">
        <template slot-scope="scope">
          <span>{{ scope.row.last_procurement_plan_id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="最近一次采购价">
        <template slot-scope="scope">
          <span>{{ scope.row.last_procurement_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="最近采购供应商">
        <template slot-scope="scope">
          <span>{{ scope.row.last_procurement_supplier_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
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
import { getGoodsList } from "@/api/basic/goods";
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
      this.$router.push("/basic/goods_add");
    },
    goEdit(id) {
      this.$router.push(`/basic/goods_edit?id=${id}`);
    },
    goDetail(id) {
      this.$router.push(`/basic/goods_detail?id=${id}`);
    },
    getList() {
      this.loading = true;
      getGoodsList(this.listData).then((res) => {
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