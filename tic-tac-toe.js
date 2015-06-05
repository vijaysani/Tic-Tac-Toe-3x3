var puzzleManager = {
    clickCounter: 0,
    clickPosition: [],
    magicSquare: [4, 9, 2, 3, 5, 7, 8, 1, 6],
    validatePattern: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    init: function() {
        puzzleManager.clickEvents();
    },
    clickEvents: function() {
        var elements = document.getElementsByClassName("square");
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener("click", puzzleManager.begin, false);
        }
    },
    begin: function(ev) {
        ev.preventDefault();
        var ids = ev.target.id;
        if (document.getElementById(ids).innerHTML == '') {
            puzzleManager.clickCounter++;
            puzzleManager.clickPosition.length = 9;
            if (puzzleManager.clickCounter % 2 == 0) {
                document.getElementById(ids).innerHTML = "X"
                puzzleManager.clickPosition[ids - 1] = 2;
            } else {
                document.getElementById(ids).innerHTML = "O"
                puzzleManager.clickPosition[ids - 1] = 1;
            }
            if (puzzleManager.clickCounter >= 5) {
                puzzleManager.validate();
            }
        }
    },
    validate: function() {
        for (j = 0; j < puzzleManager.validatePattern.length; j++) {
            var sum = puzzleManager.clickPosition[puzzleManager.validatePattern[j][0]] + puzzleManager.clickPosition[puzzleManager.validatePattern[j][1]] + puzzleManager.clickPosition[puzzleManager.validatePattern[j][2]];
            if (sum == 3) {
                alert("player 1 Won");
                puzzleManager.detachClick()
            }
            if (sum == 6) {
                alert("player 2 Won");
                puzzleManager.detachClick()
            }
        }
    },
    detachClick: function() {
        var elements = document.getElementsByClassName("square");
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].removeEventListener) { // For all major browsers, except IE 8 and earlier
                elements[i].removeEventListener("click", puzzleManager.begin, false);
            } else if (elements[i].detachEvent) { // For IE 8 and earlier versions
                elements[i].detachEvent("click", puzzleManager.begin, false);
            }
        }
    }
}
puzzleManager.init();