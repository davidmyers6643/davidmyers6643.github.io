userSeq = [];
simonSeq = [3, 2, 0, 1];
const NUM_OF_LEVELS = 3;
var id, color, level = 0;
var boardSound = [

    "http://www.soundjay.com/button/sounds/button-4.mp3",
    "http://www.soundjay.com/button/sounds/button-09.mp3",
    "http://www.soundjay.com/button/sounds/button-10.mp3",
    "http://www.soundjay.com/button/sounds/button-7.mp3"
];



// start the game

$(document).ready(function() {
    $(".start").click(function() {
        level++;
       simonSequence();
    })

//    user sequence

    $(".pad").click(function () {
        id = $(this).attr("id");
        color = $(this).attr("class").split(" ")[1];
        userSeq.push(id);
        console.log(id + " " + color);
        addClassSound(id, color);

//        evaluate user sequene

        if(!checkUserSeq()) {
            displayError();
            userSeq =[];
        }

//    evaluates end sequence

        if(userSeq.length == simonSeq.length && userSeq.length < NUM_OF_LEVELS) {
            level++;
            userSeq = [];
            simonSequence();
        }
//        winner check

        if(userSeq.lenth == NUM_OF_LEVELS) {
            $(".display").text("WIN");
        }
    })

})

// comparing sequence

function checkUserSeq() {
    for(var i = 0; i < userSeq.length;  i++) {
if (userSeq[i] !=  simonSeq[i]) {
    return false;
        }
    }
    return true;
}

//error display

function displayError() {
    console.log("error");
    var counter = 0;
    var myError = setInterval(function() {
        $(".display").text("XX");
        counter++;
        if(counter == 3) {
            $(".display").text(level);
            clearInterval(myError);
            userSeq = [];
            counter = 0;
        }
    }, 500);
}

// game sequence
function simonSequence() {
    console.log(level);
    $(".display").text(level);

// getRandomNum();

    var i = 0;
    var myInterval = setInterval(function () {
        id = simonSeq[i];
        color = $("#" + id).attr("class").split(" ")[1];
        console.log(id + " " + color);
        addClassSound(id, color);
        i++;
        if (i == simonSeq.length) {
            clearInterval(myInterval);
        }
    }, 1000);
}

//gen random number
function getRandomNum() {
  var random = Math.floor(Math.random() *  4);
  simonSeq.push(random);
}

//add sound & class
function addClassSound(id, color) {
    $("#" + id).addClass(color + "-active");
    playSound(id);
    setTimeout(function () {
        $("#" + id).removeClass(color + "-active")
    }, 500);
}

//play sound on board
function playSound(id) {
var sound = new Audio(boardSound[id]);
sound.play();
}



