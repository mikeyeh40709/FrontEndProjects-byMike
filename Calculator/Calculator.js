function insertNum(element) {
    document.getElementById('value').value += element.id;
    checkZero = true;
}

//字串後一個是運算值,或input value = "" 後面+=0.
var checkDot = true;

function insertDot() {
    if (checkDot == false) {
        return;
    } else if (['+', '-', '*', '/'].includes(document.getElementById('value').value[document.getElementById('value').value.length - 1]) || document.getElementById('value').value === '') {
        document.getElementById('value').value += '0.';
    } else {
        document.getElementById('value').value += '.';
    }
    checkDot = false;
    checkZero = true;
}

function clearAll() {
    document.getElementById('value').value = "";
    checkDot = true;
    checkZero = false;
}
//按下運算值或dot或數字設為true
var checkZero = false;
function insertZero() {
    if (document.getElementById('value').value != "" && checkZero == true) {
        document.getElementById('value').value += '0';
    }
}

// 3.開根號 / 次方
// 5. .1+.3 OK
// 6. 200 + 0002.3 error
// 當空的不能+*/

function AddCounter(element) {
    if (['+', '-', '*', '/', '.'].includes(document.getElementById('value').value[document.getElementById('value').value.length - 1])) {
        let changeCounter = Array.from(document.getElementById('value').value);
        changeCounter.pop();
        changeCounter.push(`${element.id}`);
        document.getElementById('value').value = changeCounter.join('');
        
        // return;
    } else if (element.id === '-' && document.getElementById('value').value == "") {
        document.getElementById('value').value += `${element.id}`;
    } else if (document.getElementById('value').value != "") {
        document.getElementById('value').value += `${element.id}`;
    }
    checkDot = true;
    checkZero = false;
}

function CountResult() {
    if (document.getElementById('value').value != '' && ['+', '-', '*', '/'].includes(document.getElementById('value').value[document.getElementById('value').value.length - 1]) == false) {
        document.getElementById('value').value = eval(document.getElementById('value').value);
    } else {
        alert("Invalid Input!");
    }
    checkDot = true;
    checkZero = false;
}

function checkForDuplicates(array) {
    return new Set(array).size !== array.length;
}