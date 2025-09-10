const calculator = document.querySelector('.calculator-container');
const closeBtn = document.querySelector('.red-button');
const reOpenBtn = document.querySelector('.reopen');
const smallBtn = document.querySelector('.yellow-button');
const bigBtn = document.querySelector('.green-button');
const originalBtn = document.querySelector('.gray-button')

closeBtn.addEventListener('click', function() {
    calculator.classList.add('hidden');
    reOpenBtn.style.display = 'block';
});

reOpenBtn.addEventListener('click', function() {
    calculator.classList.remove('hidden');
    reOpenBtn.style.display = 'none';
})

smallBtn.addEventListener('click', function() {
    calculator.style.transform = 'scale(0.9)'; 
    calculator.style.transition = 'transform 0.3s ease';
});

bigBtn.addEventListener('click', function() {
    calculator.style.transform = 'scale(1.1)'; 
    calculator.style.transition = 'transform 0.3s ease';
});

originalBtn.addEventListener('click', function() {
    calculator.style.transform = 'scale(1.0)';
    calculator.style.transition = 'transform 0.3s ease';
});

const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');

let firstOperand = null;
let operator = null;

function calculate(num1, operator, num2){
    num1 = Number(num1);
    num2 = Number(num2);

    switch (operator) {
        case '+' :
            return num1 + num2;
        case '-' :
            return num1 - num2;
        case '*' :
            return num1 * num2;
        case '/' :
            if (num2 === 0) {
                alert('0으로 나눌 수 없습니다.');
                return 0;
            } return num1 / num2; 
        default:
            return num2;
    }
}

buttons.forEach(function(btn){
    btn.addEventListener('click', function(e){
        const value = e.target.textContent;
        console.log(value); 

    if (btn.classList.contains('number')){
        if (display.textContent.length >= 10) {
            alert('숫자를 더 이상 입력할 수 없습니다.')
            return
        }
        if (display.textContent === '0') {
            display.textContent = value;
        } 
        else {
            display.textContent += value;
        }
        } 
        else if (value === '.') {
            if (!display.textContent.includes('.')){
                display.textContent += '.';
            }
        }
        else if (value === 'C') {
            display.textContent  = '0';
            firstOperand = null;
            operator = null;
        }
        else if (value === '±') {
            if (display.textContent !== 0) {
                display.textContent = String(Number(display.textContent) * -1);
            }
        }
        else if (value === '%') {
            if (display.textContent !== 0){
                display.textContent = String(Number(display.textContent) / 100);
            }
        }
        else if (btn.classList.contains('operator')) {
            if(firstOperand === null) {
                firstOperand = display.textContent;
            }
            operator = value; 
            
            console.log('First Operand:', firstOperand);
            console.log('Operator:', operator);
            display.textContent = '';
        }
        
        else if (value === '=') {
            if (firstOperand !== null && operator !== null) {
                const secondOperand = display.textContent;
                console.log(`Second Operand:`, secondOperand)
                const total = calculate(firstOperand, operator, secondOperand);
                display.textContent = Number(total.toFixed(6));
                firstOperand = null;
                operator = null;
            }
        }
    });
});