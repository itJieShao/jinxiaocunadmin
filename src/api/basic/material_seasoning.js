import request from '@/utils/request'

//材料/调料/包装列表
export function getList(data) {
  return request({
    url: '/food/get/materials-list',
    method: 'post',
    data
  })
}

//添加/编辑材料/调料/包装
export function saveApi(data) {
  return request({
    url: '/food/update/materials',
    method: 'post',
    data
  })
}

//材料/调料/包装详情
export function detailApi(data) {
  return request({
    url: '/food/materials/details',
    method: 'post',
    data
  })
}

//单位列表(下拉框）
export function unitList(data) {
  return request({
    url: '/food/get-pull-down/unit-list',
    method: 'post',
    data
  })
}

//标签列表（下拉框）
export function labelList(data) {
  return request({
    url: '/food/get-pull-down/label-list',
    method: 'post',
    data
  })
}
