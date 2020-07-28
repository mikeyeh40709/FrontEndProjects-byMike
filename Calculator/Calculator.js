function insertNum(element) {
    if (element.id === '.' && document.getElementById('value').value.includes('.')) {
        return;
    }
    document.getElementById('value').value += element.id;
}

function clearAll() {
    document.getElementById('value').value = "";
}

function insertZero() {
    if (document.getElementById('value').value != "") {
        document.getElementById('value').value += '0';
    }
}

// 1.開頭是.要放0進去
// 2.換運算值要改***
// 3.開根號 / 次方
// 4.如果輸入的運算值與前一個運算值不相符,換成該運算值


function AddCounter(element) {
    if (['+', '-', '*', '/'].includes(document.getElementById('value').value[document.getElementById('value').value.length - 1])) return;

    // if (document.getElementById('value').value[document.getElementById('value').value.length - 1] != `${element.id}`) {
    //     document.getElementById('value').value.pop().push(`${element.id}`);
    // }

    if (element.id === '-' && document.getElementById('value').value == "") {
        document.getElementById('value').value += `${element.id}`;
    } else if (document.getElementById('value').value != "") {
        document.getElementById('value').value += `${element.id}`;
    }
}

function CountResult() {
    if (document.getElementById('value').value != '') {
        document.getElementById('value').value = eval(document.getElementById('value').value);
    }

}

function checkForDuplicates(array) {
    return new Set(array).size !== array.length;
}