// Variables
// jQuery
let startscreen = $("#start-screen");
let categoriesscreen = $("#categories-screen");
let gamescreen = $("#game-screen");
let finalscreen = $("#final-screen");

// load conditions
// startscreen.css("display", "none");
categoriesscreen.css("display", "none");
gamescreen.css("display", "none");
finalscreen.css("display", "none");

let player = {
  name: "",
  score: 0,
};
let round = 0;
let level = "";
let answers = [];
let correctAnswer = "";
const categories = {
  1: ["History", 23],
  2: ["Music", 12],
  3: ["Film", 11],
  4: ["Sports", 21],
  5: ["Books", 10],
  6: ["Computers", 18],
};
// functions
const randomCat = function () {
  const rndInt = Math.floor(Math.random() * 6) + 1;
  return categories[rndInt][1];
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
    gamescreen.css("display", "none");
    finalscreen.css("display", "");
  }
};

const pageUpdate = function () {
  $(".score").text(`Score: ${player.score}`);
  $("#question").text("correct");
  $("ol").text("");
};

const questionData = function (data) {
  $("#category-span").text(`Category: ${data.results[0].category}`);
  $("#question").text(data.results[0].question);
  answers = data.results[0].incorrect_answers;
  answers.push(data.results[0].correct_answer);
  correctAnswer = data.results[0].correct_answer;
};

// events

$("#name-enter").submit((e) => {
  e.preventDefault();
  player.name = e.originalEvent.submitter.previousElementSibling.value;
  $("#team-name-display").text(`${player.name}`);
});

$("ol").on("click", (f) => {
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
    $("ol").text("");
  }
});

$("#start").on("click", () => {
  startscreen.toggle();
  gamescreen.toggle();
});

$(".load").on("click", () => {
  fetch(
    `https://opentdb.com/api.php?amount=1&category=${randomCat()}&difficulty=${level}&type=multiple`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      questionData(data);
      randomAns(answers);
      console.log(correctAnswer);
    });
  round++;
  $("#round").text(`Round: ${round}/30`);
  whatRound(round);
  $("#level").text(`Level: ${whatRound(round)}`);
});

$("#play-again").on("click", () => {
  player.score = 0;
  $(".score").text(`Score: ${player.score}`);
  round = 0;
  $("#round").text(`Round: ${round}/10`);
  level = "";
  $("#level").text(`Level: `);
  $("#category-span").text(`Category: `);
  finalscreen.toggle();
  gamescreen.toggle();
});
