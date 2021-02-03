<template>
  <div class="app-container">
    <h2>预设单品详情</h2>
    <el-card shadow="always">
      <el-form label-width="100px">
        <el-form-item label="单品名称">
          <p>{{ detail.name }}</p>
        </el-form-item>
        <el-form-item label="单品图">
          <img :src="detail.image" alt="" />
        </el-form-item>
      </el-form>
      <div
        style="display: flex; justify-content: flex-end; margin-bottom: 15px"
      >
        <el-button type="success" @click="dialogMaterialData = true"
          >新增配方</el-button
        >
      </div>
      <el-tabs v-if="tabCon.length" v-model="tabActive" type="border-card">
        <el-tab-pane
          v-for="item in tabCon"
          :key="item.id"
          :label="item.name"
          :name="item.id"
        >
          <tab-pane
            v-if="tabActive == item.id"
            :id="item.id"
            @openDialogExperiment="dialogExperiment = true"
            @changeMaterialData="changeMaterialData"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog
      :title="formula_detail.id ? '编辑配方' : '新增配方'"
      :visible.sync="dialogMaterialData"
    >
      <el-form label-width="100px">
        <MaterialData
          :key="timer"
          :data="formula_detail"
          :span="16"
          @addFormulaMainMaterial="addFormulaMainMaterial"
          @delFormulaMainMaterial="delFormulaMainMaterial"
          @addFormulaSecondaryMaterial="addFormulaSecondaryMaterial"
          @delFormulaSecondaryMaterial="delFormulaSecondaryMaterial"
          @addFormulaFlavourMaterial="addFormulaFlavourMaterial"
          @delFormulaFlavourMaterial="delFormulaFlavourMaterial"
        />
      </el-form>
      <div style="margin-top: 20px; display: flex; justify-content: flex-end">
        <el-button @click="dialogMaterialData = false">取 消</el-button>
        <el-button type="primary" @click="saveMaterialData">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增实验" :visible.sync="dialogExperiment">
      <el-form label-width="100px">
        <el-form-item label="设备">
          <el-select
            @change="deviceChange"
            style="width: 100%"
            v-model="experimentData.device_id"
            filterable
            placeholder="请选择设备"
          >
            <el-option
              v-for="item in deviceList"
              :key="item.id"
              :label="item.device_no"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单元格">
          <el-select
            style="width: 100%"
            v-model="experimentData.cell"
            filterable
            placeholder="请选择单元格"
          >
            <el-option
              v-for="item in cellList"
              :key="item.id"
              :label="item.number"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实验日期">
          <el-date-picker
            v-model="experimentData.date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-time-picker
            placeholder="请选择开始时间"
            v-model="experimentData.start_time"
            format="HH:mm"
            value-format="HH:mm"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-time-picker
            placeholder="请选择结束时间"
            v-model="experimentData.end_time"
            format="HH:mm"
            value-format="HH:mm"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="温度曲线">
          <div
            class="temperature_flex"
            v-for="(item, index) in experimentData.test_temperature"
          >
            <p class="experiment_title">第{{ toChinesNum(index + 1) }}段</p>
            <el-input
              style="margin-left: 20px"
              v-model="item.temperature"
              placeholder="请输入温度"
            >
              <template slot="append">℃</template>
            </el-input>
            <el-input
              style="margin-left: 20px"
              v-model="item.time"
              placeholder="请输入时间"
            >
              <template slot="append">min</template>
            </el-input>
          </div>
        </el-form-item>
        <el-button @click="addTemperature" type="success"
          >添加新温度曲线</el-button
        >
      </el-form>
      <div style="margin-top: 20px; display: flex; justify-content: flex-end">
        <el-button @click="dialogExperiment = false">取 消</el-button>
        <el-button type="primary" @click="saveTest">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  detailApi,
  formulaList,
  saveFormula,
  deviceList,
  cellList,
  saveTest,
} from "@/api/basic/preinstall_item";
import TabPane from "./components/TabPane";
import MaterialData from "./components/MaterialData";
export default {
  data() {
    return {
      id: "",
      detail: {},
      formula_detail: {},
      dialogMaterialData: false,
      dialogExperiment: false,
      tabActive: "",
      tabCon: [],
      formula_main_material: [],
      formula_secondary_material: [],
      formula_flavour_material: [],
      deviceList: [],
      cellList: [],
      experimentData: {
        device_id: "",
        cell: "",
        start_time: "",
        end_time: "",
        test_temperature: [{ temperature: "", time: "" }],
      },
      defaultExperimentData: {},
      timer:""
    };
  },
  components: {
    MaterialData,
    TabPane,
  },
  async created() {
    this.id = this.$route.query.id;
    this.defaultExperimentData = JSON.parse(
      JSON.stringify(this.experimentData)
    );
    await this.getDetail();
    await this.getFormulaList();
    this.getDeviceList();
  },
  watch: {
    dialogMaterialData(flag) {
      if (!flag) {
        this.formula_detail = {};
        this.timer = new Date().getTime();
      }
    },
    dialogExperiment(flag) {
      if (!flag) {
        this.experimentData = JSON.parse(
          JSON.stringify(this.defaultExperimentData)
        );
        this.cellList = [];
      }
    },
  },
  methods: {
    //设备列表
    getDeviceList() {
      deviceList().then((res) => {
        this.deviceList = res;
      });
    },
    //切换设备
    deviceChange() {
      this.experimentData.cell = "";
      this.getCellList();
    },
    //单元格列表
    getCellList() {
      cellList({ device_id: this.experimentData.device_id }).then((res) => {
        this.cellList = res;
      });
    },
    //预设单品详情
    getDetail() {
      return detailApi({ id: this.id }).then((res) => {
        this.detail = res;
      });
    },
    //配方列表
    getFormulaList() {
      return formulaList({ id: this.id }).then((res) => {
        this.tabActive = res[0].id;
        this.tabCon = res;
      });
    },
    //新增主料
    addFormulaMainMaterial(data) {
      this.formula_main_material = data;
    },
    //删除主料
    delFormulaMainMaterial(data) {
      this.formula_main_material = data;
    },
    //新增辅料
    addFormulaSecondaryMaterial(data) {
      this.formula_secondary_material = data;
    },
    //删除辅料
    delFormulaSecondaryMaterial(data) {
      this.formula_secondary_material = data;
    },
    //新增调料
    addFormulaFlavourMaterial(data) {
      this.formula_flavour_material = data;
    },
    //删除调料
    delFormulaFlavourMaterial(data) {
      this.formula_flavour_material = data;
    },
    //编辑配方
    changeMaterialData(detail) {
      this.dialogMaterialData = true;
      this.formula_detail = detail;
    },
    //添加温度曲线
    addTemperature() {
      this.experimentData.test_temperature.push({
        temperature: "",
        time: "",
      });
    },
    //新增/编辑配方
    saveMaterialData() {
      let aData = {
        formula_id: this.formula_detail.id,
        product_id: this.id,
        formula_main_material: this.formula_main_material,
        formula_secondary_material: this.formula_secondary_material,
        formula_flavour_material: this.formula_flavour_material,
      };
      saveFormula(aData).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.getFormulaList();
              this.dialogMaterialData = false;
            },
          });
        }
      });
    },
    //新增/编辑实验台
    saveTest() {
      let aData = this.experimentData;
      aData.formula_id = this.tabActive;
      saveTest(aData).then((res) => {});
    },
    toChinesNum(num) {
      let changeNum = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
      ];
      let unit = ["", "十", "百", "千", "万"];
      num = parseInt(num);
      let getWan = (temp) => {
        let strArr = temp.toString().split("").reverse();
        let newNum = "";
        for (var i = 0; i < strArr.length; i++) {
          newNum =
            (i == 0 && strArr[i] == 0
              ? ""
              : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0
              ? ""
              : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i])) +
            newNum;
        }
        if (newNum[0] == "一" && newNum[1] == "十") {
          return newNum.substring(1, newNum.length);
        }
        return newNum;
      };
      return getWan(num);
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 200px;
  height: 200px;
}
.experiment_top {
  display: flex;
  justify-content: space-between;
}
.experiment_title {
  font-size: 14px;
  font-weight: bold;
  color: #606266;
}
.experiment_opt {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.experiment_opt_tg {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: #606266;
}
.analysis_item {
  display: flex;
}
.analysis_item div {
  font-size: 14px;
  width: 150px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  margin: -1px;
}
.analysis_item div:last-child {
  width: 400px;
}
.analysis_item:first-child div {
  font-weight: bold;
  color: #606266;
}
.temperature_flex {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
.temperature_flex p {
  width: 100px;
}
</style>