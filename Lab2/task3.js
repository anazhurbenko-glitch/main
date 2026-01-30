/**
 * Завдання 3 (варіант 1)
 * Упорядкувати індекси за неспаданням елементів послідовності.
 * Критерій: за сумою цифр числа (приклад: 2413 -> 10).
 * Метод: BSort (Bubble Sort).
 *
 * Вбудований sort не використовується.
 */

const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

/** Сума цифр числа (за модулем). Приклад: 2413 -> 10 */
function sumOfDigits(n) {
  let x = Math.abs(n);
  let s = 0;
  while (x > 0) {
    s += x % 10;
    x = Math.floor(x / 10);
  }
  return s;
}

/**
 * Bubble Sort: упорядкування індексів за неспаданням значень key[indices[i]].
 * key — масив значень критерію (наприклад, сума цифр елементів).
 */
function bSortIndices(key) {
  const n = key.length;
  const indices = [];
  for (let i = 0; i < n; i++) indices[i] = i;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (key[indices[j]] > key[indices[j + 1]]) {
        const t = indices[j];
        indices[j] = indices[j + 1];
        indices[j + 1] = t;
      }
    }
  }
  return indices;
}

async function main() {
  console.log('--- Завдання 3 ---');
  console.log('Упорядкування індексів за неспаданням елементів (критерій: сума цифр). Метод: BSort.\n');

  const nStr = await ask('N = ? ');
  const n = parseInt(nStr, 10);
  if (Number.isNaN(n) || n < 1) {
    console.log('Потрібно натуральне число N.');
    rl.close();
    return;
  }

  const a = [];
  for (let i = 0; i < n; i++) {
    const valStr = await ask(`a[${i + 1}] = ? `);
    const val = parseInt(valStr, 10);
    if (Number.isNaN(val)) {
      console.log('  (введено не число, використано 0)');
      a.push(0);
    } else {
      a.push(val);
    }
  }

  rl.close();

  const key = [];
  for (let i = 0; i < n; i++) key[i] = sumOfDigits(a[i]);

  const sortedIndices = bSortIndices(key);

  const sorted = [];
  for (let i = 0; i < n; i++) sorted.push(a[sortedIndices[i]]);

  console.log('\nУпорядкована послідовність:');
  console.log(sorted.join(' '));
}

main().catch(console.error);
