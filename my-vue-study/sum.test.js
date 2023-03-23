const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  // expect 和 toBe来测试两值是否相等
  expect(sum(1,2)).toBe(3);
})