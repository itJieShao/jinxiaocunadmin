<template>
  <div>
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="8">
        <el-input
          v-model="listData.value"
          :placeholder="`请输入${type_name}名称搜索`"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-button @click="searchBtn" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="12" style="display: flex; justify-content: flex-end">
        <el-button type="success" icon="el-icon-plus" @click="openDialog()"
          >新增{{ type_name }}</el-button
        >
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="list" border style="width: 100%">
      <el-table-column align="center" :label="`${type_name}ID`">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" :label="`${type_name}图片`">
        <template slot-scope="scope">
          <img
            style="width: 150px; height: 150px"
            :src="scope.row.image"
            alt=""
          />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="`${type_name}名称`">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="标签">
        <template slot-scope="scope">
          <span>{{ scope.row.label_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="单位">
        <template slot-scope="scope">
          <span>{{ scope.row.unit_name }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="type == 3" align="center" label="规格">
        <template slot-scope="scope">
          <span>{{ scope.row.specification }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="openDialog(scope.row.id)"
            >编辑</el-button
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

    <el-dialog
      @open="timer = new Date().getTime()"
      :title="dialogFormTitle"
      :visible.sync="dialogFormVisible"
    >
      <Edit
        :key="timer"
        :type="type"
        :type_name="type_name"
        :jumpId="jumpId"
        @closeDialog="closeDialog"
      />
    </el-dialog>
  </div>
</template>

<script>
import { getList, saveApi } from "@/api/basic/material_seasoning";
import Pagination from "@/components/Pagination";
import Edit from "@/views/basic/material_seasoning/edit";
export default {
  props: ["type"],
  components: { Pagination, Edit },
  data() {
    return {
      type_name: "",
      list: [],
      listData: {
        page: 1,
        page_size: 10,
        value: "",
        type: this.type,
      },
      loading: false,
      total: 0,
      dialogFormVisible: false,
      dialogFormTitle: "",
      jumpId: "",
      timer: "",
    };
  },
  created() {
    switch (this.type) {
      case "1":
        this.type_name = "材料";
        break;
      case "2":
        this.type_name = "调料";
        break;
      case "3":
        this.type_name = "包装";
        break;
    }
    this.getList();
  },
  methods: {
    //新增/编辑打开弹窗
    openDialog(id) {
      this.jumpId = id;
      this.dialogFormTitle = id
        ? `编辑${this.type_name}`
        : `新增${this.type_name}`;
      this.dialogFormVisible = true;
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
    closeDialog(refresh) {
      if (refresh) this.getList();
      this.dialogFormVisible = false;
    },
  },
};
</script>