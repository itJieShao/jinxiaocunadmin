<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="24" style="display: flex; justify-content: flex-end">
        <el-button type="warning" @click="dialogTemperature = true"
          >导入探头温度表格</el-button
        >
        <el-button type="success" @click="addPurchase">生成采购表</el-button>
        <el-button type="warning" @click="exportBtn">导出到Excle</el-button>
        <el-button type="danger" @click="addSummary">踢除实验</el-button>
      </el-col>
    </el-row>
    <el-tabs v-model="tabActive" style="margin-top: 15px" type="border-card">
      <el-tab-pane
        v-for="item in tabCon"
        :key="item.key"
        :label="item.name"
        :name="item.key"
      >
        <keep-alive>
          <tab-pane v-if="tabActive == item.key" :type="item.key" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="导入探头温度表格" :visible.sync="dialogTemperature">
      <el-form label-width="100px">
        <el-form-item label="实验日期">
          <el-date-picker type="date" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
        <el-form-item label="导入表格列数">
          <el-input placeholder="请输入表格列数，可为空"></el-input>
        </el-form-item>
      </el-form>
      <div class="temperatureCon">
        <el-button type="success" style="flex: 1">添加探头温度表格</el-button>
        <div style="flex: 1">
          354654646446464.xlsx
          <i class="el-icon-delete delTemperatureCon"></i>
        </div>
      </div>
      <el-table v-loading="loading" :data="list" border style="width: 100%;margin-bottom:20px;">
        <el-table-column width="120" align="center" label="实验单品">
          <template slot-scope="scope">
            <span>{{ scope.row.cell_no }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="配方">
          <template slot-scope="scope">
            <span>{{ scope.row.cell_no }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="实验编号">
          <template slot-scope="scope">
            <span>{{ scope.row.cell_no }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="设备">
          <template slot-scope="scope">
            <span>{{ scope.row.cell_no }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="单元格">
          <template slot-scope="scope">
            <span>{{ scope.row.cell_no }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="探头号">
          <template slot-scope="scope">
            
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: flex-end">
        <el-button @click="dialogTemperature">取 消</el-button>
        <el-button type="primary" @click="submitBtn">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TabPane from "./components/TabPane";
export default {
  name: "experiment",
  components: { TabPane },
  data() {
    return {
      tabActive: "1",
      tabCon: [
        {
          key: "1",
          name: "实验台",
        },
        {
          key: "2",
          name: "计划实验",
        },
        {
          key: "3",
          name: "历史实验",
        },
      ],
      dialogTemperature: false,
    };
  },
  methods: {},
};
</script>
<style scoped>
.temperatureCon {
  display: flex;
  margin-bottom: 15px;
}
.temperatureCon div {
  background-color: #eee;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.delTemperatureCon {
  cursor: pointer;
  margin-left: 20px;
  color: red;
}
</style>
