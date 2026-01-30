/**
 * Завдання 1 (варіант 1)
 * Область = (Фігура-1 ∪ Фігура-2) ∩ Фігура-3
 * Всі три фігури — вертикальні стрічки.
 *
 * Стрічка 1: 1 ≤ x ≤ 3
 * Стрічка 2: 5 ≤ x ≤ 7
 * Стрічка 3: 0 ≤ x ≤ 8
 * Область: (1≤x≤3 або 5≤x≤7) і 0≤x≤8 → 1≤x≤3 або 5≤x≤7 (будь-яке y)
 */

const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

function inFigure1(x) {
  return x >= 1 && x <= 3;
}
function inFigure2(x) {
  return x >= 5 && x <= 7;
}
function inFigure3(x) {
  return x >= 0 && x <= 8;
}

function inArea(x, y) {
  return (inFigure1(x) || inFigure2(x)) && inFigure3(x);
}

function distToStrip(x, a, b) {
  if (x >= a && x <= b) return 0;
  return Math.min(Math.abs(x - a), Math.abs(x - b));
}

function distToArea(x, y) {
  const d1 = distToStrip(x, 1, 3);
  const d2 = distToStrip(x, 5, 7);
  return Math.min(d1, d2);
}

async function main() {
  console.log('--- Завдання 1. Влучити точкою в область ---\n');
  console.log('Область: об\'єднання двох вертикальних стрічок (1≤x≤3 та 5≤x≤7)');
  console.log('         у перетині з третьою (0≤x≤8). Координата y — довільна.\n');
  console.log('Вводьте координати точки (x, y) — два числа через пробіл.\n');

  let attempt = 0;
  let prevDist = null;

  while (true) {
    const line = await ask(`Спроба ${attempt + 1}. Введіть x та y: `);
    const parts = line.trim().split(/\s+/);
    if (parts.length < 2) {
      console.log('  Потрібно два числа (x та y). Спробуйте ще раз.\n');
      continue;
    }
    const x = parseFloat(parts[0]);
    const y = parseFloat(parts[1]);
    if (Number.isNaN(x) || Number.isNaN(y)) {
      console.log('  Це не числа. Введіть два числа.\n');
      continue;
    }

    attempt++;

    if (inArea(x, y)) {
      console.log(`\nНарешті ви влучили з ${attempt}-ї спроби.`);
      rl.close();
      return;
    }

    const d = distToArea(x, y);
    if (prevDist === null) {
      console.log('  Холодно. Продовжуйте.\n');
    } else if (d < prevDist) {
      console.log('  Тепліше.\n');
    } else {
      console.log('  Холодніше.\n');
    }
    prevDist = d;
  }
}

main().catch(console.error);
