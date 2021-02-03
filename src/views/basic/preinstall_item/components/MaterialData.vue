<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-form-item label="主料"> </el-form-item>
      </el-col>
      <el-col :span="span || 12">
        <el-card shadow="always">
          <div>
            <div class="item_title">
              <p>材料名称</p>
              <p>单位</p>
              <p>数量</p>
            </div>
            <el-divider />
            <div
              class="item_content"
              v-for="(item, index) in formData.formula_main_material"
              :key="index"
            >
              <div>
                <p>{{ item.material_name }}</p>
              </div>
              <div>
                <p>{{ item.unit_name }}</p>
              </div>
              <div class="i_right">
                <p>{{ item.num }}</p>
                <i
                  @click="delFormulaMainMaterial(item.material_id)"
                  class="el-icon-delete del_btn"
                ></i>
              </div>
            </div>
            <div class="item_content">
              <div>
                <el-select
                  v-model="formula_main_material_id"
                  filterable
                  placeholder="请选择材料"
                >
                  <el-option
                    v-for="item in materialData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div>
                <p>
                  {{ checkedMaterial1 ? checkedMaterial1.unit_name : "无" }}
                </p>
              </div>
              <div>
                <el-input
                  type="number"
                  v-model="formula_main_material_num"
                ></el-input>
              </div>
            </div>
          </div>
          <el-button type="success" @click="addFormulaMainMaterial"
            >新增</el-button
          >
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="20">
      <el-col :span="4">
        <el-form-item label="辅料"> </el-form-item>
      </el-col>
      <el-col :span="span || 12">
        <el-card shadow="always">
          <div>
            <div class="item_title">
              <p>材料名称</p>
              <p>单位</p>
              <p>数量</p>
            </div>
            <el-divider />
            <div
              class="item_content"
              v-for="(item, index) in formData.formula_secondary_material"
              :key="index"
            >
              <div>
                <p>{{ item.material_name }}</p>
              </div>
              <div>
                <p>{{ item.unit_name }}</p>
              </div>
              <div class="i_right">
                <p>{{ item.num }}</p>
                <i
                  @click="delFormulaSecondaryMaterial(item.material_id)"
                  class="el-icon-delete del_btn"
                ></i>
              </div>
            </div>
            <div class="item_content">
              <div>
                <el-select
                  v-model="formula_secondary_material_id"
                  filterable
                  placeholder="请选择材料"
                >
                  <el-option
                    v-for="item in materialData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div>
                <p>
                  {{ checkedMaterial2 ? checkedMaterial2.unit_name : "无" }}
                </p>
              </div>
              <div>
                <el-input
                  type="number"
                  v-model="formula_secondary_material_num"
                ></el-input>
              </div>
            </div>
          </div>
          <el-button type="success" @click="addFormulaSecondaryMaterial"
            >新增</el-button
          >
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="20">
      <el-col :span="4">
        <el-form-item label="调料"> </el-form-item>
      </el-col>
      <el-col :span="span || 12">
        <el-card shadow="always">
          <div>
            <div class="item_title">
              <p>调料名称</p>
              <p>单位</p>
              <p>数量</p>
            </div>
            <el-divider />
            <div
              class="item_content"
              v-for="(item, index) in formData.formula_flavour_material"
              :key="index"
            >
              <div>
                <p>{{ item.material_name }}</p>
              </div>
              <div>
                <p>{{ item.unit_name }}</p>
              </div>
              <div class="i_right">
                <p>{{ item.num }}</p>
                <i
                  @click="delFormulaFlavourMaterial(item.material_id)"
                  class="el-icon-delete del_btn"
                ></i>
              </div>
            </div>
            <div class="item_content">
              <div>
                <el-select
                  v-model="formula_flavour_material_id"
                  filterable
                  placeholder="请选择调料"
                >
                  <el-option
                    v-for="item in seasoningData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div>
                <p>
                  {{ checkedSeasoning ? checkedSeasoning.unit_name : "无" }}
                </p>
              </div>
              <div>
                <el-input
                  type="number"
                  v-model="formula_flavour_material_num"
                ></el-input>
              </div>
            </div>
          </div>
          <el-button type="success" @click="addFormulaFlavourMaterial"
            >新增</el-button
          >
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getMaterialsData } from "@/api/basic/preinstall_item";
export default {
  props:["span","data"],
  data() {
    return {
      formData: {
        formula_main_material: [],
        formula_secondary_material: [],
        formula_flavour_material: [],
      },
      materialData: [],
      seasoningData: [],
      formula_main_material_id: "",
      formula_main_material_num: "",
      formula_secondary_material_id: "",
      formula_secondary_material_num: "",
      formula_flavour_material_id: "",
      formula_flavour_material_num: "",
    };
  },
  created() {
    console.log(this.formData)
    this.formData.formula_main_material = this.data.formula_main_material || [];
    this.formData.formula_secondary_material = this.data.formula_secondary_material || [];
    this.formData.formula_flavour_material = this.data.formula_flavour_material || [];
    this.getMaterialsData();
  },
  computed: {
    checkedMaterial1() {
      if (this.formula_main_material_id) {
        return this.materialData.find(
          (item) => item.id == this.formula_main_material_id
        );
      }
    },
    checkedMaterial2() {
      if (this.formula_secondary_material_id) {
        return this.materialData.find(
          (item) => item.id == this.formula_secondary_material_id
        );
      }
    },
    checkedSeasoning() {
      if (this.formula_flavour_material_id) {
        return this.seasoningData.find(
          (item) => item.id == this.formula_flavour_material_id
        );
      }
    },
  },
  methods: {
    //新增主料
    addFormulaMainMaterial() {
      if (!this.formula_main_material_id) {
        return this.$message.error("请选择要新增的材料");
      }
      if (!this.formula_main_material_num) {
        return this.$message.error("请填写数量");
      }
      this.formData.formula_main_material.push({
        material_name: this.checkedMaterial1.name,
        unit_name: this.checkedMaterial1.unit_name,
        material_id: this.formula_main_material_id,
        num: this.formula_main_material_num,
      });
      this.formula_main_material_id = this.formula_main_material_num = "";
      this.$emit(
        "addFormulaMainMaterial",
        JSON.stringify(this.formData.formula_main_material)
      );
    },
    //删除主料
    delFormulaMainMaterial(id) {
      let index = this.formData.formula_main_material.findIndex(
        (item) => item.material_id == id
      );
      this.formData.formula_main_material.splice(index, 1);
      this.$emit(
        "delFormulaMainMaterial",
        JSON.stringify(this.formData.formula_main_material)
      );
    },
    //新增辅料
    addFormulaSecondaryMaterial() {
      if (!this.formula_secondary_material_id) {
        return this.$message.error("请选择要新增的材料");
      }
      if (!this.formula_secondary_material_num) {
        return this.$message.error("请填写数量");
      }
      this.formData.formula_secondary_material.push({
        material_name: this.checkedMaterial2.name,
        unit_name: this.checkedMaterial2.unit_name,
        material_id: this.formula_secondary_material_id,
        num: this.formula_secondary_material_num,
      });
      this.formula_secondary_material_id = this.formula_secondary_material_num =
        "";
      this.$emit(
        "addFormulaSecondaryMaterial",
        JSON.stringify(this.formData.formula_secondary_material)
      );
    },
    //删除辅料
    delFormulaSecondaryMaterial(id) {
      let index = this.formData.formula_secondary_material.findIndex(
        (item) => item.material_id == id
      );
      this.formData.formula_secondary_material.splice(index, 1);
      this.$emit(
        "delFormulaSecondaryMaterial",
        JSON.stringify(this.formData.formula_secondary_material)
      );
    },
    //新增调料
    addFormulaFlavourMaterial() {
      if (!this.formula_flavour_material_id) {
        return this.$message.error("请选择要新增的调料");
      }
      if (!this.formula_flavour_material_num) {
        return this.$message.error("请填写数量");
      }
      this.formData.formula_flavour_material.push({
        material_name: this.checkedSeasoning.name,
        unit_name: this.checkedSeasoning.unit_name,
        material_id: this.formula_flavour_material_id,
        num: this.formula_flavour_material_num,
      });
      this.formula_flavour_material_id = this.formula_flavour_material_num = "";
      this.$emit(
        "addFormulaFlavourMaterial",
        JSON.stringify(this.formData.formula_flavour_material)
      );
    },
    //删除调料
    delFormulaFlavourMaterial(id) {
      let index = this.formData.formula_flavour_material.findIndex(
        (item) => item.formula_flavour_material_id == id
      );
      this.formData.formula_flavour_material.splice(index, 1);
      this.$emit(
        "delFormulaFlavourMaterial",
        JSON.stringify(this.formData.formula_flavour_material)
      );
    },
    //材料和调料列表
    getMaterialsData() {
      getMaterialsData({ type: 1 }).then((res) => {
        this.materialData = res;
      });
      getMaterialsData({ type: 2 }).then((res) => {
        this.seasoningData = res;
      });
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