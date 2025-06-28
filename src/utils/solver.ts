import { type Difficulty, OperatorsFunc, allowedOperators } from "../schemas";

/**
 * 计算 24 点的答案。
 *
 * @param numbers - 包含四个数字的数组。
 * @param difficulty - 游戏难度，决定了可用的运算符。
 * @param target - 目标数字，默认为 24。
 * @returns 返回所有可能解的字符串数组。
 */
export function calculate(
  numbers: number[],
  difficulty: Difficulty,
  target: number = 24,
): string[] {
  // 使用 Set 来自动处理重复的解
  const solutions = new Set<string>();
  const operators = allowedOperators(difficulty);
  const EPSILON = 1e-6; // 用于处理浮点数精度问题

  // Item 结构用于在递归中同时携带计算值和表达式字符串
  type Item = {
    value: number;
    expr: string;
  };

  // 将初始数字转换为 Item 数组
  const initialItems: Item[] = numbers.map((n) => ({
    value: n,
    expr: n.toString(),
  }));

  /**
   * 递归求解函数
   * @param items - 当前剩余的数字（及其表达式）列表
   */
  function solve(items: Item[]) {
    // 基本情况：如果只剩下一个数，检查它是否是目标值
    if (items.length === 1) {
      if (Math.abs(items[0].value - target) < EPSILON) {
        // 找到了一个解，将其添加到 Set 中
        solutions.add(items[0].expr);
      }
      return;
    }

    // 递归步骤：从列表中任选两个数进行运算
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const item1 = items[i];
        const item2 = items[j];

        // 创建一个不包含 item1 和 item2 的新列表
        const remainingItems = items.filter(
          (_, index) => index !== i && index !== j,
        );

        // 遍历所有可用的运算符
        for (const op of operators) {
          const opFunc = OperatorsFunc[op];

          // 尝试 a op b
          // 剪枝：避免除以零
          if (op === "/" && Math.abs(item2.value) < EPSILON) {
            // continue; // 跳过此次循环
          } else {
            const newValue = opFunc(item1.value, item2.value);
            // 检查结果是否是有效数字（避免 NaN, Infinity）
            if (isFinite(newValue)) {
              const newExpr = `(${item1.expr} ${op} ${item2.expr})`;
              solve([...remainingItems, { value: newValue, expr: newExpr }]);
            }
          }

          // 对于非交换律运算符（- 和 /），需要尝试 b op a
          // + 和 * 是交换律的，a+b=b+a，所以不需要交换计算来避免重复
          if (op === "-" || op === "/" || op === "**") {
            // 剪枝：避免除以零
            if (op === "/" && Math.abs(item1.value) < EPSILON) {
              continue;
            } else {
              const newValue = opFunc(item2.value, item1.value);
              if (isFinite(newValue)) {
                const newExpr = `(${item2.expr} ${op} ${item1.expr})`;
                solve([...remainingItems, { value: newValue, expr: newExpr }]);
              }
            }
          }
        }
      }
    }
  }

  solve(initialItems);

  // 将 Set 转换为数组并返回
  return Array.from(solutions);
}
