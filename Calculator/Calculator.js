function insertNum(element) {
    //在尾數是零,前一個字是運算值的狀況下,輸入數字後要除掉尾數並加入該數字,再讓checkZero=true;
    if (document.getElementById('value').value[document.getElementById('value').value.length - 1] == '0' && ['+', '-', '*', '/'].includes(document.getElementById('value').value[document.getElementById('value').value.length - 2])) {
        var changeNum = Array.from(document.getElementById('value').value);
        changeNum.pop();
        changeNum.push(`${element.id}`);
        document.getElementById('value').value = changeNum.join('');
    } else {
        document.getElementById('value').value += element.id;
    }
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
    } else if (['+', '-', '*', '/'].includes(document.getElementById('value').value[document.getElementById('value').value.length - 1])) {
        var changeZero = Array.from(document.getElementById('value').value);
        changeZero.push('0');
        document.getElementById('value').value = changeZero.join('');
        checkZero = false;
    }

}

function AddCounter(element) {
    if (['+', '-', '*', '/', '.'].includes(document.getElementById('value').value[document.getElementById('value').value.length - 1])) {
        var changeCounter = Array.from(document.getElementById('value').value);
        changeCounter.pop();
        changeCounter.push(`${element.id}`);
        document.getElementById('value').value = changeCounter.join('');
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
        Swal.fire("Invalid Input!","","error");
    }
    checkZero = false;
}

function checkForDuplicates(array) {
    return new Set(array).size !== array.length;
}