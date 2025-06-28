import { Show, type Component, type JSXElement } from "solid-js";

// 定义对话框组件的属性接口
interface DialogProps {
  isOpen: boolean; // 控制对话框的可见性
  onClose: () => void; // 关闭对话框的回调
  title: string; // 对话框标题
  children: JSXElement; // 对话框内容
}

// 对话框组件
const Dialog: Component<DialogProps> = (props) => {
  return (
    <Show when={props.isOpen}>
      {" "}
      {/* SolidJS 的 Show 组件用于条件渲染 */}
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
        <div class="w-full max-w-lg rounded-lg bg-gray-900 p-6 shadow-xl">
          <div class="mb-4 flex items-center justify-between border-b border-gray-700 pb-2">
            <h2 class="text-2xl font-bold text-white">{props.title}</h2>
            <button
              onClick={props.onClose}
              class="text-3xl font-light text-gray-400 hover:text-white"
            >
              &times;
            </button>
          </div>
          <div class="text-gray-300">{props.children}</div>
        </div>
      </div>
    </Show>
  );
};

export default Dialog;
