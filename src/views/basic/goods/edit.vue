<template>
  <div class="app-container">
    <h2>{{ $route.query.id ? "编辑商品" : "新增商品" }}</h2>
    <el-card shadow="always">
      <el-form label-width="100px">
        <el-form-item label="商品名称">
          <el-input placeholder="请输入商品名称" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="商品图">
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
        <el-divider />
        <el-form-item label="分类">
          <el-select
            style="width: 100%"
            v-model="formData.category_id"
            filterable
            placeholder="请选择商品分类"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            style="width: 100%"
            v-model="formData.type_id"
            filterable
            placeholder="请选择商品类型"
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
        <el-form-item label="单位">
          <el-select
            style="width: 100%"
            v-model="formData.unit_id"
            filterable
            placeholder="请选择商品单位"
          >
            <el-option
              v-for="item in unitList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格">
          <el-input placeholder="请输入商品规格" v-model="formData.specification"></el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-input placeholder="请输入品牌名称" v-model="formData.brand"></el-input>
        </el-form-item>
        <el-form-item label="成本预警价">
          <el-input placeholder="请输入成本预警价" v-model="formData.warn_cost_price">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="供应商">
          <el-select
            style="width: 100%"
            v-model="formData.supplier_ids"
            filterable
            multiple
            placeholder="请选择供应商（可多选）"
          >
            <el-option
              v-for="item in supplierList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
import { getGoodsDetail,saveGoods } from "@/api/basic/goods";
import { labelList,supplierData } from "@/api/main";
export default {
  data() {
    return {
      formData: {
        good_id:"",
        name:"",
        images:[],
        category_id:"",
        type_id:"",
        unit_id:"",
        specification:"",
        brand:"",
        warn_cost_price:"",
        supplier_ids:[],
      }, //表单提交数据
      detailImagesFile:[],
      dialogImageUrl: "",
      dialogVisible: false,
      categoryList:[],
      typeList:[],
      unitList:[],
      supplierList:[],
    };
  },
  created() {
    if (this.$route.query.id) {
      this.formData.good_id = this.$route.query.id;
      this.getDetail();
    }
    this.getLabelList();
    this.getSupplierList();
  },
  methods: {
    //供应商列表
    getSupplierList() {
      supplierData().then((res) => {
        this.supplierList = res;
      });
    },
    //详情
    getDetail() {
      getGoodsDetail({ good_id: this.formData.good_id }).then((res) => {
        for (let key in this.formData) {
          this.formData[key] = res[key];
        }
        this.formData.good_id = res.id;
        if (res.images.length > 0) {
            let imgsArr = [];
            res.images.forEach((item, index) => {
              imgsArr.push({ name: `detailImagesFile${index}`, url: item });
            });
            this.detailImagesFile = imgsArr;
          }
      });
    },
    //标签列表
    getLabelList() {
      labelList({ type_id: 1 }).then((res) => {
        this.categoryList = res;
      });
      labelList({ type_id: 2 }).then((res) => {
        this.typeList = res;
      });
      labelList({ type_id: 3 }).then((res) => {
        this.unitList = res;
      });
    },
    //提交
    onSubmit() {
      let aData = JSON.parse(JSON.stringify(this.formData));
      aData.images = JSON.stringify(aData.images)
      aData.supplier_ids = JSON.stringify(aData.supplier_ids);
      saveGoods(aData).then((res) => {
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