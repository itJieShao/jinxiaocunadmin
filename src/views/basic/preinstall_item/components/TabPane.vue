<template>
  <div>
    <div style="display: flex; justify-content: flex-end; margin-bottom: 15px">
      <el-button type="warning" @click="changeMaterialData">编辑配方</el-button>
      <el-button type="success" @click="openDialogExperiment"
        >新增实验</el-button
      >
    </div>
    <el-form label-width="100px">
      <el-form-item
        label="主料"
        v-if="formula_detail.formula_main_material.length"
      >
        <el-row :gutter="12" style="margin-top: 15px">
          <el-col
            :span="4"
            v-for="(item, index) in formula_detail.formula_main_material"
            :key="index"
          >
            <el-card shadow="always">
              <div class="item_flex">
                <p>{{ item.material_name }}</p>
                <p>{{ item.num }}/{{ item.unit_name }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        label="辅料"
        v-if="formula_detail.formula_secondary_material.length"
      >
        <el-row :gutter="12" style="margin-top: 15px">
          <el-col
            :span="4"
            v-for="(item, index) in formula_detail.formula_secondary_material"
            :key="index"
          >
            <el-card shadow="always">
              <div class="item_flex">
                <p>{{ item.material_name }}</p>
                <p>{{ item.num }}/{{ item.unit_name }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        label="调料"
        v-if="formula_detail.formula_flavour_material.length"
      >
        <el-row :gutter="12" style="margin-top: 15px">
          <el-col
            :span="4"
            v-for="(item, index) in formula_detail.formula_flavour_material"
            :key="index"
          >
            <el-card shadow="always">
              <div class="item_flex">
                <p>{{ item.material_name }}</p>
                <p>{{ item.num }}/{{ item.unit_name }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-card
      shadow="always"
      v-for="(item, index) in testList"
      :key="index"
      style="margin-bottom: 15px"
    >
      <div class="experiment_top">
        <p class="experiment_title">{{ item.name }}：</p>
        <div>
          <!-- <el-button type="primary" @click="">拷贝实验</el-button> -->
          <el-button type="success" @click="">添加到实验台</el-button>
        </div>
      </div>
      <el-row :gutter="12" style="margin-top: 15px">
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>设备</p>
              <p>{{ item.device_no }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>单元格</p>
              <p>{{ item.cell_no }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>实验日期</p>
              <p>{{ item.date }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>开始时间</p>
              <p>{{ item.start_time }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>结束时间</p>
              <p>{{ item.end_time }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>预算成本</p>
              <p>
                {{ item.budget_cost }}
              </p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="12" style="margin-top: 15px">
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>入机前菜的重量</p>
              <p>{{ item.weight }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>探头线</p>
              <p>{{ item.kraut_kramer }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>结束时的盒内温度</p>
              <p>{{ item.end_box_temperature }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>达到沸点的时间</p>
              <p>
                {{ item.reach_boiling }}
              </p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>试验人评分</p>
              <p>{{ item.tester_score }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>外评人评分</p>
              <p>{{ item.critics_score }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="12" style="margin-top: 15px">
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>实验人</p>
              <p>{{ item.test_admin_name }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="always">
            <div class="item_flex">
              <p>创建时间</p>
              <p>{{ item.created_at }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>实验结论</p>
              <p>{{ item.test_conclusion ? "终止实验" : "继续实验" }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-form
        v-show="item.toggle"
        label-width="130px"
        style="margin-top: 15px"
      >
        <el-form-item label="温度曲线">
          <el-row :gutter="12">
            <el-col :span="4" v-for="i in 1" style="margin-top: 15px">
              <el-card shadow="always">
                <div class="item_flex">
                  <p>第一段</p>
                  <p style="text-align: left">温度：35℃<br />时间：40min</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="板温/探头温">
          <Echart
            id="chart"
            width="100%"
            height="300px"
            :xAxis="item.created_at_arr"
            :series_a="item.plate_temperature_a_arr"
            :series_b="item.plate_temperature_b_arr"
            :series_w="item.water_temperature_arr"
          />
        </el-form-item>
        <template v-if="!item.test_status">
          <el-form-item label="预算成本">
            <div style="display: flex">
              <el-input placeholder="请输入价格" v-model="item.budget_cost_min">
                <template slot="prepend">预估最低成本</template> </el-input
              ><span style="margin: 0 20px">至</span>
              <el-input placeholder="请输入价格" v-model="item.budget_cost_max">
                <template slot="prepend">预估最高成本</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="入机前菜的重量">
            <el-input placeholder="请输入入机前菜的重量" v-model="item.weight">
              <template slot="append">克</template>
            </el-input>
          </el-form-item>
          <el-form-item label="结束时的盒内温度">
            <el-input
              placeholder="请输入结束时的盒内温度"
              v-model="item.end_box_temperature"
            >
              <template slot="append">℃</template>
            </el-input>
          </el-form-item>
          <el-form-item label="达到沸点的时间">
            <div style="display: flex">
              <el-input
                placeholder="请输入分钟"
                v-model="item.reach_boiling_minute"
              >
                <template slot="append">分钟</template>
              </el-input>
              <el-input
                style="margin-left: 20px"
                placeholder="请输入秒钟"
                v-model="item.reach_boiling_second"
              >
                <template slot="append">秒钟</template>
              </el-input>
            </div>
          </el-form-item>
        </template>
        <el-form-item label="与上次相比改良">
          <el-input
            :disabled="item.test_status"
            v-model="item.improve"
            :rows="5"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="试验目的">
          <el-input
            :disabled="item.test_status"
            v-model="item.test_goal"
            :rows="5"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="实验结果">
          <el-input
            :disabled="item.test_status"
            v-model="item.test_result"
            :rows="5"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="改进计划">
          <el-input
            :disabled="item.test_status"
            v-model="item.improved_plan"
            :rows="5"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="评论分析">
          <div class="analysis_table">
            <div class="analysis_item">
              <div></div>
              <div>试验人评分</div>
              <div>外评人评分</div>
              <div>评论</div>
            </div>
            <div class="analysis_item">
              <div>颜值（15分）</div>
              <div>14</div>
              <div>14</div>
              <div>汤色为红色，色泽鲜艳，较为光亮，有食欲。</div>
            </div>
            <div class="analysis_item">
              <div>口味（20分）</div>
              <div>14</div>
              <div>14</div>
              <div>汤色为红色，色泽鲜艳，较为光亮，有食欲。</div>
            </div>
            <div class="analysis_item">
              <div>香味（5分）</div>
              <div>14</div>
              <div>14</div>
              <div>汤色为红色，色泽鲜艳，较为光亮，有食欲。</div>
            </div>
            <div class="analysis_item">
              <div>其他（10分）</div>
              <div>14</div>
              <div>14</div>
              <div>汤色为红色，色泽鲜艳，较为光亮，有食欲。</div>
            </div>
            <div class="analysis_item">
              <div>小结</div>
              <div>14</div>
              <div>14</div>
              <div>汤色为红色，色泽鲜艳，较为光亮，有食欲。</div>
            </div>
          </div>
        </el-form-item>
        <div style="display: flex; justify-content: flex-end">
          <el-button type="primary">提交</el-button>
        </div>
      </el-form>
      <div :span="12" class="experiment_opt" style="margin-top: 15px">
        <div class="experiment_opt_tg" @click="toggleItem(index, item.toggle)">
          <p>{{ item.toggle ? "收起" : "展开" }}</p>
          <i
            :class="item.toggle ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
          ></i>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { formulaDetail, testList } from "@/api/basic/preinstall_item";
import Echart from "@/components/Echart";
export default {
  props: ["id"],
  components: { Echart },
  data() {
    return {
      formula_detail: {},
      dialogExperiment: false,
      testList: [],
    };
  },
  created() {
    this.getFormulaDetail();
    this.getTestList();
  },
  methods: {
    //实验列表
    getTestList() {
      testList({ id: this.id }).then((res) => {
        res.forEach((item) => {
          item.toggle = false;
          item.test_status = Number(item.test_status);
        });
        this.testList = res;
      });
    },
    //打开新增实验弹窗
    openDialogExperiment() {
      this.$emit("openDialogExperiment");
    },
    //编辑配方
    changeMaterialData() {
      this.$emit("changeMaterialData", this.formula_detail);
    },
    //展开/收起实验
    toggleItem(index, toggle) {
      this.$set(this.testList[index], "toggle", !toggle);
    },
    //配方详情
    getFormulaDetail() {
      formulaDetail({ id: this.id }).then((res) => {
        this.formula_detail = res;
      });
    },
  },
};
</script>
<style scoped>
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

