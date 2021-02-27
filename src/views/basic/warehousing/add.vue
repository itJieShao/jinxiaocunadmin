<template>
  <div class="app-container">
    <h2>新增入库单</h2>
    <el-card shadow="always">
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="12" style="display: flex">
          <el-select v-model="listData.mode" clearable placeholder="请选择条件">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-input
            v-model="listData.search"
            placeholder="请输入搜索内容"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-button @click="searchBtn" type="primary" icon="el-icon-search"
            >搜索</el-button
          >
        </el-col>
        <el-col :span="8" style="display: flex; justify-content: flex-end">
          <el-date-picker
            v-model="dateVal"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-col>
      </el-row>
      <el-table
        v-loading="loading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          fixed="left"
          align="center"
          width="55"
        >
        </el-table-column>
        <el-table-column align="center" label="采购计划ID">
          <template slot-scope="scope">
            <span>{{ scope.row.procurement_plan_id }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column align="center" label="申请部门">
          <template slot-scope="scope">
            <span>{{ scope.row.created_user_name }}</span>
          </template>
        </el-table-column> -->

        <el-table-column align="center" label="申请人员">
          <template slot-scope="scope">
            <span>{{ scope.row.created_user_name }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="采购商品">
          <template slot-scope="scope">
            <span>{{ scope.row.good_name }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="总数量">
          <template slot-scope="scope">
            <span>{{ scope.row.real_num }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="采购人员">
          <template slot-scope="scope">
            <span>{{ scope.row.procurementer }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="申请时间">
          <template slot-scope="scope">
            <span>{{ scope.row.created_at }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="审核时间">
          <template slot-scope="scope">
            <span>{{ scope.row.audit_at }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listData.page"
        :limit.sync="listData.page_size"
        @pagination="getCanInStoreList"
      />
      <el-row type="flex" class="row-bg" justify="end" style="margin:20px 0;">
        <el-button type="success" @click="addBtn">添加到入库单</el-button>
      </el-row>
      <el-card shadow="always" v-show="submitList.length">
      <el-table
        :data="submitList"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        </el-table-column>
        <el-table-column align="center" label="商品编码">
          <template slot-scope="scope">
            <span>{{ scope.row.good_id }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="商品名称">
          <template slot-scope="scope">
            <span>{{ scope.row.good_name }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="单位">
          <template slot-scope="scope">
            <span>{{ scope.row.unit_name }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="实际采购数量">
          <template slot-scope="scope">
            <span>{{ scope.row.real_num }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="入库点货数量">
          <template slot-scope="scope">
            <el-input v-model="scope.row.in_store_num" placeholder="请输入数量"></el-input>
          </template>
        </el-table-column>

        <el-table-column align="center" label="入库仓库">
          <template slot-scope="scope">
            <el-select v-model="scope.row.store_id" filterable clearable placeholder="请选择仓库">
            <el-option
              v-for="item in storeData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" label="操作">
          <template slot-scope="scope">
            <i @click="delItem(scope.row.$index)" style="color: red; cursor: pointer" class="el-icon-delete"></i>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" class="row-bg" justify="end" style="margin-top:20px;">
        <el-button type="primary" @click="onSubmit">提交入库单</el-button>
      </el-row>
      </el-card>
    </el-card>
  </div>
</template>
<script>
import { canInStoreList, addApi } from "@/api/basic/warehousing";
import { getStoreData } from "@/api/main";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      typeList: [
        { name: "商品", id: 1 },
        { name: "人员", id: 2 },
        { name: "申请部门", id: 3 },
      ],
      listData: {
        mode: "",
        search: "",
        created_at_start: "",
        created_at_end: "",
        page: 1,
        page_size: 10,
      },
      total:0,
      dateVal: "",
      list: [],
      checkedList: [],
      submitList: [],
      loading: false,
      storeData: [],
    };
  },
  components: { Pagination },
  created() {
    if (localStorage.getItem("warehousingData")) {
      let warehousingData = JSON.parse(localStorage.getItem("warehousingData"));
      //this.procurement_plan_id = warehousingData.procurement_plan_id;
      // warehousingData.checkedList.forEach(item => {
      //   item.in_store_num = "";
      //   item.store_id = "";
      // })
      this.list = warehousingData.checkedList;
      console.log(this.list);
    } else {
      this.getCanInStoreList();
    }
    this.getStoreData();
  },
  destroy() {
    localStorage.removeItem("chargeBackData");
  },
  methods: {
    //添加到入库单
    addBtn() {
      if (!this.checkedList.length) {
        return this.$message({
          message: "请先勾选要添加的入库单",
          type: "error",
          duration: 1000,
        });
      }
      this.submitList = this.submitList.concat(this.checkedList);
    },
    //删除入库单
    delItem(index) {
      this.submitList.splice(index, 1);
    },
    searchBtn() {
      this.listData.page = 1;
      this.getCanInStoreList();
    },
    handleSelectionChange(val) {
      this.checkedList = val;
    },
    getStoreData() {
      getStoreData().then((res) => {
        this.storeData = res;
      });
    },
    getCanInStoreList() {
      this.loading = true;
      canInStoreList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
    //提交
    onSubmit() {
      let submitList = JSON.parse(JSON.stringify(this.submitList)),
        in_store_data = [];
      submitList.forEach((item) => {
        in_store_data.push({
          procurement_plan_detail_id: item.procurement_plan_detail_id,
          store_id: item.store_id,
          good_real_num: item.good_real_num,
          in_store_num: item.in_store_num,
        });
      });
      addApi({ in_store_data: JSON.stringify(in_store_data) }).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "提交成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.$router.go(-1);
            },
          });
        }
      });
    },
    //删除主图
    handleMainImgRemove(file, fileList) {
      this.formData.image = "";
    },
    //查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传商品图
    upLoadImg(res, file, fileList) {
      if (res.status) {
        this.formData.images.push(res.data.image_url);
      }
    },
    //删除商品图
    handleRemove(file, fileList) {
      const index = this.formData.images.findIndex((item) => item == file.url);
      this.formData.images.splice(index, 1);
    },
  },
};
</script>
<style lang="scss">
.phone_item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  .phone_item_icon {
    width: 80px;
    display: flex;
    font-size: 26px;
    margin-left: 10px;
    .el-icon-remove-outline {
      cursor: pointer;
      color: red;
    }
    .el-icon-circle-plus-outline {
      cursor: pointer;
      color: blue;
      margin-left: 10px;
    }
  }
}
p {
  margin: 0;
}
.item_title,
.item_content {
  width: 100%;
  display: flex;
  p {
    display: flex;
    justify-content: center;
    flex: 1;
  }
}
.item_content {
  margin-bottom: 20px;
  align-items: center;
  div {
    flex: 1;
  }
}
.el-input-number {
  flex: 1;
}
.del_btn {
  margin-left: 20px;
  cursor: pointer;
}
.i_position {
  position: absolute;
  left: 0;
}
.i_right {
  position: relative;
  display: flex;
  align-items: center;
}
.main_img_hide .el-upload--picture-card {
  display: none;
}
</style>