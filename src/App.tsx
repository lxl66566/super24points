import { type Component, createSignal } from "solid-js";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import CalculatorGrid from "./components/CalculatorGrid";
import Dialog from "./components/Dialog";

// App 组件
const App: Component = () => {
  // 状态管理
  const [currentDisplay, setCurrentDisplay] = createSignal("0"); // 当前显示的值
  const [registerValue, setRegisterValue] = createSignal(""); // 寄存器中的值
  const [currentNumbers, setCurrentNumbers] = createSignal([2, 7, 3, 6]); // 初始数字
  const [currentDifficulty, setCurrentDifficulty] = createSignal<
    "easy" | "normal" | "hard" | "lunatic"
  >("lunatic"); // 当前难度

  // 对话框状态
  const [isHelpDialogOpen, setIsHelpDialogOpen] = createSignal(false);
  const [isCheatDialogOpen, setIsCheatDialogOpen] = createSignal(false);

  // 模拟操作逻辑 (不实现具体计算逻辑)
  const handleNumberClick = (num: number) => {
    setCurrentDisplay((prev) =>
      prev === "0" ? num.toString() : prev + num.toString(),
    );
  };

  const handleOperatorClick = (op: string) => {
    setCurrentDisplay((prev) => prev + op);
  };

  const handleClear = () => {
    setCurrentDisplay("0");
  };

  const handleStoreRegister = () => {
    setRegisterValue(currentDisplay());
  };

  const handleRecallRegister = () => {
    if (registerValue()) {
      setCurrentDisplay(registerValue());
    }
  };

  // 导航栏功能
  const handleNewGame = () => {
    alert("开始新游戏！");
    // 实际逻辑会是生成新数字等
    setCurrentDisplay("0");
    setRegisterValue("");
    setCurrentNumbers([
      Math.floor(Math.random() * 9) + 1,
      Math.floor(Math.random() * 9) + 1,
      Math.floor(Math.random() * 9) + 1,
      Math.floor(Math.random() * 9) + 1,
    ]);
  };

  const handleHelp = () => {
    setIsHelpDialogOpen(true);
  };

  const handleDifficultyChange = (
    difficulty: "easy" | "normal" | "hard" | "lunatic",
  ) => {
    setCurrentDifficulty(difficulty);
    alert(`难度设置为：${difficulty}`);
    // 实际逻辑会根据难度调整游戏
  };

  const handleCheat = () => {
    setIsCheatDialogOpen(true);
  };

  return (
    <div class="flex min-h-screen flex-col items-center justify-center bg-gray-950 font-sans">
      <div class="mx-auto w-full max-w-xl rounded-xl bg-gray-800 p-6 shadow-2xl">
        {/* 导航栏 */}
        <Navbar
          onNewGame={handleNewGame}
          onHelp={handleHelp}
          onDifficultyChange={handleDifficultyChange}
          onCheat={handleCheat}
          currentDifficulty={currentDifficulty()}
        />

        {/* 主界面内容 */}
        <div class="mt-6 space-y-4">
          {/* 寄存器区域 */}
          <Register
            registerValue={registerValue()}
            onStore={handleStoreRegister}
            onRecall={handleRecallRegister}
            onClear={handleClear}
          />

          {/* 计算器按键网格 */}
          <CalculatorGrid
            numbers={currentNumbers()}
            onNumberClick={handleNumberClick}
            onOperatorClick={handleOperatorClick}
          />
        </div>
      </div>

      {/* 帮助对话框 */}
      <Dialog
        isOpen={isHelpDialogOpen()}
        onClose={() => setIsHelpDialogOpen(false)}
        title="帮助"
      >
        <p>
          这是一个24点游戏。你需要使用给定的四个数字和运算符，通过加减乘除以及其他可能的运算，最终得到24。
        </p>
        <p class="mt-2">支持的运算符包括：+</p>
        <p>-</p>
        <p>*</p>
        <p>/</p>
        <p>^ (幂运算)</p>
        <p>& (按位与)</p>
        <p>| (按位或)</p>
      </Dialog>

      {/* 作弊对话框 */}
      <Dialog
        isOpen={isCheatDialogOpen()}
        onClose={() => setIsCheatDialogOpen(false)}
        title="作弊 (答案)"
      >
        <p>当前问题的答案：</p>
        <p class="mt-2 font-mono text-lg">例如：(7 - 3) * (6 + 2) = 24</p>
        <p class="mt-4 text-red-400">（此处应动态显示实际的答案逻辑）</p>
      </Dialog>
    </div>
  );
};

export default App;
