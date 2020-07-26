function StartGame() {
    document.getElementById('start').disabled = true;
    document.getElementById('checkanswer').disabled = false;
    document.getElementById('Hide').disabled = false;
    document.getElementById('CompareBox').disabled = false;
    numbertoguess = [];

    while (numbertoguess.length < 4) {
        randomuNumber = Math.floor(Math.random() * 10).toString();
        if (numbertoguess.every(x => x != randomuNumber)) {
            numbertoguess.push(randomuNumber);
        }
    }
    numbertoguessint = numbertoguess.join('');
}

function ClearAnswerBox() {
    document.getElementById('answerbox').value = "";
}

function ClearInputBox() {
    document.getElementById('InputBox').value = "";
}

function ClearHistoryBox() {
    if (document.getElementsByTagName('span')[0].innerText != 'Guess Number') {
        // document.getElementById('historygroup').remove('div');
        document.getElementById('historygroup').innerHTML = "";
    }

}

function checkAnswer() {
    document.getElementById('answerbox').value = numbertoguessint;
}


function HideAnswer() {
    ClearAnswerBox();
}

function Reset() {
    ClearAnswerBox();
    ClearHistoryBox();
    ClearInputBox();
    document.getElementById('start').disabled = false;
    document.getElementById('checkanswer').disabled = true;
    document.getElementById('Hide').disabled = true;
    document.getElementById('CompareBox').disabled = true;
    // document.getElementById('CompareBox').disabled = false;
}

function checkForDuplicates(array) {
    return new Set(array).size !== array.length;
}

//選取input裡數字,與輸入的數字做比較

function Compare() {
    let input = document.getElementById('InputBox').value;
    let numbertoguessArray = Array.from(numbertoguess).map(x => parseInt(x, 10));
    let inputintArray = Array.from(input).map(x => parseInt(x, 10));
    let countA = 0;
    let countB = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (numbertoguessArray[i] == inputintArray[j]) {
                if (i == j) {
                    countA++;
                } else {
                    countB++;
                }
            }
        }
    }
    if (input.length != 4) {
        alert("Please enter a four-digit number!");
        ClearInputBox();
    } else if (checkForDuplicates(inputintArray)) {
        alert("Please enter a four non-duplicate digit number!");
        ClearInputBox();
    } else {
        var historygroup = document.getElementById('historygroup');
        var inputgroup = document.createElement('div');
        var inputprepend = document.createElement('div');
        var spanresult = document.createElement('span');
        var inputhistory = document.createElement('input');
        inputgroup.classList.add('input-group');
        inputprepend.classList.add('input-group-prepend');
        spanresult.classList.add('input-group-text');
        inputhistory.classList.add('form-control');
        inputhistory.classList.add('text-center');
        inputhistory.type = 'text';
        inputhistory.readOnly = 'true';
        spanresult.innerText = `${countA} A ${countB} B`;
        inputhistory.value = input;
        if (countA == 4) {
            spanresult.classList.add('bg-success');
            alert('Well done!');
            document.getElementById('CompareBox').disabled = true;
        } else {
            spanresult.classList.add('bg-danger');
            ClearInputBox();
        }

        historygroup.appendChild(inputgroup);
        inputgroup.appendChild(inputprepend);
        inputprepend.appendChild(spanresult);
        inputgroup.appendChild(inputhistory);

    }
}