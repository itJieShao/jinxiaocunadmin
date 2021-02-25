<template>
  <div class="app-container">
    <h2>{{ $route.query.id ? "编辑供应商" : "新增供应商" }}</h2>
    <el-card shadow="always">
      <el-form label-width="130px">
        <el-form-item label="照片">
          <el-upload
            :file-list="detailImagesFile"
            multiple
            :action="$upLoadImgApi"
            list-type="picture-card"
            :on-success="
              (res) => {
                upLoadImg(res, 1);
              }
            "
            :on-preview="handlePictureCardPreview"
            :on-remove="
              (file) => {
                handleRemove(file, 1);
              }
            "
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="供应商名称">
          <el-input
            placeholder="请输入供应商名称"
            v-model="formData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            style="width: 100%"
            v-model="formData.type"
            filterable
            placeholder="请选择供应商类型"
          >
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="统一社会信用代码">
          <el-input
            placeholder="请输入统一社会信用代码"
            v-model="formData.code"
          ></el-input>
        </el-form-item>
        <el-form-item label="食品许可证">
          <el-input
            placeholder="请输入食品许可证"
            v-model="formData.food_permit"
          ></el-input>
          <el-upload
            style="margin-top: 10px"
            :file-list="foodPermitImages"
            multiple
            :action="$upLoadImgApi"
            list-type="picture-card"
            :on-success="
              (res) => {
                upLoadImg(res, 2);
              }
            "
            :on-preview="handlePictureCardPreview"
            :on-remove="
              (file) => {
                handleRemove(file, 2);
              }
            "
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="其他证件">
          <el-input
            placeholder="请输入其他证件"
            v-model="formData.other_permit"
          ></el-input>
          <el-upload
            style="margin-top: 10px"
            :file-list="otherPermitImages"
            multiple
            :action="$upLoadImgApi"
            list-type="picture-card"
            :on-success="
              (res) => {
                upLoadImg(res, 3);
              }
            "
            :on-preview="handlePictureCardPreview"
            :on-remove="
              (file) => {
                handleRemove(file, 3);
              }
            "
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input
            placeholder="请输入联系人"
            v-model="formData.contacts"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <div
            class="phone_item"
            v-for="(item, index) in formData.contact_moblies"
            :key="index"
          >
            <el-input
              placeholder="请输入联系电话"
              v-model="item.phone"
            ></el-input>
            <div class="phone_item_icon">
              <i
                class="el-icon-remove-outline"
                v-if="formData.contact_moblies.length > 1"
                @click="reducePhone(index)"
              ></i>
              <i
                class="el-icon-circle-plus-outline"
                v-if="formData.contact_moblies.length - 1 == index"
                @click="addPhone"
              ></i>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="公司地址">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入公司地址"
            v-model="formData.address"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="仓库地址">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入仓库地址"
            v-model="formData.warehouse_address"
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
import { getDetail, saveApi } from "@/api/basic/supplier";
import { labelList } from "@/api/main";
import jsCookie from "js-cookie";
export default {
  data() {
    return {
      formData: {
        supplier_id: "",
        images: [],
        name: "",
        type: "",
        code: "",
        food_permit: "",
        food_permit_images: [],
        other_permit: "",
        other_permit_images: [],
        contacts: "",
        contact_moblies: [{ phone: "" }],
        address: "",
        warehouse_address: "",
      }, //表单提交数据
      detailImagesFile: [], //照片多图（详情渲染）
      foodPermitImages: [], //食品许可证多图（详情渲染）
      otherPermitImages: [], //其他证件多图（详情渲染）
      dialogImageUrl: "",
      dialogVisible: false,
      typeList: [],
    };
  },
  created() {
    if (this.$route.query.id) {
      this.formData.good_id = this.$route.query.id;
      this.getDetail();
    }
    this.getLabelList();
  },
  methods: {
    //详情
    getDetail() {
      getDetail({ good_id: this.formData.good_id }).then((res) => {
        for (let key in this.formData) {
          this.formData[key] = res[key];
        }
        if (res.images.length > 0) {
          let imgsArr = [];
          res.images.forEach((item, index) => {
            imgsArr.push({ name: `detailImagesFile${index}`, url: item });
          });
          this.detailImagesFile = imgsArr;
        }
        if (res.food_permit_images.length > 0) {
          let imgsArr = [];
          res.food_permit_images.forEach((item, index) => {
            imgsArr.push({ name: `foodPermitImages${index}`, url: item });
          });
          this.foodPermitImages = imgsArr;
        }
        if (res.other_permit_images.length > 0) {
          let imgsArr = [];
          res.other_permit_images.forEach((item, index) => {
            imgsArr.push({ name: `otherPermitImages${index}`, url: item });
          });
          this.otherPermitImages = imgsArr;
        }
      });
    },
    //标签列表
    getLabelList() {
      labelList({ type_id: 5 }).then((res) => {
        this.typeList = res;
      });
    },
    reducePhone(index) {
      if (this.formData.contact_moblies.length === 1) {
        return;
      }
      this.formData.contact_moblies.splice(index, 1);
    },
    addPhone() {
      this.formData.contact_moblies.unshift({ phone: "" });
    },
    //提交
    onSubmit() {
      let aData = JSON.parse(JSON.stringify(this.formData));
      aData.images = JSON.stringify(aData.images);
      aData.food_permit_images = JSON.stringify(aData.food_permit_images);
      aData.other_permit_images = JSON.stringify(aData.other_permit_images);
      aData.contact_moblies = JSON.stringify(aData.contact_moblies);
      saveApi(this.formData).then((res) => {
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
    //查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传多图
    upLoadImg(res, type) {
      if (res.status) {
        switch (type) {
          case 1:
            this.formData.images.push(res.data.image_url);
            break;
          case 2:
            this.formData.food_permit_images.push(res.data.image_url);
            break;
          case 3:
            this.formData.other_permit_images.push(res.data.image_url);
            break;
        }
      }
    },
    //删除多图
    handleRemove(file, type) {
      let param = "";
      switch (type) {
        case 1:
          param = "images";
          break;
        case 2:
          param = "food_permit_images";
          break;
        case 3:
          param = "other_permit_images";
          break;
      }
      const index = this.formData[param].findIndex((item) => item == file.url);
      this.formData[param].splice(index, 1);
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