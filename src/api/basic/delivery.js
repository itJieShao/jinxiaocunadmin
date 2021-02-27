import request from '@/utils/request'

//列表
export function getList(data) {
    return request({
        url: '/erp/out-store/list',
        method: 'post',
        data
    })
}

//详情
export function getDetail(data) {
    return request({
        url: '/erp/out-store/detail',
        method: 'post',
        data
    })
}

//获取可出库商品
export function canOutStoreList(data) {
    return request({
        url: '/erp/out-store/get-can-out-store_data',
        method: 'post',
        data
    })
}

//新增
export function addApi(data) {
    return request({
        url: '/erp/out-store/add',
        method: 'post',
        data
    })
}