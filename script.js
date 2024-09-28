let currentExpression = '';

function addInput(value) {
  // Menggunakan simbol untuk input
  const symbols = {
    P: 'P',
    Q: 'Q',
    R: 'R',
    AND: '^',
    OR: '∨',
    NOT: '¬',
    IMPLICATION: '→',
    BIMPLICATION: '↔',
    OPEN_PAREN: '(', // Untuk kurung buka
    CLOSE_PAREN: ')', // Untuk kurung tutup
  };

  currentExpression += (currentExpression ? ' ' : '') + (symbols[value] || value);
  document.getElementById('expression').value = currentExpression;
}

function reset() {
  currentExpression = '';
  document.getElementById('expression').value = '';
  document.getElementById('truthTable').innerHTML = '';
  document.getElementById('expressionResult').innerText = '';
}

function generateCombinations(numVariables) {
  const totalCombinations = Math.pow(2, numVariables);
  const combinations = [];

  for (let i = 0; i < totalCombinations; i++) {
    const combination = [];
    combination.push(Boolean((totalCombinations - 1 - i) & 4)); // P
    combination.push(Boolean((totalCombinations - 1 - i) & 2)); // Q
    combination.push(Boolean((totalCombinations - 1 - i) & 1)); // R
    combinations.push(combination);
  }

  return combinations;
}

function calculate() {
  const combinations = generateCombinations(3);
  const truthTableHtml = `
        <thead>
            <tr>
                <th>P</th>
                <th>Q</th>
                <th>R</th>
                <th>Result</th>
            </tr>
        </thead>
        <tbody>
            ${combinations
              .map(
                (combination) => `
                <tr>
                    <td>${combination[0]}</td>
                    <td>${combination[1]}</td>
                    <td>${combination[2]}</td>
                    <td>${evaluateExpression(combination)}</td>
                </tr>
            `
              )
              .join('')}
        </tbody>
    `;

  document.getElementById('truthTable').innerHTML = truthTableHtml;
  document.getElementById('expressionResult').innerText = currentExpression;
}

function evaluateExpression(combination) {
  const [P, Q, R] = combination;
  let result = false;

  // Evaluasi ekspresi berdasarkan input
  const expr = currentExpression.replace(/P/g, P).replace(/Q/g, Q).replace(/R/g, R);

  // Ganti simbol dengan operasi logika yang sesuai
  const evaluatedExpr = expr
    .replace(/\^/g, ' && ') // AND
    .replace(/∨/g, ' || ') // OR
    .replace(/¬/g, ' !') // NOT
    .replace(/→/g, ' !') // IMPLIKASI, ganti dengan logika yang sesuai
    .replace(/↔/g, ' !') // BIMPLIKASI, ganti dengan logika yang sesuai
    .replace(/\(/g, '(') // Kurung buka
    .replace(/\)/g, ')'); // Kurung tutup

  try {
    result = eval(evaluatedExpr); // Evaluasi hasil ekspresi
  } catch (e) {
    console.error('Error evaluating expression:', e);
  }

  return result;
}
