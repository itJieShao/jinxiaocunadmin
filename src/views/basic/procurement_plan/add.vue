<template>
  <div class="app-container">
    <h2>新增采购计划</h2>
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column width="200" align="center" label="商品编码">
        <template slot-scope="scope">
          <el-select
            @change="goodsChange(scope.row.good_id, scope.$index)"
            @clear="resetSelect"
            v-model="scope.row.good_id"
            filterable
            clearable
            remote
            reserve-keyword
            placeholder="请输入商品编码"
            :remote-method="
              (query) => {
                remoteMethod(query, 1);
              }
            "
          >
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.id"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center" label="商品名称">
        <template slot-scope="scope">
          <el-select
            @change="goodsChange(scope.row.good_id, scope.$index)"
            @clear="resetSelect"
            v-model="scope.row.good_id"
            filterable
            clearable
            remote
            reserve-keyword
            placeholder="请输入商品名称"
            :remote-method="
              (query) => {
                remoteMethod(query, 2);
              }
            "
          >
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center" label="采购途径">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.way"
            placeholder="请输入采购途径"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center" label="供应商">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.supplier_id"
            filterable
            placeholder="请选择供应商"
          >
            <el-option
              v-for="item in supplierList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column width="140" align="center" label="单位">
        <template slot-scope="scope">
          <span>{{ scope.row.unit_name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center" label="计划采购数量">
        <template slot-scope="scope">
          <el-input
            @input="totalBeforeTaxInput(scope.$index)"
            v-model="scope.row.num"
            placeholder="请输入计划采购数量"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column width="160" align="center" label="单价">
        <template slot-scope="scope">
          <el-input
            @input="totalBeforeTaxInput(scope.$index)"
            v-model="scope.row.unit_price"
            placeholder="请输入"
          >
            <template slot="append">元</template>
          </el-input>
        </template>
      </el-table-column>
      <el-table-column width="160" align="center" label="运费">
        <template slot-scope="scope">
          <el-input
            @input="totalAmountPayable(scope.row.freight, scope.$index)"
            v-model="scope.row.freight"
            placeholder="请输入"
          >
            <template slot="append">元</template>
          </el-input>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center" label="税前总额">
        <template slot-scope="scope">
          <span v-show="scope.row.num && scope.row.unit_price">{{
            scope.row.total_before_tax
          }}</span>
        </template>
      </el-table-column>
      <el-table-column width="160" align="center" label="税率">
        <template slot-scope="scope">
          <el-input
            @input="taxAmountInput(scope.row.tax_rate, scope.$index)"
            v-model="scope.row.tax_rate"
            placeholder="请输入"
          >
            <template slot="append">%</template>
          </el-input>
        </template>
      </el-table-column>
      <el-table-column width="140" align="center" label="税额">
        <template slot-scope="scope">
          <span v-show="scope.row.total_before_tax && scope.row.tax_rate">{{
            scope.row.tax_amount
          }}</span>
        </template>
      </el-table-column>
      <el-table-column width="140" align="center" label="税后总额">
        <template slot-scope="scope">
          <span v-show="scope.row.total_before_tax && scope.row.tax_amount">{{
            scope.row.total_after_tax
          }}</span>
        </template>
      </el-table-column>
      <el-table-column width="140" align="center" label="应付总额">
        <template slot-scope="scope">
          <span
            v-show="
              scope.row.total_after_tax &&
              scope.row.freight &&
              scope.row.tax_amount
            "
            >{{ scope.row.total_amount_payable }}</span
          >
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" class="row-bg" justify="end" style="margin-top: 20px">
      <el-button type="primary" @click="onSubmit">提交采购计划</el-button>
    </el-row>
  </div>
</template>
<script>
import { addApi } from "@/api/basic/procurement_plan";
import { getGoodsList } from "@/api/basic/goods";
import { supplierData } from "@/api/main";
import Pagination from "@/components/Pagination";
import { List } from "echarts";
export default {
  data() {
    return {
      list: [],
      goodsList: [],
      goodsListData: {
        name: "",
        page: 1,
        page_size: 40,
      },
      loadmoreFlag: true,
      supplierList: [],
    };
  },
  components: { Pagination },
  created() {
    for (let i = 0; i < 10; i++) {
      this.list.push({});
    }
    this.getGoodsList();
    this.getSupplierList();
  },
  methods: {
    loadmore(e) {
      if (this.loadmoreFlag) {
        ++this.goodsListData.page;
        this.getGoodsList();
      }
    },
    getGoodsList() {
      getGoodsList(this.goodsListData).then((res) => {
        if (res.list.length < 40) {
          this.loadmoreFlag = false;
        }
        this.total = res.count;
        this.goodsList = this.goodsList.concat(res.list);
      });
    },
    goodsChange(id, index) {
      if (id) {
        this.$set(
          this.list[index],
          "unit_name",
          this.goodsList.find((i) => i.id == id).unit_name
        );
      }
    },
    remoteMethod(query, type) {
      if (query !== "") {
        this.goodsList = [];
        if (type == 1) {
          this.goodsListData.id = query;
          this.goodsListData.name = "";
        } else {
          this.goodsListData.id = "";
          this.goodsListData.name = query;
        }
        this.goodsListData.page = 1;
        this.getGoodsList();
      }
    },
    resetSelect() {
      this.goodsList = [];
      this.goodsListData.id = "";
      this.goodsListData.name = "";
      this.goodsListData.page = 1;
      this.getGoodsList();
    },
    //供应商列表
    getSupplierList() {
      supplierData().then((res) => {
        this.supplierList = res;
      });
    },
    totalBeforeTaxInput(index) {
      this.$set(
        this.list[index],
        "total_before_tax",
        this.list[index].num * this.list[index].unit_price
      );
      this.$set(
        this.list[index],
        "total_after_tax",
        this.list[index].total_before_tax + this.list[index].tax_amount
      );
      this.$set(
        this.list[index],
        "tax_amount",
        (this.list[index].total_before_tax * this.list[index].tax_rate) / 100
      );
      this.$set(
        this.list[index],
        "total_after_tax",
        this.list[index].total_before_tax + this.list[index].tax_amount
      );
      this.$set(
        this.list[index],
        "total_amount_payable",
        this.list[index].total_after_tax + Number(this.list[index].freight)
      );
    },
    taxAmountInput(val, index) {
      this.$set(
        this.list[index],
        "tax_amount",
        (this.list[index].total_before_tax * val) / 100
      );
      this.$set(
        this.list[index],
        "total_after_tax",
        this.list[index].total_before_tax + this.list[index].tax_amount
      );
      this.$set(
        this.list[index],
        "total_amount_payable",
        this.list[index].total_after_tax + Number(this.list[index].freight)
      );
    },
    totalAmountPayable(val, index) {
      this.$set(
        this.list[index],
        "total_amount_payable",
        this.list[index].total_after_tax + Number(val)
      );
    },
    //提交
    onSubmit() {
      let list = [];
      this.list.forEach((item) => {
        if (item.good_id) {
          list.push(item);
        }
      });
      addApi({ procurement_data: JSON.stringify(list) }).then((res) => {
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