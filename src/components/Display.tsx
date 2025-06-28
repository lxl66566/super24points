import type { Component } from "solid-js";

// 定义显示组件的属性接口
interface DisplayProps {
  value: string; // 要显示的值
}

// 显示组件
const Display: Component<DisplayProps> = (props) => {
  return (
    <div class="overflow-hidden whitespace-nowrap rounded-lg p-4 text-right text-4xl text-white">
      {props.value}
    </div>
  );
};

export default Display;
