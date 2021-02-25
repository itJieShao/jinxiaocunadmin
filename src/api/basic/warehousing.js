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