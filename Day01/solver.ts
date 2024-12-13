import { promises as fs } from "fs";

const solveDayOne = async (): Promise<void> => {
  try {
    const input = await readInputFile("Input/input.txt");
    if (!input) {
      console.error("Input file is empty or unreadable.");
      return;
    }

    const { firstList, secondList } = parseInput(input);

    if (firstList.length !== secondList.length) {
      console.error(
        "Mismatched data: firstList and secondList have different lengths."
      );
      return;
    }

    const totalDistance = calculateTotalDistance(firstList, secondList);
    console.log(`Total Distance: ${totalDistance}`);
  } catch (error) {
    throw new Error(`An unexpected error occurred:, ${error.message}`);
  }
};

const readInputFile = async (filePath: string): Promise<string> => {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    throw new Error(`Failed to read file at ${filePath}: ${error.message}`);
  }
};

const parseInput = (
  input: string
): { firstList: number[]; secondList: number[] } => {
  const firstList: number[] = [];
  const secondList: number[] = [];

  input
    .trim()
    .split("\n")
    .forEach((line) => {
      const [firstNum, secondNum] = line.split(/\s+/).map(Number);
      if (isNaN(firstNum) || isNaN(secondNum)) {
        throw new Error(`Invalid input format: "${line}"`);
      }
      firstList.push(firstNum);
      secondList.push(secondNum);
    });

  return {
    firstList: firstList.sort((a, b) => a - b),
    secondList: secondList.sort((a, b) => a - b),
  };
};

const calculateTotalDistance = (
  firstList: number[],
  secondList: number[]
): number => {
  return firstList.reduce((total, num, idx) => {
    const distance = Math.abs(num - secondList[idx]);
    return total + distance;
  }, 0);
};

solveDayOne();
