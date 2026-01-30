/**
 * Завдання 2 (варіант 1)
 * Задана величина: кількість найменших значень
 * Критерій: старша цифра не 9
 *
 * Один прохід по послідовності, без масиву.
 */

const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

/** Повертає старшу (найстаршу) цифру числа (за модулем). */
function firstDigit(n) {
  let x = Math.abs(n);
  if (x === 0) return 0;
  while (x >= 10) x = Math.floor(x / 10);
  return x;
}

async function main() {
  console.log('--- Завдання 2 ---');
  console.log('Критерій: старша цифра не 9.');
  console.log('Шукана величина: кількість найменших значень серед елементів, що йому задовольняють.\n');
  console.log('Вводьте цілі числа по одному. Порожній рядок — кінець послідовності.\n');

  let minVal = null;
  let countMin = 0;

  while (true) {
    const line = await ask('Число: ');
    const trimmed = line.trim();
    if (trimmed === '') break;

    const num = parseInt(trimmed, 10);
    if (Number.isNaN(num)) {
      console.log('  (пропущено — не число)');
      continue;
    }

    if (firstDigit(num) === 9) continue;

    if (minVal === null || num < minVal) {
      minVal = num;
      countMin = 1;
    } else if (num === minVal) {
      countMin++;
    }
  }

  rl.close();

  if (minVal === null) {
    console.log('\nСеред введених чисел немає жодного, у якого старша цифра не 9.');
  } else {
    console.log('\nНайменше значення (старша цифра ≠ 9):', minVal);
    console.log('Кількість найменших значень:', countMin);
  }
}

main().catch(console.error);
