import request from '@/utils/request'

//列表
export function getList(data) {
    return request({
        url: '/erp/in-store/list',
        method: 'post',
        data
    })
}

//详情
export function getDetail(data) {
    return request({
        url: '/erp/in-store/detail',
        method: 'post',
        data
    })
}

//获取可以入库的采购计划
export function canInStoreList(data) {
    return request({
        url: '/erp/procurement-plan/get-can-in-store-data',
        method: 'post',
        data
    })
}

//新增入库
export function addApi(data) {
    return request({
        url: '/erp/in-store/add',
        method: 'post',
        data
    })
}

//调整入库
export function setApi(data) {
    return request({
        url: '/erp/in-store/set',
        method: 'post',
        data
    })
}