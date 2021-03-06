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

//审核接口
export function audit(data) {
  return request({
      url: '/other/audit/audit',
      method: 'post',
      data
  })
}

//获取启用的仓库
export function getStoreData(data) {
  return request({
      url: '/erp/store/get-list',
      method: 'post',
      data
  })
}