// Variables
// jQuery
let startscreen = $("#start-screen");
let categoriesscreen = $("#categories-screen");
let gamescreen = $("#game-screen");
let finalscreen = $("#final-screen");

// load conditions
// startscreen.css("display", "none");
categoriesscreen.hide();
gamescreen.hide();
finalscreen.hide();
$("#question-box").hide();

let player = {
  name: "",
  score: 0,
};
let round = 0;
let level = "";
let answers = [];
let question = "";
let correctAnswer = "";
let questionReview = [];
// functions

const regexReplacer = function (str) {
  return str
    .replace(/\&quot\;/g, '"')
    .replace(/\&\#039\;/g, "'")
    .replace(/\&eacute\;/g, "e")
    .replace(/\&uuml\;/g, "u")
    .replace(/\&amp\;/g, "&");
};

const randomAns = function (array) {
  // fischer-yates algorithm
  $("ol").text("");
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  for (let i = 0; i < array.length; i++) {
    $("ol").append(
      `<li><button value ='${answers[i]}'class="answer-buttons">${answers[i]}</button></li>`
    );
  }
  return array;
};

const whatRound = function (round) {
  if (round <= 10) {
    level = "easy";
    return "easy";
  } else if (10 < round && round <= 20) {
    level = "medium";
    return "medium";
  } else if (20 < round && round <= 30) {
    level = "hard";
    return "hard";
  } else if (round === 31) {
    gamescreen.hide();
    finalscreen.fadeIn("slow");
    $("#final-score").text(`${player.score} Points`);
  }
};

const pageUpdate = function () {
  $(".score").text(`Score: ${player.score}`);
  $("#question").text("correct");
  $("ol").text("").fadeIn("slow");
};

const questionData = function (data) {
  let formattedQuestion = regexReplacer(data.results[0].question);
  question = regexReplacer(data.results[0].question);
  $("#category-span").text(`Category: ${data.results[0].category}`);
  $("#question").text(formattedQuestion);
  answers = data.results[0].incorrect_answers.map((answer) =>
    regexReplacer(answer)
  );
  correctAnswer = regexReplacer(data.results[0].correct_answer);
  answers.push(data.results[0].correct_answer);
  questionReview.push(`${formattedQuestion}: ${correctAnswer}`);
  console.log(`${question}: ${answers}`);
};

// events

$("#name-enter").submit((e) => {
  e.preventDefault();
  player.name = e.originalEvent.submitter.previousElementSibling.value;
  $("#team-name-display").text(`${player.name}`).fadeIn("slow");
});

$("ol").on("click", (f) => {
  $("#question-box").hide();
  $("#question-box").fadeIn("slow");
  if (f.originalEvent.target.value === correctAnswer && level === "easy") {
    player.score++;
    pageUpdate();
  } else if (
    f.originalEvent.target.value === correctAnswer &&
    level === "medium"
  ) {
    player.score += 2;
    pageUpdate();
  } else if (
    f.originalEvent.target.value === correctAnswer &&
    level === "hard"
  ) {
    player.score += 3;
    pageUpdate();
    $("#final-score").text(`${player.score} Points`);
  } else {
    $("#question").text("incorrect");
    console.log($("#question"));
    $("#question").on("click", () => {
      $("#question").hide();
      $("#question").fadeIn("slow");
      $("#question").text(`${question}: ${correctAnswer}`);
    });
    $("ol").text("");
  }
});

$("#start").on("click", () => {
  $("#question-box").hide();
  $("#question-box").fadeIn("slow");
  startscreen.fadeOut("fast");
  gamescreen.fadeIn(2000);
});

$(".load").on("click", () => {
  $("#question-box").hide();
  $("#question-box").fadeIn("slow");
  fetch(
    `https://opentdb.com/api.php?amount=1&difficulty=${level}&type=multiple`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      questionData(data);
      randomAns(answers);
    });
  round++;
  $("#round").text(`Round: ${round}/30`);
  whatRound(round);
  $("#level").text(`Level: ${whatRound(round)}`);
});

$("#play-again").on("click", () => {
  $("#question-box").hide();
  $("#question-box").fadeIn("slow");
  player.score = 0;
  round = 0;
  level = "";
  $(".score").text(`Score: ${player.score}`);
  $("#round").text(`Round: ${round}/10`);
  $("#level").text(`Level: `);
  $("#category-span").text(`Category: `);
  finalscreen.toggle();
  gamescreen.toggle();
  questionReview = "";
});
