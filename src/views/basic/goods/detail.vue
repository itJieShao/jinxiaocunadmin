<template>
  <div class="app-container">
    <h2>商品详情</h2>
    <el-card shadow="always">
      <el-form label-width="100px">
        <el-form-item label="商品名称：">
          <p>{{ detail.name }}</p>
        </el-form-item>
        <el-form-item label="商品图片：">
          <div class="imgs_box">
            <img v-for="item in detail.images" :src="item" alt="" />
          </div>
        </el-form-item>
      </el-form>
      <el-divider />
      <h4>商品信息</h4>
      <el-row :gutter="12">
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>商品ID</p>
              <p>{{ detail.id }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>总库存</p>
              <p>{{ detail.good_num }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>分类</p>
              <p>{{ detail.category_name }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>品牌</p>
              <p>{{ detail.brand }}</p>
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
              <p>单位</p>
              <p>{{ detail.unit_name }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="12" style="margin-top: 15px">
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>规格</p>
              <p>{{ detail.specification }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>成本预警价</p>
              <p>{{ detail.warn_cost_price }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="always">
            <div class="item_flex">
              <p>供应商</p>
              <p v-if="detail.supplier_name.length">{{ detail.supplier_name.join('、') }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>创建时间</p>
              <p>{{ detail.created_at }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-divider />
      <h4>库存情况</h4>
      <el-row
        v-for="(item, index) in detail.store_detail"
        :key="index"
        :gutter="12"
        style="margin-bottom: 15px"
      >
        <el-col :span="8">
          <el-card shadow="always">
            <div class="item_flex">
              <p>存储仓库</p>
              <p>{{ item.store_name }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">
            <div class="item_flex">
              <p>可用库存</p>
              <p>{{ item.num }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">
            <div class="item_flex">
              <p>出库中数量</p>
              <p>{{ item.in_store_num }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-divider />
      <el-row :gutter="12">
        <el-col :span="6">
          <el-card shadow="always">
            <div class="item_flex">
              <p>最近一次采购</p>
              <p>{{ detail.last_procurement_plan_id	 }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="always">
            <div class="item_flex">
              <p>最近一次采购价</p>
              <p>{{ detail.last_procurement_price }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="always">
            <div class="item_flex">
              <p>最近采购供应商</p>
              <p>{{ detail.last_procurement_supplier_name }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="always">
            <div class="item_flex">
              <p>时间</p>
              <p>{{ detail.last_procurement_at }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="12" style="margin-top: 15px">
        <el-col :span="8">
          <el-card shadow="always">
            <div class="item_flex">
              <p>最近一次入库</p>
              <p>{{ detail.last_in_store_id }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">
            <div class="item_flex">
              <p>最近一次入库数量</p>
              <p>{{ detail.last_in_store_num }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">
            <div class="item_flex">
              <p>时间</p>
              <p>{{ detail.last_in_store_at }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="12" style="margin-top: 15px">
        <el-col :span="8">
          <el-card shadow="always">
            <div class="item_flex">
              <p>最近一次出库</p>
              <p>{{ detail.last_out_store_id }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">
            <div class="item_flex">
              <p>最近一次出库数量</p>
              <p>{{ detail.last_out_store_num }}</p>
            </div>
          </el-card>
        </el-col>
        <!-- <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>最近出库部门</p>
              <p>{{ detail.procurement_user_name }}</p>
            </div>
          </el-card>
        </el-col> -->
        <el-col :span="8">
          <el-card shadow="always">
            <div class="item_flex">
              <p>时间</p>
              <p>{{ detail.last_out_store_at }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getGoodsDetail } from "@/api/basic/goods";
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
      getGoodsDetail({
        good_id: this.$route.query.id,
      }).then((res) => {
        this.detail = res;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.imgs_box {
  display: flex;
  flex-wrap: wrap;
  img {
    width: 200px;
    height: 200px;
    margin: 0 20px 20px 0;
  }
}
</style>