<template>
  <div>
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="8">
        <el-input
          v-model="listData.name"
          placeholder="请输入搜索内容"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-button @click="searchBtn" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="list" border style="width: 100%">
      <el-table-column width="120" align="center" label="设备">
        <template slot-scope="scope">
          <span>{{ scope.row.cell_no }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="单元格">
        <template slot-scope="scope">
          <span>{{ scope.row.cell_no }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="运行状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="实验单品">
        <template slot-scope="scope">
          <span>{{ scope.row.product_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="实时板温">
        <template slot-scope="scope">
          <span>{{ scope.row.plate_temperature }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="配方">
        <template slot-scope="scope">
          <span>{{ scope.row.formula_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="实验编号">
        <template slot-scope="scope">
          <span>{{ scope.row.test_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="240" align="center" label="试验目的">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="开始时间">
        <template slot-scope="scope">
          <span>{{ scope.row.start_time }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="结束时间">
        <template slot-scope="scope">
          <span>{{ scope.row.end_time }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="试验人评分">
        <template slot-scope="scope">
          <span>{{ scope.row.tester_score }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="外评人评分">
        <template slot-scope="scope">
          <span>{{ scope.row.critics_score }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="实验人">
        <template slot-scope="scope">
          <span>{{ scope.row.test_admin_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" fixed="right" align="center" label="实验结论">
        <template slot-scope="scope">
          <span>{{ scope.row.test_conclusion_name }}</span>
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
import { getList } from "@/api/basic/experiment";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  props:["type"],
  data() {
    return {
      list: [],
      listData: {
        type:this.type,
        page: 1,
        page_size: 10,
        value: "",
      },
      loading: false,
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
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

