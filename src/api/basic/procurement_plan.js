import request from '@/utils/request'

//列表
export function getList(data) {
    return request({
        url: '/erp/procurement-plan/list',
        method: 'post',
        data
    })
}

//详情
export function getDetail(data) {
    return request({
        url: '/erp/procurement-plan/detail',
        method: 'post',
        data
    })
}

//设置采购人员
export function setProcurementer(data) {
    return request({
        url: '/erp/procurement-plan/set-procurementer',
        method: 'post',
        data
    })
}

//设置采购状态
export function setStatus(data) {
    return request({
        url: '/erp/procurement-plan/set-status',
        method: 'post',
        data
    })
}

//新增采购计划
export function addApi(data) {
    return request({
        url: '/erp/procurement-plan/add',
        method: 'post',
        data
    })
}

//采购调整
export function setApi(data) {
    return request({
        url: '/erp/procurement-plan/set',
        method: 'post',
        data
    })
}