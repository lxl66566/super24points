import { type Component, type JSX, splitProps } from "solid-js";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element;
  variant?: "primary" | "secondary" | "square" | "operator";
  class?: string;
}

const Button: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ["children", "variant", "class"]);

  const getVariantClasses = () => {
    const baseClasses =
      local.variant === "square"
        ? "btn btn-square"
        : local.variant === "operator"
          ? "btn btn-operator"
          : "btn";

    // 如果是禁用状态，返回基础类（不带hover）
    if (rest.disabled) {
      return `${baseClasses} !hover:bg-gray-700`;
    }

    // 非禁用状态，添加hover类
    switch (local.variant) {
      case "primary":
        return `${baseClasses} bg-blue-600 hover:bg-blue-700`;
      case "secondary":
        return `${baseClasses} bg-gray-500 hover:bg-gray-600`;
      default:
        return baseClasses;
    }
  };

  return (
    <button class={`${getVariantClasses()} ${local.class || ""}`} {...rest}>
      {local.children}
    </button>
  );
};

export default Button;
