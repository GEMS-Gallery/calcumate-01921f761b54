import { backend } from 'declarations/backend';

let display = document.getElementById('display');
let buttons = document.querySelectorAll('button');
let clearButton = document.getElementById('clear');
let equalsButton = document.getElementById('equals');

let currentValue = '';
let operator = '';
let firstOperand = null;

buttons.forEach(button => {
    if (button !== clearButton && button !== equalsButton) {
        button.addEventListener('click', () => {
            if (button.classList.contains('num')) {
                currentValue += button.textContent;
                display.value = currentValue;
            } else if (button.classList.contains('op')) {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentValue);
                    operator = button.textContent;
                    currentValue = '';
                }
            }
        });
    }
});

clearButton.addEventListener('click', () => {
    currentValue = '';
    operator = '';
    firstOperand = null;
    display.value = '';
});

equalsButton.addEventListener('click', async () => {
    if (firstOperand !== null && operator && currentValue) {
        const secondOperand = parseFloat(currentValue);
        let result;

        try {
            switch (operator) {
                case '+':
                    result = await backend.add(firstOperand, secondOperand);
                    break;
                case '-':
                    result = await backend.subtract(firstOperand, secondOperand);
                    break;
                case '*':
                    result = await backend.multiply(firstOperand, secondOperand);
                    break;
                case '/':
                    const divisionResult = await backend.divide(firstOperand, secondOperand);
                    result = divisionResult[0] !== null ? divisionResult[0] : 'Error';
                    break;
            }

            display.value = result;
            currentValue = result.toString();
            firstOperand = null;
            operator = '';
        } catch (error) {
            console.error('Error performing calculation:', error);
            display.value = 'Error';
        }
    }
});
