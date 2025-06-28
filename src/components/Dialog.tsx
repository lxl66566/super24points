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
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
        onClick={props.onClose} // 点击遮罩区域关闭
      >
        <div
          class="flex max-h-[80vh] w-full max-w-lg flex-col rounded-lg bg-gray-900 p-6 shadow-xl" // 限制高度，flex-col 布局
          onClick={(e) => e.stopPropagation()} // 阻止事件冒泡，防止点击对话框内部关闭
        >
          <div class="mb-4 flex flex-shrink-0 items-center justify-between border-b border-gray-700 pb-2">
            {" "}
            {/* flex-shrink-0 确保标题不被压缩 */}
            <h2 class="text-2xl font-bold text-white">{props.title}</h2>
            <button
              onClick={props.onClose}
              class="text-3xl font-light text-gray-400 hover:text-white"
            >
              &times;
            </button>
          </div>
          <div class="flex-grow overflow-y-auto text-gray-300">
            {props.children}
          </div>{" "}
          {/* flex-grow 确保内容区域填充剩余空间并可滚动 */}
        </div>
      </div>
    </Show>
  );
};

export default Dialog;
