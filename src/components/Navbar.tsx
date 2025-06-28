import { type Component, For } from "solid-js";
import Button from "./Button";

// 定义菜单项的类型
interface MenuItem {
  label: string;
  action?: () => void; // 点击时的回调函数
}

// 定义导航栏组件的属性接口
interface NavbarProps {
  onNewGame: () => void;
  onHelp: () => void;
  onDifficultyChange: (
    difficulty: "easy" | "normal" | "hard" | "lunatic",
  ) => void;
  onCheat: () => void;
  currentDifficulty: "easy" | "normal" | "hard" | "lunatic"; // 当前难度
}

// 导航栏组件
const Navbar: Component<NavbarProps> = (props) => {
  // 菜单数据
  const menuItems: MenuItem[] = [
    { label: "New Game", action: props.onNewGame },
    { label: "Help", action: props.onHelp },
    { label: "Cheat", action: props.onCheat },
  ];

  const difficulties = ["easy", "normal", "hard", "lunatic"];

  return (
    <nav class="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-gray-900 p-4 text-white shadow-lg">
      <h1 class="mr-4 min-w-1 overflow-hidden text-2xl font-bold">
        Super24Points
      </h1>
      <For each={menuItems}>
        {(item) => (
          <Button
            variant="secondary"
            onClick={() => item.action && item.action()}
            class="px-4 py-2 text-lg"
          >
            {item.label}
          </Button>
        )}
      </For>
      <div class="relative">
        <select
          value={props.currentDifficulty}
          onChange={(e) =>
            props.onDifficultyChange(
              e.currentTarget.value as "easy" | "normal" | "hard" | "lunatic",
            )
          }
          class="block appearance-none rounded-lg rounded-md border border-gray-700 bg-gray-800 px-4 py-2 pr-8 text-lg text-white shadow-xl hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <For each={difficulties}>
            {(difficulty) => (
              <option value={difficulty}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            )}
          </For>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
          <svg
            class="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
