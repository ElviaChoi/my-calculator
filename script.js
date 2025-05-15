// 계산기 전체를 선택합니다.
const calculator = document.querySelector('.calculator-container');
// 닫기버튼에 빨간색 버튼을 지정합니다.
const closeBtn = document.querySelector('.red-button');
// 다시 계산기를 보여주는 버튼을 할당합니다.
const reOpenBtn = document.querySelector('.reopen');
// 계산기 크기를 줄여주는 버튼을 노란색 버튼으로 지정합니다. 
const smallBtn = document.querySelector('.yellow-button');
// 계산기 크기를 키워주는 버튼을 초록색 버튼으로 지정합니다.
const bigBtn = document.querySelector('.green-button');
// 계산기 크기를 원본으로 변경해주는 버튼을 회색 버튼으로 지정합니다.
const originalBtn = document.querySelector('.gray-button')


//빨간색 버튼을 클릭하면 계산기를 숨깁니다.
closeBtn.addEventListener('click', function() {
    calculator.classList.add('hidden');
    reOpenBtn.style.display = 'block';
});

//버튼을 클릭하면 숨겨진 계산기가 나타나고 버튼은 사라집니다.
reOpenBtn.addEventListener('click', function() {
    calculator.classList.remove('hidden');
    reOpenBtn.style.display = 'none';
})

//노란색 버튼을 클릭하면 계산기 크기를 살짝 줄여줍니다.
smallBtn.addEventListener('click', function() {
    calculator.style.transform = 'scale(0.9)'; 
    calculator.style.transition = 'transform 0.3s ease'; // 0.3초간 진행, 처음에 느리게 시작 -> 빠르게 -> 천천히 종료
});

//초록색 버튼을 클릭하면 계산기 크기를 살짝 키워줍니다.
bigBtn.addEventListener('click', function() {
    calculator.style.transform = 'scale(1.1)'; 
    calculator.style.transition = 'transform 0.3s ease'; // 0.3초간 진행, 처음에 느리게 시작 -> 빠르게 -> 천천히 종료
});

//회색 버튼을 클릭하면 계산기 크기를 원본으로 변경해줍니다.
originalBtn.addEventListener('click', function() {
    calculator.style.transform = 'scale(1.0)';
    calculator.style.transition = 'transform 0.3s ease'; // 0.3초간 진행, 처음에 느리게 시작 -> 빠르게 -> 천천히 종료
});


//3-2단계 : 숫자를 디스플레이에 표시하기
//3-2-1. 모든 버튼 요소와 디스플레이 요소를 선택합니다.
//모든 버튼 요소를 선택
const buttons = document.querySelectorAll('.button');
//디스플레이 요소를 선택
const display = document.querySelector('.display');


//4-1단계: 디스플레이에 숫자를 입력한 다음 연산기호를 누르면 디스플레이에 있는 숫자를 `firstOperand`로 저장하고 연산기호를 기억하기
//4-1-1. firstOperand, operator 변수를 선언합니다.
let firstOperand = null;
let operator = null;


// 4-2단계: `calculate` 함수 구현 및 `=` 버튼 클릭 시 계산 수행
// 4-2-1. `calculate` 함수를 구현합니다.
function calculate(num1, operator, num2){
    // 매개변수로 받은 입력 값을 숫자로 변환해줍니다.
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
            return num2; // operator가 없는 경우 두 번째 숫자로 그대로 반환해줍니다.
    }
}

