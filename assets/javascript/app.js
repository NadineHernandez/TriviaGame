//Create game objects with answers
var game = {
    questionarr: [
    //question0 
        {
        question: "What is the name of Bilbo's Sword?",
        correctAnswer: 2,
        qimage: "assets/images/sting.jpg",
        answerarr: [
        "Grasper",
        "Needle",
        "Sting",
        "Orcrist",]
    },
    //question1
        {
        question: "Which dwarf was not a member of Thorin's Company",
        correctAnswer: 0,
        qimage: "assets/images/gimli.jpeg",
        answerarr : [
            "Gimli",
            "Dori",
            "Bofur",
            "Gloin",]
        },
    //question2
    {
        question: "Who killed Smaug?",
        correctAnswer: 3,
        qimage: "assets/images/bard.jpg",
        answerarr : [
            "Kili",
            "Thorin",
            "Bilbo",
            "Bard",]
        },
    //question3
    {
        question: "Who had the One Ring before Bilbo?",
        correctAnswer: 1,
        qimage: "assets/images/gollum.jpg",
        answerarr : [
            "Gandalf",
            "Gollum",
            "Thorin",
            "Bungo Baggins",]
        },
    //question4
    {
        question: "The line of Durin historically ruled over which kingdom?",
        correctAnswer: 1,
        qimage: "assets/images/erebor.jpg",
        answerarr : [
            "The Iron Hills",
            "Erebor",
            "Rivendell",
            "Dale",]
        },
    //question5
    {
        question: "Who is the ruler of Mirkwood aka Greenwood",
        correctAnswer: 2,
        qimage: "assets/images/thranduil.jpg",
        answerarr : [
            "Legolas",
            "Sauron",
            "Thranduil",
            "Elrond",]
        },
    //question6
    {
        question: "Where did Bilbo encounter Gollum?",
        correctAnswer: 0,
        qimage: "assets/images/mistymountains.jpg",
        answerarr : [
            "The Misty Mountains",
            "Erebor",
            "The Shire",
            "Lake-town",]
        },
    //question7
    {
        question: "What did Bilbo give to Bard to bargain with Thorin?",
        correctAnswer: 3,
        qimage: "assets/images/arkenstone.jpg",
        answerarr : [
            "The One Ring",
            "Orcrist",
            "Gold",
            "The Arkenstone",]
        },
    //question8
    {
        question: "What illness runs in the line of Durin?",
        correctAnswer: 2,
        qimage: "assets/images/goldsickness.jpg",
        answerarr : [
            "Love Sickness",
            "Wanderlust",
            "Gold Sickness",
            "Fading",]
        },
        //question9
    {
        question: "What is the name of Bilbo's home?",
        correctAnswer: 0,
        qimage: "assets/images/bagend.jpg",
        answerarr : [
            "Bag End",
            "Erebor",
            "Brandy Hall",
            "Took Borough",]
    }],

    //timer controls
    timer: {
        timerCount: 0,
        timerDown: (function () {
            if (!clockRunning) {
                intervalId = setInterval(function() {
                game.timer.timerCount --;
                game.timer.makeTimer();
                game.timer.timeChecker();
                }, 1000);
                clockRunning = true;
            }}),
        
        
        
        //setInterval(function() {
            //game.timer.timerCount --;
            //game.timer.makeTimer();
            //game.timer.timeChecker();
            //}, 1000),

        timerClear: (function() {
            clearInterval(intervalId);
            clockRunning = false;
        }),

        makeTimer: (function () {
            $("#timer").text("Time Remaining: " + game.timer.timerCount);
        }),

        questionSet: (function () {
            game.timer.timerCount = 15;
            game.timer.makeTimer();
        }),

        answerSet: (function () {
            game.timer.timerCount = 5;
        }),

        timeChecker: (function () {
            if (game.timer.timerCount <= 0 && feedback.style.display === "none") {
                game.timer.timerClear();
                answersTimedout ++;
                answerResult = "Times up!"
                game.main.result();
            } else if (game.timer.timerCount <= 0 && feedback.style.display === "block") {
                game.timer.timerClear();
                currentQuestion ++;
                $("#picture").empty();
                game.main.start();
            };
        }),
    },

    //questions and answers controls
    main: {
        default: (function() {
            changingContent.style.display = "none";
            game.timer.timerClear();
        }),
        //start current question
        start: (function() {
            // add if statement if questionnumber less than 9
            if (currentQuestion <= 9) {
            startButton.style.display = "none";
            changingContent.style.display = "block";
            buttonBox.style.display = "block";
            feedback.style.display = "none";
            score.style.display = "none";
            picture.style.display = "none";
            timer.style.display = "block";
            //populate question and answers for first question
            game.main.makeQuestion();
            game.main.makeButtons();
            //start timer for question
            game.timer.questionSet();
            game.timer.timerDown();
            } else if (currentQuestion > 9) {
                //end score
                game.main.score();
            };
        }),

        result: (function() {
            feedback.style.display = "block";
            $("#feedback").text("The correct answer was: " + game.questionarr[currentQuestion].answerarr[game.questionarr[currentQuestion].correctAnswer]);
            buttonBox.style.display = "none";
            timer.style.display = "none";
            picture.style.display = "block";
            $("#picture").append("<img src=" + game.questionarr[currentQuestion].qimage + ">")
            $("#question").text(answerResult);
            game.timer.answerSet();
            game.timer.timerDown();
        }),

        score: (function () {
            score.style.display = "block";
            $("#correct").text("Answers Correct: " + answersCorrect);
            $("#incorrect").text("Answers Incorrect: " + answersIncorrect);
            $("#timeup").text("Answers Timed Out: " + answersTimedout);
            buttonBox.style.display = "none";
            feedback.style.display = "none";
            question.style.display = "none";
            timer.style.display = "none";
        }),

        makeButtons: (function() {
            $("#answer1").text(game.questionarr[currentQuestion].answerarr[0]);
            $("#answer2").text(game.questionarr[currentQuestion].answerarr[1]);
            $("#answer3").text(game.questionarr[currentQuestion].answerarr[2]);
            $("#answer4").text(game.questionarr[currentQuestion].answerarr[3]);
        }),
        makeQuestion: (function() {
            $("#question").text(game.questionarr[currentQuestion].question);
        })
    },
};
var intervalId;
var clockRunning = false;
var backTime;

//chosenAnswer will equal the value of the answer button clicked to compare against correctAnswer
var chosenAnswer;
var currentQuestion = 0;

var answersCorrect = 0;
var answersIncorrect = 0;
var answersTimedout = 0;
var answerResult;

game.main.default();

$("#start").on("click", function() {
    game.main.start();
});


//on click for answer buttons to compare chosenAnswer to correctAnswer
$(".button").on("click", function() {
    chosenAnswer = parseInt($(this).val());
    console.log(chosenAnswer);
    if (chosenAnswer === game.questionarr[currentQuestion].correctAnswer) {
        answersCorrect ++;
        console.log(answersCorrect);
        game.timer.timerClear();
        answerResult = "Correct!"
    } else {
        answersIncorrect ++;
        console.log(answersIncorrect);
        game.timer.timerClear();
        answerResult = "Incorrect!"
    }
    game.main.result();
})
//if timer is 0 then timeout event