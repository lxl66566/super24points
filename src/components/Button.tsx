import type { Component, JSX } from "solid-js";

// 定义按钮组件的属性接口
interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element; // 按钮内容
  variant?: "primary" | "secondary" | "square" | "operator"; // 按钮变体，用于不同样式
}

// 按钮组件
const Button: Component<ButtonProps> = (props) => {
  const { children, variant, class: customClass, ...rest } = props;

  // 根据 variant 应用不同的 Tailwind CSS 类
  const getVariantClasses = () => {
    switch (variant) {
      case "square":
        return "btn btn-square"; // 数字按钮的样式
      case "operator":
        return "btn btn-operator"; // 运算符按钮的样式
      case "primary":
        return "btn bg-blue-600 hover:bg-blue-700"; // 主要操作按钮
      case "secondary":
        return "btn bg-gray-500 hover:bg-gray-600"; // 次要操作按钮
      default:
        return "btn"; // 默认按钮样式
    }
  };

  return (
    <button class={`${getVariantClasses()} ${customClass || ""}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
