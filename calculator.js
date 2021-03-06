let runningTotal = 0;
let buffer = '0';
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    //Check if a symbol or number clicked
    if(isNaN(value)){
        //This is not a number
        handleSymbol(value)
    } else {
        //This is a number
        handleNumber(value)
    }

    screen.innerText = buffer;

}


function handleSymbol(symbol){

    switch (symbol) {
        case 'C':
            buffer = '0'
            runningTotal = 0
            break;
        case '=':
            if (previousOperator === null) {
                return;
            } 
            flushOperation(parseInt(buffer))
            previousOperator = null  
            buffer = runningTotal
            runningTotal = 0
            break;
        case '←':
            console.log('left arr')
            if (buffer.length === 1) {
                buffer = '0'
            } else {
                buffer = buffer.substr(0, buffer.length-1)
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol)
            break;   
        default:
            break;
    }


function handleMath(symbol) {
    if (buffer === '0') {
        //do nothing 
        return;
    }
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer)
    }

    previousOperator = symbol
    buffer = '0'
}


//× ÷ -


function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer
    } else if (previousOperator === '×'){
        runningTotal *= intBuffer
    } else {
        runningTotal /= intBuffer
    }
    console.log('runningTotal', runningTotal)
}



}
function handleNumber(numberString){
    if (buffer.length > 9){
        return;
    }

    if (buffer==='0'){
        buffer = numberString;
    }else{
        buffer = buffer + numberString;
    }
    console.log('buffer', buffer);
}

function init() {
    document.querySelector('.calc-buttons')
    .addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();