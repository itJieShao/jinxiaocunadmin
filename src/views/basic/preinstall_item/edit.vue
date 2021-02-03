<template>
  <div class="app-container">
    <h2>新增预设单品</h2>
    <el-card shadow="always">
      <el-form label-width="100px">
        <el-form-item label="单品标题">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="单品主图">
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
        <el-divider />
        <MaterialData
          @addFormulaMainMaterial="addFormulaMainMaterial"
          @delFormulaMainMaterial="delFormulaMainMaterial"
          @addFormulaSecondaryMaterial="addFormulaSecondaryMaterial"
          @delFormulaSecondaryMaterial="delFormulaSecondaryMaterial"
          @addFormulaFlavourMaterial="addFormulaFlavourMaterial"
          @delFormulaFlavourMaterial="delFormulaFlavourMaterial"
        />
        <el-divider />
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
import { addApi } from "@/api/basic/preinstall_item";
import MaterialData from "./components/MaterialData";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      formData: {
        name: "",
        image: "",
        formula_main_material: [],
        formula_secondary_material: [],
        formula_flavour_material: [],
      }, //表单提交数据,
      dialogImageUrl: "",
      detailMainImgFile: [],
    };
  },
  components: { MaterialData, Pagination },
  methods: {
    //新增主料
    addFormulaMainMaterial(data) {
      this.formData.formula_main_material = JSON.parse(data);
    },
    //删除主料
    delFormulaMainMaterial(data) {
      this.formData.formula_main_material = JSON.parse(data);
    },
    //新增辅料
    addFormulaSecondaryMaterial(data) {
      this.formData.formula_secondary_material = JSON.parse(data);
    },
    //删除辅料
    delFormulaSecondaryMaterial(data) {
      this.formData.formula_secondary_material = JSON.parse(data);
    },
    //新增调料
    addFormulaFlavourMaterial(data) {
      this.formData.formula_flavour_material = JSON.parse(data);
    },
    //删除调料
    delFormulaFlavourMaterial(data) {
      this.formData.formula_flavour_material = JSON.parse(data);
    },
    //提交
    onSubmit() {
      let aData = JSON.parse(JSON.stringify(this.formData));
      aData.formula_main_material = JSON.stringify(aData.formula_main_material);
      aData.formula_secondary_material = JSON.stringify(
        aData.formula_secondary_material
      );
      aData.formula_flavour_material = JSON.stringify(
        aData.formula_flavour_material
      );
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
    //上传主图
    upLoadMainImg(res, file) {
      if (res.status) {
        this.formData.image = res.data.image_url;
      }
    },
  },
};
</script>