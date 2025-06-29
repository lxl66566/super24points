import type { Accessor, Component } from "solid-js";
import Button from "./Button";

// 定义寄存器组件的属性接口
interface RegisterProps {
  registerValue: Accessor<number | null>; // 寄存器中存储的值
  currentDisplay: Accessor<number | null>; // 当前显示的值（可能为空）
  onStore: () => void; // 存储到寄存器的回调
  onRecall: () => void; // 从寄存器召回的回调
  onClear: () => void; // 清零寄存器的回调
}

// 寄存器组件
const Register: Component<RegisterProps> = (props) => {
  return (
    <div class="flex items-center space-x-2 rounded-lg bg-gray-800 p-2">
      {/* 召回按钮 (寄存器) */}
      <Button
        onClick={
          props.registerValue() !== null ? props.onRecall : props.onStore
        }
        variant="square"
        disabled={
          props.registerValue() === null && props.currentDisplay() === null
        }
      >
        {props.registerValue() ?? (props.currentDisplay() !== null ? "<-" : "")}
      </Button>
      {/* 当前数值显示区域 */}
      <div class="flex h-12 min-w-0 flex-grow items-center justify-center rounded-lg bg-gray-700 px-4 text-xl text-white">
        <div class="overflow-hidden text-ellipsis whitespace-nowrap rounded-lg p-4 text-right text-4xl text-white">
          {props.currentDisplay() ?? ""}
        </div>
      </div>
      {/* 清零按钮 */}
      <Button onClick={props.onClear} class="h-12 w-20 min-w-10 !p-0 text-lg">
        Clear
      </Button>
    </div>
  );
};

export default Register;
