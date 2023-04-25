/**
 * 给obj对象添加属性名为key、值为value的是否可枚举的属性
 * @param obj 对象
 * @param key 属性名称
 * @param value 属性值
 * @param enumerable 是否可枚举，默认否
 */
export const def = function (obj,key, value, enumerable = false) {
  Object.defineProperty(obj,key, {
    value,
    enumerable,
    writable: true,
    configurable: true,
  })
}