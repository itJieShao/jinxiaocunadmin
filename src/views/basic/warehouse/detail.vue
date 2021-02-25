<template>
  <div class="app-container">
    <h2>仓库详情</h2>
    <el-card shadow="always">
      <el-row :gutter="12">
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>仓库ID</p>
              <p>{{ detail.id }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>仓库名称</p>
              <p>{{ detail.name }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>仓库类型</p>
              <p>{{ detail.type_name }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>仓库主管</p>
              <p>{{ detail.manage_user_name }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>仓库入库员</p>
              <p>{{ detail.in_store_user_name }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>仓库出库员</p>
              <p>{{ detail.out_store_user_name }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="12" style="margin-top: 15px">
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>仓库面积</p>
              <p>{{ detail.area }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>租金</p>
              <p>{{ detail.rent }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>联系电话</p>
              <p v-if="detail.mobiles.length">
                {{ detail.mobiles.join("、") }}
              </p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>仓库地址</p>
              <p>{{ detail.address }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>启用状态</p>
              <p>{{ detail.status == 1 ? "启用中" : "禁用中" }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>操作</p>
              <p>
                <el-tag
                  @click="updateStatus"
                  style="cursor: pointer"
                  :type="detail.status == 1 ? 'danger' : 'success'"
                  effect="dark"
                >
                  {{ detail.status == 1 ? "禁用" : "启用" }}
                </el-tag>
              </p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="12" style="margin-top: 15px">
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>商品款数</p>
              <p>{{ detail.good_num }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>总可用库存</p>
              <p>{{ detail.id }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>出库中数量</p>
              <p>{{ detail.id }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-divider />
      <el-table
        :data="detail.detail"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column width="100" align="center" label="商品ID">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column width="200" align="center" label="商品图片">
          <template slot-scope="scope">
            <img
              style="width: 100px; height: 100px"
              :src="scope.row.image"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column width="200" align="center" label="商品名称">
          <template slot-scope="scope">
            <span>{{ scope.row.good_name }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="可用库存">
          <template slot-scope="scope">
            <span>{{ scope.row.way }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="出库中数量">
          <template slot-scope="scope">
            <span>{{ scope.row.supplier_name }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="分类">
          <template slot-scope="scope">
            <span>{{ scope.row.unit_name }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="类型">
          <template slot-scope="scope">
            <span>{{ scope.row.unit_price }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120" align="center" label="单位">
          <template slot-scope="scope">
            <span>{{ scope.row.freight }}</span>
          </template>
        </el-table-column>
        <el-table-column width="200" align="center" label="规格">
          <template slot-scope="scope">
            <span>{{ scope.row.pre_tax_price }}</span>
          </template>
        </el-table-column>
        <el-table-column width="140" align="center" label="成本预警价">
          <template slot-scope="scope">
            <span>{{ scope.row.tax_rate }}</span>
          </template>
        </el-table-column>
        <el-table-column width="200" align="center" label="供应商">
          <template slot-scope="scope">
            <span>{{ scope.row.tax_price }}</span>
          </template>
        </el-table-column>
        <el-table-column width="200" align="center" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.after_tax_price }}</span>
          </template>
        </el-table-column>
        <el-table-column width="140" align="center" label="最近一次入库">
          <template slot-scope="scope">
            <span>{{ scope.row.pay_price }}</span>
          </template>
        </el-table-column>
        <el-table-column width="140" align="center" label="最近一次入库数量">
          <template slot-scope="scope">
            <span>{{ scope.row.num }}</span>
          </template>
        </el-table-column>
        <el-table-column width="140" align="center" label="最近一次出库">
          <template slot-scope="scope">
            <span>{{ scope.row.real_num }}</span>
          </template>
        </el-table-column>
        <el-table-column width="140" align="center" label="最近一次出库数量">
          <template slot-scope="scope">
            <span>{{ scope.row.refund_num }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getDetail, updateStatus } from "@/api/basic/warehouse";
export default {
  data() {
    return {
      detail: {},
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      getDetail({
        store_id: this.$route.query.id,
      }).then((res) => {
        this.detail = res;
      });
    },
    updateStatus() {
      updateStatus({
        store_id: this.detail.id,
        status: this.detail.status ? 0 : 1,
      }).then((res) => {
        if (res) {
          this.detail.status = this.detail.status ? 0 : 1;
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
  },
};
</script>