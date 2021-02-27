import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/basic',
  },
  {
    path: '/basic',
    component: Layout,
    redirect: '/basic/procurement_plan',
    meta: { title: '进销存管理', icon: 'el-icon-menu' },
    children: [{
      path: 'procurement_plan',
      name: 'ProcurementPlan',
      component: () => import('@/views/basic/procurement_plan/index'),
      meta: { title: '采购计划管理', icon: 'dashboard' }
    },
    {
      path: 'procurement_plan_add',
      name: 'procurementPlanAdd',
      hidden: true,
      component: () => import('@/views/basic/procurement_plan/add'),
      meta: { title: '新增采购计划', activeMenu: '/basic/procurement_plan' }
    },
    {
      path: 'procurement_plan_detail',
      name: 'PreinstallItemDetail',
      hidden: true,
      component: () => import('@/views/basic/procurement_plan/detail'),
      meta: { title: '采购计划详情', activeMenu: '/basic/procurement_plan' }
    },
    {
      path: 'charge_back',
      name: 'ChargeBack',
      component: () => import('@/views/basic/charge_back'),
      meta: { title: '退单管理', icon: 'dashboard', auth: "charge_back_list" }
    },
    {
      path: 'charge_back_add',
      name: 'ChargeBackAdd',
      hidden: true,
      component: () => import('@/views/basic/charge_back/add'),
      meta: { title: '新增退单', activeMenu: '/basic/charge_back' }
    },
    {
      path: 'charge_back_detail',
      name: 'ChargeBackDetail',
      hidden: true,
      component: () => import('@/views/basic/charge_back/detail'),
      meta: { title: '退单详情', activeMenu: '/basic/charge_back' }
    },
    {
      path: 'warehousing',
      name: 'Warehousing',
      component: () => import('@/views/basic/warehousing'),
      meta: { title: '入库管理', icon: 'dashboard' }
    },
    {
      path: 'warehousing_add',
      name: 'WarehousingAdd',
      hidden: true,
      component: () => import('@/views/basic/warehousing/add'),
      meta: { title: '新增入库单', activeMenu: '/basic/warehousing' }
    },
    {
      path: 'warehousing_detail',
      name: 'WarehousingDetail',
      hidden: true,
      component: () => import('@/views/basic/warehousing/detail'),
      meta: { title: '入库单详情', activeMenu: '/basic/warehousing' }
    },
    {
      path: 'delivery',
      name: 'Delivery',
      component: () => import('@/views/basic/delivery'),
      meta: { title: '出库管理', icon: 'dashboard' }
    },
    {
      path: 'delivery_add',
      name: 'DeliveryAdd',
      hidden: true,
      component: () => import('@/views/basic/delivery/add'),
      meta: { title: '新增出库单', activeMenu: '/basic/delivery' }
    },
    {
      path: 'delivery_detail',
      name: 'DeliveryDetail',
      hidden: true,
      component: () => import('@/views/basic/delivery/detail'),
      meta: { title: '出库单详情', activeMenu: '/basic/delivery' }
    },
    {
      path: 'supplier',
      name: 'Supplier',
      component: () => import('@/views/basic/supplier'),
      meta: { title: '供应商管理', icon: 'dashboard' }
    },
    {
      path: 'supplier_add',
      name: 'SupplierAdd',
      hidden: true,
      component: () => import('@/views/basic/supplier/edit'),
      meta: { title: '新增供应商', activeMenu: '/basic/supplier' }
    },
    {
      path: 'supplier_edit',
      name: 'SupplierEdit',
      hidden: true,
      component: () => import('@/views/basic/supplier/edit'),
      meta: { title: '编辑供应商', activeMenu: '/basic/supplier' }
    },
    {
      path: 'supplier_detail',
      name: 'SupplierDetail',
      hidden: true,
      component: () => import('@/views/basic/supplier/detail'),
      meta: { title: '供应商详情', activeMenu: '/basic/supplier' }
    },
    {
      path: 'warehouse',
      name: 'Warehouse',
      component: () => import('@/views/basic/warehouse'),
      meta: { title: '仓库管理', icon: 'dashboard' }
    },
    {
      path: 'warehouse_add',
      name: 'WarehouseAdd',
      hidden: true,
      component: () => import('@/views/basic/warehouse/edit'),
      meta: { title: '新增仓库', activeMenu: '/basic/warehouse' }
    },
    {
      path: 'warehouse_Edit',
      name: 'warehouseEdit',
      hidden: true,
      component: () => import('@/views/basic/warehouse/edit'),
      meta: { title: '编辑仓库', activeMenu: '/basic/warehouse' }
    },
    {
      path: 'warehouse_detail',
      name: 'WarehouseDetail',
      hidden: true,
      component: () => import('@/views/basic/warehouse/detail'),
      meta: { title: '仓库详情', activeMenu: '/basic/warehouse' }
    },
    {
      path: 'goods',
      name: 'Goods',
      component: () => import('@/views/basic/goods'),
      meta: { title: '商品管理', icon: 'dashboard' }
    },
    {
      path: 'goods_add',
      name: 'GoodsAdd',
      hidden: true,
      component: () => import('@/views/basic/goods/edit'),
      meta: { title: '新增商品', activeMenu: '/basic/goods' }
    },
    {
      path: 'goods_Edit',
      name: 'GoodsEdit',
      hidden: true,
      component: () => import('@/views/basic/goods/edit'),
      meta: { title: '编辑商品', activeMenu: '/basic/goods' }
    },
    {
      path: 'goods_detail',
      name: 'GoodsDetail',
      hidden: true,
      component: () => import('@/views/basic/goods/detail'),
      meta: { title: '商品详情', activeMenu: '/basic/goods' }
    },
   ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
