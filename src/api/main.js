import request from '@/utils/request'

//获取标签
export function labelList(data) {
  return request({
    url: '/erp/label/get-list',
    method: 'post',
    data
  })
}

//获取标签
export function userData(data) {
  return request({
    url: '/admin/admin/get-user-data',
    method: 'post',
    data
  })
}

//获取供应商列表（下拉框用到）
export function supplierData(data) {
  return request({
    url: '/erp/supplier/get-list',
    method: 'post',
    data
  })
}