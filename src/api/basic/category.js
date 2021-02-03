import request from '@/utils/request'

//单位列表
export function getUnitList(data) {
    return request({
        url: '/food/get/unit-list',
        method: 'post',
        data
    })
}

//添加/编辑单位
export function saveUnit(data) {
    return request({
        url: '/food/update/unit',
        method: 'post',
        data
    })
}

//标签列表
export function getLabelList(data) {
    return request({
        url: '/food/get/label-list',
        method: 'post',
        data
    })
}

//新增/编辑标签
export function saveLabel(data) {
    return request({
        url: '/food/update/label',
        method: 'post',
        data
    })
}
