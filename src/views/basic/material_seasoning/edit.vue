<template>
  <div>
    <el-form label-width="100px">
      <el-form-item :label="`${type_name}名称`">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item :label="`${type_name}主图`">
        <el-upload
          :file-list="detailMainImgFile"
          :class="{ main_img_hide: formData.image }"
          :limit="1"
          :action="$upLoadImgApi"
          list-type="picture-card"
          :on-success="upLoadMainImg"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleMainImgRemove"
          :data="{ token: $store.state.user.token }"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="标签">
        <el-select
          style="width: 100%"
          v-model="formData.label_id"
          filterable
          placeholder="请选择标签"
        >
          <el-option
            v-for="item in labelData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单位">
        <el-select
          style="width: 100%"
          v-model="formData.unit_id"
          filterable
          placeholder="请选择单位"
        >
          <el-option
            v-for="item in unitData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格" v-if="type == 3">
        <el-input v-model="formData.specification"></el-input>
      </el-form-item>
      <div style="display: flex; justify-content: flex-end">
        <el-button @click="cancelBtn">取 消</el-button>
        <el-button type="primary" @click="submitBtn">确 定</el-button>
      </div>
    </el-form>
    <el-dialog append-to-body :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { saveApi, detailApi, unitList, labelList } from "@/api/basic/material_seasoning";
export default {
  props: ["type", "type_name", "jumpId"],
  data() {
    return {
      formData: {
        id:this.jumpId,
        name: "",
        image: "",
        type:this.type,
        label_id: "",
        unit_id: "",
        specification:""
      },
      detailMainImgFile: [],
      dialogVisible: false,
      dialogImageUrl: "",
      labelData: [], //标签下拉框
      unitData: [], //单位下拉框
    };
  },
  created() {
    this.getLabelData();
    this.getUnitData();
    if (this.jumpId) {
      this.getDetail();
    }
  },
  methods: {
    getLabelData() {
      labelList().then((res) => {
        this.labelData = res;
      });
    },
    getUnitData() {
      unitList().then((res) => {
        this.unitData = res;
      });
    },
    getDetail() {
      detailApi({ id: this.jumpId }).then((res) => {
        for (let key in this.formData) {
          this.formData[key] = res[key];
        }
        if (res.image) {
          this.detailMainImgFile = [
            { name: "detailMainImgFile", url: res.image },
          ];
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
    //上传主图
    upLoadMainImg(res, file) {
      if (res.status) {
        this.formData.image = res.data.image_url;
      }
    },
    cancelBtn() {
      this.$emit("closeDialog");
    },
    submitBtn() {
      saveApi(this.formData).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "提交成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.$emit("closeDialog", "1"); //有参数则刷新父组件表格
            },
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
.main_img_hide .el-upload--picture-card {
  display: none;
}
</style>