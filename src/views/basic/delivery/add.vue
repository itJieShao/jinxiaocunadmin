<template>
  <div class="app-container">
    <h2>新增出库单</h2>
    <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="8" class="top_flex">
          <h5>出库单类型：</h5>
          <el-select v-model="formData.type_id" placeholder="请选择出库单类型">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8" class="top_flex" v-if="formData.type_id == 1">
          <h5>取货人：</h5>
          <el-select v-model="formData.take_user_id" clearable placeholder="请选择取货人">
            <el-option
              v-for="item in userData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8" class="top_flex" v-else>
          <h5>仓库：</h5>
          <el-select v-model="formData.in_store_id" clearable placeholder="请选择仓库">
            <el-option
              v-for="item in storeData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8" class="top_flex">
          <h5>仓库配货员：</h5>
          <el-select v-model="formData.distribution_user_id" clearable placeholder="请选择仓库配货员">
            <el-option
              v-for="item in userData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    <el-card shadow="always">
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="12" style="display: flex">
          <el-select style="width:100%;" v-model="listData.store_ids" multiple placeholder="请选择仓库">
            <el-option
              v-for="item in storeData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-input
            v-model="listData.name"
            placeholder="请输入搜索内容"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-button @click="getCanOutStoreList" type="primary" icon="el-icon-search"
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          fixed="left"
          align="center"
          width="55"
        >
        </el-table-column>
        <el-table-column align="center" label="商品ID">
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

        <el-table-column align="center" label="实时总库存数量">
          <template slot-scope="scope">
            <span>{{ scope.row.store_num }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="存放仓库">
          <template slot-scope="scope">
            <el-checkbox v-for="(item,index) in scope.row.store_good_data" :key="index" v-model="item.checked">{{item.store_name}}</el-checkbox>
          </template>
        </el-table-column>

        <el-table-column align="center" label="仓库库存数量">
          <template slot-scope="scope">
            <p v-for="item in scope.row.store_good_data" :key="item.store_good_id">{{item.num}}</p>
          </template>
        </el-table-column>

      </el-table>
      <el-row type="flex" class="row-bg" justify="end" style="margin:20px 0;">
        <el-button type="success" @click="addBtn">添加到出库单</el-button>
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

        <el-table-column align="center" label="出库仓库">
          <template slot-scope="scope">
            <p v-for="(item,index) in scope.row.store_good_data" :key="index">{{item.store_name}}</p>
          </template>
        </el-table-column>

        <el-table-column align="center" label="出库数量">
          <template slot-scope="scope">
            <el-input v-for="(item,index) in scope.row.store_good_data" :key="index" v-model="item.num" placeholder="请输入数量"></el-input>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
             <i v-for="(item,index) in scope.row.store_good_data" :key="index" @click="delItem(scope.row.$index,index)" class="el-icon-delete"></i>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" class="row-bg" justify="end" style="margin-top:20px;">
        <el-button type="primary" @click="onSubmit">提交出库单</el-button>
      </el-row>
      </el-card>
    </el-card>
  </div>
</template>
<script>
import { canOutStoreList, addApi } from "@/api/basic/delivery";
import { getStoreData, userData } from "@/api/main";
export default {
  data() {
    return {
      typeList: [
        { name: "普通出库单", id: 1 },
        { name: "仓库调配单", id: 2 },
      ],
      listData: {
        store_ids: [],
        name: "",
      },
      formData: {
        type_id: 1,
        take_user_id: "",
        distribution_user_id: "",
        in_store_id: "",
      },
      list: [],
      checkedList: [],
      submitList: [],
      loading: false,
      storeData: [],
      userData: [],
    };
  },
  created() {
    this.getCanOutStoreList();
    this.getStoreData();
    this.getUserData();
  },
  methods: {
    getUserData() {
      userData().then((res) => {
        this.userData = res;
      });
    },
    //添加到出库单
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
    handleSelectionChange(val) {
      this.checkedList = val;
    },
    getStoreData() {
      getStoreData().then((res) => {
        this.storeData = res;
      });
    },
    getCanOutStoreList() {
      let listData = this.listData;
      this.loading = true;
      canOutStoreList({
        store_ids: JSON.stringify(listData.store_ids),
        name: listData.name,
      }).then((res) => {
        res.forEach((item) => {
          item.store_good_data.forEach((it) => {
            it.checked = true;
          });
        });
        this.list = res;
        this.loading = false;
      });
    },
    //提交
    onSubmit() {
      let submitList = JSON.parse(JSON.stringify(this.submitList)),
        aData = JSON.parse(JSON.stringify(this.formData)),
        out_store_data = [];
      submitList.forEach((item) => {
        item.store_good_data.forEach((it) => {
          out_store_data.push({
            store_good_id: it.store_good_id,
            num: it.num,
          });
        });
      });
      aData.out_store_data = JSON.stringify(out_store_data);
      addApi(aData).then((res) => {
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
<style lang="scss" scoped>
.el-icon-delete {
  display: block;
  color: red;
  cursor: pointer;
  margin-bottom: 10px;
}
.top_flex {
  display: flex;
  align-items: center;
  justify-content: center;
  h5 {
    color: #666;
  }
}
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