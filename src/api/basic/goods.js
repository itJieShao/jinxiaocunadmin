import request from '@/utils/request'

//列表
export function getGoodsList(data) {
    return request({
        url: '/erp/good/list',
        method: 'post',
        data
    })
}

//详情
export function getGoodsDetail(data) {
    return request({
        url: '/erp/good/detail',
        method: 'post',
        data
    })
}

//新增/编辑
export function saveGoods(data) {
    return request({
        url: '/erp/good/update',
        method: 'post',
        data
    })
}