import type { Component } from "solid-js";
import Button from "./Button";
import Display from "./Display";

// 定义寄存器组件的属性接口
interface RegisterProps {
  registerValue: string; // 寄存器中存储的值
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
        variant="secondary"
        onClick={props.onRecall}
        class="h-12 w-24 text-lg"
      >
        寄存器
      </Button>
      {/* 存储按钮 (<-- 箭头) */}
      <Button
        variant="secondary"
        onClick={props.onStore}
        class="h-12 w-16 text-lg"
      >
        {"<--"}
      </Button>
      {/* 当前数值显示区域 */}
      <div class="flex h-12 flex-grow items-center justify-center rounded-lg bg-gray-700 px-4 text-xl text-white">
        <Display value={props.registerValue} />
      </div>
      {/* 清零按钮 */}
      <Button
        variant="secondary"
        onClick={props.onClear}
        class="h-12 w-16 text-lg"
      >
        清零
      </Button>
    </div>
  );
};

export default Register;
