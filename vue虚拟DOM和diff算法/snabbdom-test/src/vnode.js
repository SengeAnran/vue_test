/**
 *  函数的功能非常简单，就是把传入的5个参数组合成对象返回
 * @param sel
 * @param data
 * @param children
 * @param text
 * @param elm
 * @returns {{data, children, elm, sel, text}}
 */
export default function (sel, data, children, text, elm) {
  const key = data.key
  return {
    sel, data, children, text, elm, key
  }
}