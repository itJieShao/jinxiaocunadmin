<template>
  <div class="app-container">
    <h2>入库单详情</h2>
    <el-card shadow="always">
      <template v-if="detail.type_id == 1">
        <el-row :gutter="12">
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>入库单ID</p>
                <p>{{ detail.id }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>仓管员</p>
                <p>{{ detail.created_user_name }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>入库商品</p>
                <p>{{ detail.good_species }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>实际采购总数量</p>
                <p>{{ detail.good_real_num }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>入库点货数量</p>
                <p>{{ detail.in_store_num }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>调整增加</p>
                <p>{{ detail.add_num }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="12" style="margin-top: 20px">
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>调整减少</p>
                <p>{{ detail.reduce_num }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>实际入库点货数量</p>
                <p>{{ detail.in_store_real_num }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>差额</p>
                <p>{{ detail.diff_num }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>调整次数</p>
                <p>{{ detail.set_count }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>入库仓库</p>
                <p>{{ detail.in_store_name }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <h4>校对进度</h4>
        <el-table :data="detail.audit_detail" stripe style="width: 100%">
          <el-table-column
            align="center"
            prop="level"
            label="校对级别"
            width="180"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="audit_user_name"
            label="校对人"
            width="180"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="audit_at"
            label="校对时间"
            width="180"
          >
          </el-table-column>
          <el-table-column align="center" label="校对状态" width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.audit_status == 1">审核通过</span>
              <span v-else-if="scope.row.audit_status == 0">等待审核</span>
              <span v-else>审核失败</span>
            </template>
          </el-table-column>
          <el-table-column align="center">
            <template
              slot-scope="scope"
              v-if="
                scope.row.audit_status == 0 &&
                scope.row.first_audit &&
                scope.row.can_audit == 1
              "
            >
              <div style="display: flex">
                <el-button @click="examine_click(1)" type="success"
                  >数量无误</el-button
                >
                <el-button @click="examine_click(-1)" type="danger"
                  >取消入库</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template v-else>
        <el-row :gutter="12">
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>入库单ID</p>
                <p>{{ detail.id }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>入库单类型</p>
                <p>{{ detail.type_name }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>关联出库单</p>
                <p>{{ detail.out_store_id }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>出库仓库</p>
                <p>{{ detail.out_store_name }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>仓管员</p>
                <p>{{ detail.created_user_name }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>入库商品</p>
                <p>{{ detail.good_species }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="12" style="margin-top: 20px">
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>入库点货数量</p>
                <p>{{ detail.in_store_num }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="always">
              <div class="item_flex">
                <p>入库仓库</p>
                <p>{{ detail.in_store_name }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </template>
      <el-divider />
      <div style="margin-bottom: 20px" v-if="detail.type_id == 1">
        <div v-if="!btnFlag" style="display: flex; justify-content: flex-end">
          <el-button type="warning" @click="btnFlag = true">入库调整</el-button>
        </div>
        <div v-else style="display: flex; justify-content: flex-end">
          <el-button type="primary" @click="saveTable">保存调整</el-button>
          <el-button @click="btnFlag = false">取消</el-button>
        </div>
      </div>
      <el-table
        :data="detail.in_store_detail"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column width="100" align="center" label="商品编码">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column width="140" align="center" label="商品名称">
          <template slot-scope="scope">
            <span>{{ scope.row.good_name }}</span>
          </template>
        </el-table-column>
        <el-table-column width="140" align="center" label="单位">
          <template slot-scope="scope">
            <span>{{ scope.row.unit_name }}</span>
          </template>
        </el-table-column>
        <el-table-column width="200" align="center" label="实际采购数量">
          <template slot-scope="scope">
            <span>{{ scope.row.real_num }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="入库点货数量">
          <template slot-scope="scope">
            <span>{{ scope.row.in_store_num }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="btnFlag"
          width="140"
          align="center"
          label="调整增加"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.add_num"
              placeholder="请输入"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          v-if="btnFlag"
          width="140"
          align="center"
          label="调整减少"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.add_num"
              placeholder="请输入"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="入库仓库">
          <template slot-scope="scope">
            <span>{{ scope.row.in_store_name }}</span>
          </template>
        </el-table-column>

        <el-table-column width="160" align="center" label="实际入库点货数量">
          <template slot-scope="scope">
            <span>{{ scope.row.in_store_real_num }}</span>
          </template>
        </el-table-column>
        <el-table-column width="240" align="center" label="调整人">
          <template slot-scope="scope">
            <p v-for="(item, index) in scope.row.set_record" :key="index">
              {{ item.created_user_name }} {{ item.created_at }}
            </p>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getDetail } from "@/api/basic/warehousing";
export default {
  data() {
    return {
      detail: {},
      btnFlag: false,
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    //调整入库
    saveTable() {
      let list = JSON.parse(JSON.stringify(this.detail.in_store_detail)),
        aData = [];
      list.forEach((item) => {
        aData.push({
          in_store_detail_id: item.in_store_detail_id,
          store_id: item.store_id,
          add_num: item.add_num,
          reduce_num: item.reduce_num,
        });
      });
      setApi({
        in_store_id: this.detail.id,
        set_data: JSON.stringify(aData),
      }).then((res) => {
        if (res) {
          this.btnFlag = false;
          this.getDetail();
          this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
    getDetail() {
      getDetail({
        in_store_id: this.$route.query.id,
      }).then((res) => {
        let index = res.audit_detail.findIndex(
          (item) => item.audit_status == 0
        );
        if (index != -1) {
          res.audit_detail[index].first_audit = true;
        }
        this.detail = res;
      });
    },
  },
};
</script>