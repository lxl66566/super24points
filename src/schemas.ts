type Difficulty = "easy" | "normal" | "hard" | "lunatic";
type Operators = "+" | "-" | "*" | "**" | "/" | "^" | "//" | "&" | "|";

const OperatorsFunc: {
  [key in Operators]: (num1: number, num2: number) => number;
} = {
  "+": (num1: number, num2: number): number => num1 + num2,
  "-": (num1: number, num2: number): number => num1 - num2,
  "*": (num1: number, num2: number): number => num1 * num2,
  "/": (num1: number, num2: number): number => num1 / num2,
  "**": (num1: number, num2: number): number => num1 ** num2,
  "//": (num1: number, num2: number): number => Math.trunc(num1 / num2),
  "^": (num1: number, num2: number): number => num1 ^ num2,
  "&": (num1: number, num2: number): number => num1 & num2,
  "|": (num1: number, num2: number): number => num1 | num2,
};

const allowedOperators = (difficulty: Difficulty): Operators[] => {
  switch (difficulty) {
    case "easy":
    case "normal":
      return ["+", "-", "*", "/"];
    case "hard":
      return ["+", "-", "*", "/", "**", "//"];
    case "lunatic":
      return ["+", "-", "*", "/", "^", "&", "|"];
  }
};

export { type Difficulty, type Operators, OperatorsFunc, allowedOperators };
