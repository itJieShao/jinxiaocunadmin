import request from '@/utils/request'

//预设单品列表
export function getList(data) {
  return request({
    url: '/food/get/product-list',
    method: 'post',
    data
  })
}

//新增预设单品
export function addApi(data) {
  return request({
    url: '/food/update/product',
    method: 'post',
    data
  })
}

//（添加配方）获取材料/调料下拉框
export function getMaterialsData(data) {
  return request({
    url: '/food/get/materials',
    method: 'post',
    data
  })
}

//预设单品详情
export function detailApi(data) {
  return request({
    url: '/food/product/details',
    method: 'post',
    data
  })
}

//配方列表
export function formulaList(data) {
  return request({
    url: '/food/get/formula-list',
    method: 'post',
    data
  })
}

//配方详情
export function formulaDetail(data) {
  return request({
    url: '/food/formula/details',
    method: 'post',
    data
  })
}

//新增/编辑配方
export function saveFormula(data) {
  return request({
    url: '/food/update/formula',
    method: 'post',
    data
  })
}

//设备列表（下拉框）
export function deviceList(data) {
  return request({
    url: '/food/get-pull-down/device-list',
    method: 'post',
    data
  })
}

//设备单元格列表（下拉框）
export function cellList(data) {
  return request({
    url: '/food/get-pull-down/cell-list',
    method: 'post',
    data
  })
}

//添加/编辑实验
export function saveTest(data) {
  return request({
    url: '/food/update/test',
    method: 'post',
    data
  })
}

//获取实验列表
export function testList(data) {
  return request({
    url: '/food/get/test-list',
    method: 'post',
    data
  })
}
