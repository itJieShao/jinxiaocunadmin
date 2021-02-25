import request from '@/utils/request'

//列表
export function getList(data) {
    return request({
        url: '/erp/supplier/list',
        method: 'post',
        data
    })
}

//详情
export function getDetail(data) {
    return request({
        url: '/erp/supplier/detail',
        method: 'post',
        data
    })
}

//新增/编辑
export function saveApi(data) {
    return request({
        url: '/erp/supplier/update',
        method: 'post',
        data
    })
}

//启用/禁用
export function updateStatus(data) {
    return request({
        url: '/erp/supplier/update-status',
        method: 'post',
        data
    })
}

//修改已结金额
export function editPrice(data) {
    return request({
        url: '/erp/supplier/update-settlement-price',
        method: 'post',
        data
    })
}