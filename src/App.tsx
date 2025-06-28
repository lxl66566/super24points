import { type Component, createSignal, createEffect } from "solid-js";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import CalculatorGrid from "./components/CalculatorGrid";
import Dialog from "./components/Dialog";
import { OperatorsFunc, type Difficulty, type Operators } from "./schemas";
import { calculate } from "./utils/solver";

const EPSILON = 1e-6; // For floating-point comparisons

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
    createSignal<Difficulty>("easy"); // 当前难度

  // 对话框状态
  const [isHelpDialogOpen, setIsHelpDialogOpen] = createSignal(false);
  const [isCheatDialogOpen, setIsCheatDialogOpen] = createSignal(false);
  const [isWinDialogOpen, setIsWinDialogOpen] = createSignal(false); // New state for win dialog
  const [cheatSolutions, setCheatSolutions] = createSignal<string[]>([]); // New state for cheat solutions

  // 重置状态
  const handleClear = () => {
    setCurrentNumber(null);
    setNumbersEnabled(currentNumbers().map(() => true));
    setRegisterValue(null);
    setCurrentOperator(null);
    setIsHelpDialogOpen(false);
    setIsCheatDialogOpen(false);
    setIsWinDialogOpen(false); // Reset win dialog
  };

  // 使用数字（将其变为不可用）
  const useNumber = (index: number) => {
    // 对于 0-3 是正常数字
    if (index < 4) {
      setNumbersEnabled((prev) => {
        const newNumbersEnabled = prev.slice();
        newNumbersEnabled[index] = false;
        return newNumbersEnabled;
      });
    }
    // 4 则是寄存器
    else {
      setRegisterValue(null);
    }
  };

  // 检查胜利条件
  const checkWinCondition = () => {
    if (currentNumber() === null) {
      return;
    }
    const allNumbersUsed = numbersEnabled().every((enabled) => !enabled);
    const isRegisterEmpty = registerValue() === null;
    const isTargetReached = Math.abs(currentNumber()! - 24) < EPSILON;

    if (allNumbersUsed && isRegisterEmpty && isTargetReached) {
      setIsWinDialogOpen(true);
    }
  };

  // 在 currentNumber, numbersEnabled, registerValue 变化时检查胜利条件
  createEffect(() => {
    checkWinCondition();
  });

  // 数字按钮点击回调
  const handleNumberClick = (num: number, index: number) => {
    if (currentNumber() === null) {
      // If no current number, set it
      setCurrentNumber(num);
      useNumber(index);
      return;
    }
    if (currentOperator() === null) {
      // If no operator selected, ignore
      return;
    }
    // If operator is selected, perform operation
    const num1 = currentNumber()!;
    const op = currentOperator()!;
    const num2 = num;
    const result = OperatorsFunc[op](num1, num2);

    if (result !== null) {
      setCurrentNumber(result);
      setCurrentOperator(null); // Reset operator after operation
      useNumber(index);
      // Win condition check is now handled by the top-level createEffect
      return;
    } else {
      window.alert("运算错误！"); // Handle errors like division by zero
      handleClear();
      return;
    }
  };

  const handleOperatorClick = (op: Operators) => {
    setCurrentOperator(op); // Set current operator
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
    handleNumberClick(registerValue()!, 4); // 4 代表寄存器
  };

  // 导航栏功能
  const handleNewGame = () => {
    let newNumbers: number[] = [];
    let solutions: string[] = [];
    let attempts = 0;
    const MAX_ATTEMPTS = 1000; // Prevent infinite loops

    do {
      attempts++;
      if (currentDifficulty() === "normal") {
        // For normal difficulty: [-10, -1] U [1, 10]
        newNumbers = Array.from({ length: 4 }, () => {
          const rand = Math.random();
          if (rand < 0.5) {
            // 50% chance for negative numbers [-10, -1]
            return Math.floor(Math.random() * 10) - 10; // -10 to -1
          } else {
            // 50% chance for positive numbers [1, 10]
            return Math.floor(Math.random() * 10) + 1; // 1 to 10
          }
        });
      } else {
        // For easy, hard, lunatic: [1, 10]
        newNumbers = Array.from(
          { length: 4 },
          () => Math.floor(Math.random() * 10) + 1,
        );
      }
      solutions = calculate(newNumbers, currentDifficulty());
    } while (solutions.length === 0 && attempts < MAX_ATTEMPTS);

    if (solutions.length === 0) {
      console.warn("未能找到有解的数字组合，请尝试调整难度或重新开始。");
      // Fallback to a default solvable set or alert the user
      newNumbers = [1, 2, 3, 4]; // A known solvable set
    }

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
    handleNewGame(); // 切换难度后开始新游戏
  };

  const handleCheat = () => {
    setCheatSolutions(calculate(currentNumbers(), currentDifficulty()));
    setIsCheatDialogOpen(true);
  };

  return (
    <div class="mx-auto flex min-h-screen w-screen flex-col items-center justify-center bg-gray-950 font-sans">
      <div class="max-w-screen mx-auto max-w-full rounded-xl bg-gray-800 p-6 shadow-2xl">
        {/* 导航栏 */}
        <Navbar
          onNewGame={handleNewGame}
          onHelp={handleHelp}
          onDifficultyChange={handleDifficultyChange}
          onCheat={handleCheat}
          currentDifficulty={currentDifficulty()}
        />

        {/* 主界面内容 */}
        <div class="mt-6 w-full space-y-4">
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
            currentDifficulty={currentDifficulty} // Pass difficulty signal directly
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
        {cheatSolutions().length > 0 ? (
          <ul class="mt-2 list-disc pl-5 font-mono text-lg">
            {cheatSolutions().map((solution) => (
              <li>{solution}</li>
            ))}
          </ul>
        ) : (
          <p class="mt-2 text-red-400">无解</p>
        )}
      </Dialog>

      {/* 胜利对话框 */}
      <Dialog
        isOpen={isWinDialogOpen()}
        onClose={() => setIsWinDialogOpen(false)}
        title="恭喜！"
      >
        <p class="text-center text-xl font-bold text-green-400">
          你成功算出了 24 点！
        </p>
      </Dialog>
    </div>
  );
};

export default App;
