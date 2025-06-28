import { type Component, For } from "solid-js";
import Button from "./Button";

// 定义计算器网格组件的属性接口
interface CalculatorGridProps {
  numbers: number[]; // 四个数字
  onNumberClick: (num: number) => void; // 数字按钮点击回调
  onOperatorClick: (op: string) => void; // 运算符按钮点击回调
}

// 计算器网格组件
const CalculatorGrid: Component<CalculatorGridProps> = (props) => {
  // 运算符列表
  const operators = ["+", "-", "*", "/", "^", "&", "|"];

  return (
    <div class="grid grid-cols-4 gap-4 p-4">
      {/* 数字按钮 */}
      <For each={props.numbers}>
        {(num) => (
          <Button variant="square" onClick={() => props.onNumberClick(num)}>
            {num}
          </Button>
        )}
      </For>
      {/* 运算符按钮 */}
      <For each={operators}>
        {(op) => (
          <Button variant="operator" onClick={() => props.onOperatorClick(op)}>
            {op}
          </Button>
        )}
      </For>
    </div>
  );
};

export default CalculatorGrid;
