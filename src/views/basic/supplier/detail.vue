<template>
  <div class="app-container">
    <h2>供应商详情</h2>
    <el-card shadow="always">
      <el-row :gutter="12">
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>供应商ID</p>
              <p>{{ detail.id }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>供应商名称</p>
              <p>{{ detail.name }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>类型</p>
              <p>{{ detail.type_name }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>统一社会信用代码</p>
              <p>{{ detail.code }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>食品许可证</p>
              <p>{{ detail.food_permit }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>其他证件</p>
              <p>{{ detail.other_permit }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="12" style="margin-top: 15px">
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>联系人</p>
              <p>{{ detail.contacts }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>联系电话</p>
              <p v-if="detail.contact_moblies.length">
                {{ detail.contact_moblies.join("、") }}
              </p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>公司地址</p>
              <p>{{ detail.address }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>仓库地址</p>
              <p>{{ detail.warehouse_address }}</p>
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
      <el-divider />
      <el-row :gutter="12">
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>历史订单</p>
              <p>{{ detail.procurement_plan_num }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>最近采购订单</p>
              <p>{{ detail.last_procurement_plan_id }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>最近下单时间</p>
              <p>{{ detail.last_procurement_plan_at }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>交易总金额</p>
              <p>￥{{ detail.trading_price }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>已结金额</p>
              <p>
                ￥{{ detail.settlement_price
                }}<i
                  @click="dialogVisible = true"
                  style="margin-left: 5px; color: #000; cursor: pointer"
                  class="el-icon-edit"
                ></i>
              </p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>待结欠款</p>
              <p>￥{{ detail.settlementing_price }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-divider />
      <h4>供应商品</h4>
      <div class="goods_list">
        <div
          class="goods_item"
          v-for="(item, index) in detail.good_detail"
          :key="index"
        >
          <div class="img_box">
            <img :src="item.image" alt="" />
          </div>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </el-card>

    <el-dialog
      title="修改已结金额"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input v-model="detail.settlement_price" placeholder="请输入已结金额"
        ><template slot="append">元</template></el-input
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPrice">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDetail, updateStatus, editPrice } from "@/api/basic/supplier";
export default {
  data() {
    return {
      detail: {},
      dialogVisible: false,
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      getDetail({
        supplier_id: this.$route.query.id,
      }).then((res) => {
        this.detail = res;
      });
    },
    //修改已结金额
    editPrice() {
      editPrice({
        supplier_id: this.detail.id,
        settlement_price: this.detail.settlement_price,
      }).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
          this.detail.settlementing_price =
            this.detail.trading_price - this.detail.settlement_price;
          this.dialogVisible = false;
        }
      });
    },
    updateStatus() {
      updateStatus({
        supplier_id: this.detail.id,
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
<style scoped>
.goods_list {
  display: flex;
  flex-wrap: wrap;
}
.goods_item {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  margin: 0 20px 20px 0;
}
.goods_item p {
  padding: 15px;
  font-size: 14px;
  color: #666;
}
.img_box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  border-bottom: 1px solid #ddd;
}
.img_box img {
  max-width: 200px;
  max-height: 200px;
}
</style>