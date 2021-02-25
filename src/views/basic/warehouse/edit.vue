<template>
  <div class="app-container">
    <h2>{{ $route.query.id ? "编辑仓库" : "新增仓库" }}</h2>
    <el-card shadow="always">
      <el-form label-width="100px">
        <el-form-item label="照片">
          <el-upload
            :file-list="detailImagesFile"
            multiple
            :action="$upLoadImgApi"
            list-type="picture-card"
            :on-success="upLoadImg"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="仓库名称">
          <el-input
            placeholder="请输入仓库名称"
            v-model="formData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="仓库类型">
          <el-select
            style="width: 100%"
            v-model="formData.type_id"
            filterable
            clearable
            placeholder="请选择仓库类型"
          >
            <el-option
              v-for="item in typeData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库主管">
          <el-select
            style="width: 100%"
            v-model="formData.manage_user_id"
            filterable
            clearable
            placeholder="请选择仓库主管"
          >
            <el-option
              v-for="item in userData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库入库员">
          <el-select
            style="width: 100%"
            v-model="formData.in_store_user_id"
            filterable
            clearable
            placeholder="请选择仓库入库员"
          >
            <el-option
              v-for="item in userData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库出库员">
          <el-select
            style="width: 100%"
            v-model="formData.out_store_user_id"
            filterable
            clearable
            placeholder="请选择仓库出库员"
          >
            <el-option
              v-for="item in userData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库面积">
          <el-input placeholder="请输入仓库面积" v-model="formData.area">
            <template slot="append">平方</template>
          </el-input>
        </el-form-item>
        <el-form-item label="租金">
          <el-input placeholder="请输入租金" v-model="formData.rent">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <div
            class="phone_item"
            v-for="(item, index) in formData.mobiles"
            :key="index"
          >
            <el-input
              placeholder="请输入联系电话"
              v-model="item.phone"
            ></el-input>
            <div class="phone_item_icon">
              <i
                class="el-icon-remove-outline"
                v-if="formData.mobiles.length > 1"
                @click="reducePhone(index)"
              ></i>
              <i
                class="el-icon-circle-plus-outline"
                v-if="formData.mobiles.length - 1 == index"
                @click="addPhone"
              ></i>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="仓库地址">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入仓库地址"
            v-model="formData.address"
          >
          </el-input>
        </el-form-item>
        <el-row type="flex" class="row-bg" justify="end">
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-row>
      </el-form>
    </el-card>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import { getDetail, saveApi } from "@/api/basic/warehouse";
import { labelList, userData } from "@/api/main";
export default {
  data() {
    return {
      formData: {
        store_id: "",
        name: "",
        images: [],
        type_id: "",
        manage_user_id: "",
        in_store_user_id: "",
        out_store_user_id: "",
        area: "",
        rent: "",
        mobiles: [{ phone: "" }],
        address: "",
      }, //表单提交数据
      detailImagesFile: [],
      dialogImageUrl: "",
      dialogVisible: false,
      userData: [],
      typeData: [],
    };
  },
  created() {
    if (this.$route.query.id) {
      this.formData.store_id = this.$route.query.id;
      this.getDetail();
    }
    this.getLabelList();
  },
  methods: {
    //详情
    getDetail() {
      getDetail({ store_id: this.formData.store_id }).then((res) => {
        let mobiles = [];
        res.mobiles.forEach((item) => {
          mobiles.push({ phone: item });
        });
        res.mobiles = mobiles;
        for (let key in this.formData) {
          this.formData[key] = res[key];
        }
        this.formData.store_id = res.id;
        if (res.images.length > 0) {
          let imgsArr = [];
          res.images.forEach((item, index) => {
            imgsArr.push({ name: `detailImagesFile${index}`, url: item });
          });
          this.detailImagesFile = imgsArr;
        }
      });
    },
    //下拉框列表
    getLabelList() {
      userData().then((res) => {
        this.userData = res;
      });
      labelList({ type_id: 4 }).then((res) => {
        this.typeData = res;
      });
    },
    reducePhone(index) {
      if (this.formData.mobiles.length === 1) {
        return;
      }
      this.formData.mobiles.splice(index, 1);
    },
    addPhone() {
      this.formData.mobiles.unshift({ phone: "" });
    },
    //提交
    onSubmit() {
      let aData = JSON.parse(JSON.stringify(this.formData)),
        phoneArr = [];
      aData.mobiles.forEach((item) => phoneArr.push(item.phone));
      aData.mobiles = JSON.stringify(phoneArr);
      aData.images = JSON.stringify(aData.images);
      saveApi(aData).then((res) => {
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