import { type Component, createSignal, For, Show } from "solid-js";
import Button from "./Button";

// 定义菜单项的类型
interface MenuItem {
  label: string;
  action?: () => void; // 点击时的回调函数
  submenu?: MenuItem[]; // 子菜单项
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
  const [isDifficultyOpen, setIsDifficultyOpen] = createSignal(false); // 控制难度子菜单的显示

  // 菜单数据
  const menuItems: MenuItem[] = [
    { label: "新游戏", action: props.onNewGame },
    { label: "帮助", action: props.onHelp },
    {
      label: "难度",
      submenu: [
        { label: "简单", action: () => props.onDifficultyChange("easy") },
        { label: "普通", action: () => props.onDifficultyChange("normal") },
        { label: "困难", action: () => props.onDifficultyChange("hard") },
        { label: "疯狂", action: () => props.onDifficultyChange("lunatic") },
      ],
    },
    { label: "作弊", action: props.onCheat },
  ];

  return (
    <nav class="relative z-10 flex items-center bg-gray-900 p-4 text-white shadow-lg">
      <h1 class="mr-8 text-2xl font-bold">超级24点</h1>
      <div class="flex space-x-4">
        <For each={menuItems}>
          {(item) => (
            <div class="relative">
              <Button
                variant="secondary"
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else if (item.label === "难度") {
                    setIsDifficultyOpen(!isDifficultyOpen()); // 切换难度子菜单可见性
                  }
                }}
                class="px-4 py-2 text-lg"
              >
                {item.label}
              </Button>
              {/* 如果有子菜单，则显示子菜单 */}
              <Show
                when={
                  item.submenu && isDifficultyOpen() && item.label === "难度"
                }
              >
                <div class="absolute left-0 top-full mt-2 min-w-[120px] rounded-lg bg-gray-800 py-2 shadow-xl">
                  <For each={item.submenu}>
                    {(subItem) => (
                      <button
                        onClick={() => {
                          subItem.action && subItem.action();
                          setIsDifficultyOpen(false); // 选择后关闭子菜单
                        }}
                        class="block w-full px-4 py-2 text-left text-white hover:bg-gray-700"
                      >
                        {subItem.label}
                        {/* 如果是当前难度，显示选中标记 */}
                        <Show when={subItem.label === props.currentDifficulty}>
                          <span class="float-right ml-2 text-green-400">✓</span>
                        </Show>
                      </button>
                    )}
                  </For>
                </div>
              </Show>
            </div>
          )}
        </For>
      </div>
    </nav>
  );
};

export default Navbar;
