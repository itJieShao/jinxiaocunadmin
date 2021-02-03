import request from '@/utils/request'

//试验台列表
export function getList(data) {
  return request({
    url: '/food/get/bedstand-list',
    method: 'post',
    data
  })
}
