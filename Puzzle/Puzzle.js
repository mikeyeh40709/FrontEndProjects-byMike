var two = document.getElementById('2x2');
var three = document.getElementById('3x3');
var four = document.getElementById('4x4');
var puzzleArea = document.getElementById('puzzleArea');

var blank = document.createElement('canvas');
blank.setAttribute('class', 'bg-white');

two.addEventListener('click', function () {
    clearPuzzle();
    createPuzzle(3);
});

three.addEventListener('click', function () {
    clearPuzzle();
    createPuzzle(8);
});

four.addEventListener('click', function () {
    clearPuzzle();
    createPuzzle(15);
});

function clearPuzzle() {
    puzzleArea.innerHTML = "";
}

function createPuzzle(num) {
    for (var i = 0; i < num; i++) {
        
        var canvas = document.createElement('canvas');
        if (num == 3) {
            canvas.setAttribute('width', '200');
            canvas.setAttribute('height', '200');
            blank.setAttribute('width', '200');
            blank.setAttribute('height', '200');
        } else if (num == 8) {
            canvas.setAttribute('width', '150');
            canvas.setAttribute('height', '150');
            blank.setAttribute('width', '150');
            blank.setAttribute('height', '150');
        } else if (num == 15) {
            canvas.setAttribute('width', '120');
            canvas.setAttribute('height', '120');
            blank.setAttribute('width', '120');
            blank.setAttribute('height', '120');
        }
        puzzleArea.appendChild(blank);
        puzzleArea.appendChild(canvas);
    }
}