//3-2-2. 각 버튼에 클릭 이벤트 리스너를 추가합니다.
buttons.forEach(function(btn){
    btn.addEventListener('click', function(e){
        const value = e.target.textContent;
        //각 버튼을 클릭했을 때 console에 각 버튼의 value가 나오도록 하기 (3-1단계)
        console.log(value); 

    //3-2-3. 버튼이 클릭되었을 때, 클래스가 `number`인 경우 디스플레이에 값을 표시한다.
    if (btn.classList.contains('number')){
        //디스플레이 화면에 숫자가 10자를 초과한 경우 더 이상 입력을 제한한다.    
        if (display.textContent.length >= 10) {
            alert('숫자를 더 이상 입력할 수 없습니다.')
            return
        }
        //3-2-4. 디스플레이가 `0`인 경우
        if (display.textContent === '0') {
        //클릭한 숫자 값으로 바뀌어야 한다.
            display.textContent = value;
        } 

        //3-2-5. 디스플레이가 `0`이 아닌 그 밖의 경우
        else {
        //클릭한 숫자를 뒤에 추가해준다.     
            display.textContent += value;
        }
        } 

        //3단계 추가 기능 1번) 소수점(.) 버튼을 클릭하면 디스플레이에 소수점을 추가하세요. (이미 소수점이 있는 경우 추가되지 않도록)
        else if (value === '.') {
            //이미 소수점이 있지 않으면
            if (!display.textContent.includes('.')){
            //디스플레이에 소수점을 추가한다.    
                display.textContent += '.';
            }
        }

        //3단계 추가 기능 2번) C 버튼을 클릭하면 디스플레이를 0으로 초기화하세요.
        else if (value === 'C') {
            display.textContent  = '0';
            //첫 번째 피연산자와 연산자는 초기화를 해준다.
            firstOperand = null;
            operator = null;
        }

        // ± 버튼을 클릭하면 디스플레이 숫자를 음수면 음수로, 양수면 양수로 변환을 해준다.     
        else if (value === '±') {
            //디스플레이에 숫자가 0이 아니면
            if (display.textContent !== 0) {
            //화면의 숫자를 음수나 양수로 변환해주고 다시 문자열로 표시합니다.
                display.textContent = String(Number(display.textContent) * -1);
            }
        }

        // % 버튼을 클릭하면 디스플레이의 현재 숫자의 100으로 나눈 값을 표시합니다.
        else if (value === '%') {
            // 디스플레이에 숫자가 0이 아니면
            if (display.textContent !== 0){
            // 화면의 숫자를 100으로 나눈 뒤 다시 문자열로 표시합니다.    
                display.textContent = String(Number(display.textContent) / 100);
            }
        }

        // 4-1-2. 연산기호 버튼이 클릭되면 현재 디스플레이 값을 `firstOperand`로 저장하고, 연산기호를 기억합니다.
        //클릭한 버튼이 연산자일 경우, 
        else if (btn.classList.contains('operator')) {
            // 첫 번째 피연산자가 null이면 현재 디스플레이 값을 firstOperand로 저장합니다.
            if(firstOperand === null) {
                firstOperand = display.textContent;
            }
            // operator 변수에 클릭한 연산기호를 값으로 할당합니다.
            operator = value; 
            
            // firstOperand와 operator를 console에 출력합니다.
            console.log('First Operand:', firstOperand);
            console.log('Operator:', operator);
        // 4-1-3. 연산기호 버튼이 클릭된 후 디스플레이에 다른 숫자를 입력하면 새로운 숫자가 디스플레이에 입력되도록 합니다.
        // 연산기호 버튼이 클릭된 후 두 번째 숫자를 입력하면 디스플레이의 값이 새로 입력한 숫자로 바뀝니다.
            display.textContent = '';
        }
        
        // 4-2-2. `=` 버튼이 클릭되면 `firstOperand`, `operator`, `secondOperand`를 전달하여 계산을 수행하고 결과를 디스플레이에 표시합니다.
        else if (value === '=') {
            if (firstOperand !== null && operator !== null) {
                //디스플레이 화면에 표시되는 숫자를 두 번째 피연산자에 할당해준다.
                const secondOperand = display.textContent;
                //두번째 피연산자 secondOperand도 출력합니다.
                console.log(`Second Operand:`, secondOperand)
                //calculate 함수를 결과 값에 할당해줍니다.
                const total = calculate(firstOperand, operator, secondOperand);
                //디스플레이 화면에 결과 값을 보여줍니다. (소수점은 6자리까지만)
                display.textContent = Number(total.toFixed(6));
                //첫 번째 피연산자와 연산자는 초기화를 해준다.
                firstOperand = null;
                operator = null;
            }
        }
    });
});






