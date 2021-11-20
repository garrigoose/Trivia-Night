// Variables
// jQuery
let startscreen = $("#start-screen");
let categoriesscreen = $("#categories-screen");
let gamescreen = $("#game-screen");
let finalscreen = $("#final-screen");

// load conditions
categoriesscreen.hide();
gamescreen.hide();
finalscreen.hide();
$("#question-box").hide();

// state
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
let darkMode = false;

// functions
const regexReplacer = function (str) {
  return str
    .replace(/\&quot\;/g, '"')
    .replace(/\&\#039\;/g, "'")
    .replace(/\&eacute\;/g, "e")
    .replace(/\&uuml\;/g, "u")
    .replace(/\&amp\;/g, "&")
    .replace(/\&ldquo\;\;/g, '"');
};

const randomAns = function (array) {
  $("ol").text("");
  // fischer-yates algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  for (let i = 0; i < array.length; i++) {
    let darkAnswers = darkMode
      ? "dark-mode-answers answer-buttons idk"
      : "answer-buttons";
    $("ol").append(
      `<li><button value ='${answers[i]}'class="${darkAnswers}">${answers[i]}</button></li>`
    );
    $("answer-buttons").hover(() => {
      $("answer-buttons").css("border", "whitesmoke");
    });
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
};

// events

$("#name-enter").submit((e) => {
  e.preventDefault();
  player.name = e.originalEvent.submitter.previousElementSibling.value;
  $("#team-name-display").text(`${player.name}`);
});

$("#name-input").on("keypress", (e) => {
  if (e.which == 13) {
    e.preventDefault();
    player.name = e.currentTarget.value;
    $("#team-name-display").text(`${player.name}`);
  }
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
      $("#question").text("").append(`<div id='secret-answer'>${question}: 
      ${correctAnswer}</div>`);
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

$("#dark-mode").on("click", () => {
  function modalToggle() {}
  $(document).ready(function () {
    darkMode = !darkMode;
    if (!darkMode) {
      $("#dark-mode").text("DARK");
      $("#logo").attr(
        "src",
        "https://www.pizza-shoppe.com/wp-content/uploads/2020/08/Trivia-Night-Text-Glow.png"
      );
    } else {
      $("#dark-mode").text("LIGHT");
      $("#logo").attr(
        "src",
        "https://d3qv95x7wxo28l.cloudfront.net/ilovefc/wp-content/uploads/2020/01/trivianight2.jpg"
      );
    }
    $("body").toggleClass("dark-mode-body");
    startscreen.toggleClass("dark-mode-modal");
    gamescreen.toggleClass("dark-mode-modal");
    finalscreen.toggleClass("dark-mode-modal");
    $(".buttons").toggleClass("dark-mode-buttons");
    $(".buttons").toggleClass("dark-mode-buttons:hover");
    $(".answer-buttons").toggleClass("dark-mode-answers:hover");
    $("input").toggleClass("dark-mode-input");
    $("#check").text("✓");
  });
});
