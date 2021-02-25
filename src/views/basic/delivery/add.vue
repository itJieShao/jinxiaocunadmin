<template>
  <div class="app-container">
    <h2>新增出库单</h2>
    <el-card shadow="always">
      
    </el-card>
  </div>
</template>
<script>
// import {
//   updateProduct,
//   productList,
//   productDetail,
//   supplierList,
//   materialData,
//   seasoningData,
//   packageBox,
// } from "@/api/basic";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      formData: {
        name: "",
        image: "",
        product_category_id: "",
        product_package_box_id: "",
        taste_id: "",
        warn_cost_price: "",
        cost_price: "",
        weight: "",
        supplier_id: "",
        process_indicators: "",
        quality_standard: "",
        material: [],
        seasoning: [],
        temperature_corve: [],
        heating_rate_id: "",
        temperature_curve_sensitive: "",
        cell_location: "",
      }, //表单提交数据
      checkedProductData: [],
      productListData: {
        export: "",
        name: "",
        page: 1,
        page_size: 5,
      },
      productList: [],
      total: 0,
      dialogImageUrl: "",
      dialogVisible: false,
      dialogTableVisible: false,
      labelList: [],
      packageBox: [],
      tasteList: [],
      supplierList: [],
      materialData: [],
      materialId: "",
      materialNum: "",
      seasoningData: [],
      seasoningId: "",
      seasoningNum: "",
      time: "",
      temperature: "",
      detailMainImgFile: [],
      heatingRateList: [],
      temperatureCurveSensitive: [
        { name: "最不敏感", id: 1 },
        { name: "不敏感", id: 2 },
        { name: "一般", id: 3 },
        { name: "比较敏感", id: 4 },
        { name: "最敏感", id: 5 },
      ],
      cellLocationList: [
        { name: "上层", id: 1 },
        { name: "中层", id: 2 },
        { name: "下层", id: 3 },
      ],
    };
  },
  components: { Pagination },
  computed: {
    checkedMaterial() {
      if (this.materialId) {
        return this.materialData.find((item) => item.id == this.materialId);
      }
    },
    checkedSeasoning() {
      if (this.seasoningId) {
        return this.seasoningData.find((item) => item.id == this.seasoningId);
      }
    },
  },
  created() {
    if (this.$route.query.id) {
      this.formData.id = this.$route.query.id;
      this.getDetail();
    }
    this.getLabelList();
    this.getPackageBox();
    this.getSupplierList();
    this.getTasteList();
    this.getMaterialData();
    this.getSeasoningData();
    this.getHeatingRateList();
  },
  methods: {
    //新增材料
    addMaterial() {
      if (!this.materialId) {
        return this.$message.error("请选择要新增的材料");
      }
      if (!this.materialNum) {
        return this.$message.error("请填写数量");
      }
      this.formData.material.push({
        material_name: this.checkedMaterial.name,
        unit_name: this.checkedMaterial.unit_name,
        material_id: this.materialId,
        num: this.materialNum,
      });
      this.materialId = this.materialNum = "";
    },
    //删除材料
    deleteMaterial(id) {
      let index = this.formData.material.findIndex(
        (item) => item.material_id == id
      );
      this.formData.material.splice(index, 1);
    },
    //新增调料
    addSeasoning() {
      if (!this.seasoningId) {
        return this.$message.error("请选择要新增的调料");
      }
      if (!this.seasoningNum) {
        return this.$message.error("请填写数量");
      }
      this.formData.seasoning.push({
        seasoning_name: this.checkedSeasoning.name,
        unit_name: this.checkedSeasoning.unit_name,
        seasoning_id: this.seasoningId,
        num: this.seasoningNum,
      });
      this.seasoningId = this.seasoningNum = "";
    },
    //删除调料
    deleteSeasoning(id) {
      let index = this.formData.seasoning.findIndex(
        (item) => item.seasoning_id == id
      );
      this.formData.seasoning.splice(index, 1);
    },
    //新增温度曲线
    addTemperatureCorve() {
      if (!this.time || !this.temperature) {
        return this.$message.error("请输入时间和温度");
      }
      this.formData.temperature_corve.push({
        time: this.time,
        temperature: this.temperature,
      });
      this.time = this.temperature = "";
    },
    //删除温度曲线
    deleteTemperatureCorve(index) {
      this.formData.temperature_corve.splice(index, 1);
    },
    //预设单品详情
    getDetail() {
      productDetail({ id: this.$route.query.id }).then((res) => {
        this.formData = res;
        if (res.image) {
          this.detailMainImgFile = [
            { name: "detailMainImgFile", url: res.image },
          ];
        }
        this.$set(this.formData, "material", res.material_data);
        this.$set(this.formData, "seasoning", res.seasoning_data);
        this.$set(this.formData, "temperature_corve", res.temperature_curve);
      });
    },
    //预设单品标签列表
    getLabelList() {
      categoryData({ type: 2 }).then((res) => {
        this.labelList = res;
      });
    },
    //包装列表
    getPackageBox() {
      packageBox().then((res) => {
        this.packageBox = res;
      });
    },
    //味型列表
    getTasteList() {
      categoryData({ type: 5 }).then((res) => {
        this.tasteList = res;
      });
    },
    //供应商列表
    getSupplierList() {
      supplierList().then((res) => {
        this.supplierList = res;
      });
    },
    //材料列表
    getMaterialData() {
      materialData().then((res) => {
        this.materialData = res;
      });
    },
    //调料列表
    getSeasoningData() {
      seasoningData({ type: 4 }).then((res) => {
        this.seasoningData = res;
      });
    },
    //加热速率列表
    getHeatingRateList() {
      categoryData({ type: 9 }).then((res) => {
        this.heatingRateList = res;
      });
    },
    //提交
    onSubmit() {
      updateProduct(this.formData).then((res) => {
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
<style lang="scss">
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