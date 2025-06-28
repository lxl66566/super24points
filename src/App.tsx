import { type Component, createSignal } from "solid-js";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import CalculatorGrid from "./components/CalculatorGrid";
import Dialog from "./components/Dialog";
import { OperatorsFunc, type Difficulty, type Operators } from "./schemas";

// App 组件
const App: Component = () => {
  // 状态管理
  const [currentNumber, setCurrentNumber] = createSignal<number | null>(null); // 当前显示的值
  const [registerValue, setRegisterValue] = createSignal<number | null>(null); // 寄存器中的值
  const [currentNumbers, setCurrentNumbers] = createSignal([2, 7, 3, 6]); // 初始数字
  const [numbersEnabled, setNumbersEnabled] = createSignal<boolean[]>(
    currentNumbers().map(() => true),
  );
  const [currentOperator, setCurrentOperator] = createSignal<Operators | null>(
    null,
  ); // 当前选中的运算符
  const [currentDifficulty, setCurrentDifficulty] =
    createSignal<Difficulty>("lunatic"); // 当前难度

  // 对话框状态
  const [isHelpDialogOpen, setIsHelpDialogOpen] = createSignal(false);
  const [isCheatDialogOpen, setIsCheatDialogOpen] = createSignal(false);

  // 重置状态
  const handleClear = () => {
    setCurrentNumber(null);
    setNumbersEnabled(currentNumbers().map(() => true));
    setRegisterValue(null);
    setCurrentOperator(null);
    setIsHelpDialogOpen(false);
    setIsCheatDialogOpen(false);
  };

  // 使用数字（将其变为不可用）
  const useNumber = (index: number) => {
    setNumbersEnabled((prev) => {
      const newNumbersEnabled = prev.slice();
      newNumbersEnabled[index] = false;
      return newNumbersEnabled;
    });
  };

  // 数字按钮点击回调。返回 true 代表数字被使用，返回 false 代表数字被忽略
  const handleNumberClick = (num: number, index: number) => {
    if (!currentNumber()) {
      // 如果没有当前数字，则设置当前数字
      setCurrentNumber(num);
      useNumber(index);
      return;
    }
    if (currentOperator() === null) {
      return; // 如果没有选中运算符，则忽略此数字
    }
    // 如果有选中运算符，进行运算
    const num1 = currentNumber()!;
    const num2 = num;
    const result = OperatorsFunc[currentOperator()!](num1, num2);

    if (result !== null) {
      setCurrentNumber(result);
      setCurrentOperator(null); // 运算后重置运算符
      useNumber(index);
      return;
    } else {
      window.alert("运算错误！"); // 处理错误，如除零
      handleClear();
      return;
    }
  };

  const handleOperatorClick = (op: Operators) => {
    setCurrentOperator(op); // 设置当前运算符
  };

  const handleStoreRegister = () => {
    setRegisterValue(currentNumber());
    setCurrentNumber(null);
  };

  const handleRecallRegister = () => {
    if (!registerValue()) {
      window.alert("请先存储到寄存器！");
      return;
    }
    setCurrentNumber(registerValue());
    setRegisterValue(null);
  };

  // 导航栏功能
  const handleNewGame = () => {
    const newNumbers = Array.from(
      { length: 4 },
      () => Math.floor(Math.random() * 10) + 1,
    ); // 生成 1-10 的随机数
    setCurrentNumbers(newNumbers);
    handleClear();
  };

  const handleHelp = () => {
    setIsHelpDialogOpen(true);
  };

  const handleDifficultyChange = (
    difficulty: "easy" | "normal" | "hard" | "lunatic",
  ) => {
    setCurrentDifficulty(difficulty);
    // 实际逻辑会根据难度调整游戏，这里只是更新状态
    handleNewGame(); // 切换难度后开始新游戏
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
            registerValue={registerValue}
            currentDisplay={currentNumber}
            onStore={handleStoreRegister}
            onRecall={handleRecallRegister}
            onClear={handleClear}
          />

          {/* 计算器按键网格 */}
          <CalculatorGrid
            numbers={currentNumbers()}
            numbersEnabled={numbersEnabled}
            onNumberClick={handleNumberClick}
            onOperatorClick={handleOperatorClick}
            currentOperator={currentOperator()}
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
