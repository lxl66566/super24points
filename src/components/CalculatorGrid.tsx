import { type Component, For, type Accessor } from "solid-js";
import Button from "./Button";
import { allowedOperators, type Operators, type Difficulty } from "../schemas";

// 定义计算器网格组件的属性接口
interface CalculatorGridProps {
  numbers: number[]; // 四个数字
  // 数字按钮点击回调。返回 true 代表数字被使用，返回 false 代表数字被忽略
  numbersEnabled: Accessor<boolean[]>; // 所有数字的可用状态
  onNumberClick: (num: number, index: number) => void; // 数字按钮点击回调
  onOperatorClick: (op: Operators) => void; // 运算符按钮点击回调
  currentOperator: string | null; // 当前选中的运算符
  currentDifficulty: Accessor<Difficulty>; // Add currentDifficulty prop
}

// 计算器网格组件
const CalculatorGrid: Component<CalculatorGridProps> = (props) => {
  return (
    <div class="grid grid-cols-4 gap-4 p-4">
      {/* 数字按钮 */}
      <For each={props.numbers}>
        {(num, i) => (
          <Button
            variant="square"
            onClick={() => {
              props.onNumberClick(num, i());
            }}
            disabled={!props.numbersEnabled()[i()]}
          >
            {props.numbersEnabled()[i()] ? num : ""}
          </Button>
        )}
      </For>
      {/* 运算符按钮 */}
      <For each={allowedOperators(props.currentDifficulty())}>
        {(op) => (
          <Button
            variant="operator"
            onClick={() => props.onOperatorClick(op)}
            disabled={props.currentOperator === op}
            class={props.currentOperator === op ? `border-1 border-white` : ""}
          >
            {op}
          </Button>
        )}
      </For>
    </div>
  );
};

export default CalculatorGrid;
