const riddles = [
  {
    question: "What has to be broken before you can use it?",
    answer: "egg"
  }
];

const triviaQuestions = [
  {
    question: "What is the capital of France?",
    answer: "paris"
  }
];

let currentPin = "";

function startRiddle() {
  const r = riddles[Math.floor(Math.random() * riddles.length)];
  const html = `
    <h2>${r.question}</h2>
    <input id="answerInput" placeholder="Answer..." />
    <button onclick="checkAnswer('${r.answer}')">Submit</button>`;
  document.getElementById('questionArea').innerHTML = html;
}

function startTrivia() {
  const t = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
  const html = `
    <h2>${t.question}</h2>
    <input id="answerInput" placeholder="Answer..." />
    <button onclick="checkAnswer('${t.answer}')">Submit</button>`;
  document.getElementById('questionArea').innerHTML = html;
}

function checkAnswer(correct) {
  const userAnswer = document.getElementById("answerInput").value.toLowerCase();
  if (userAnswer === correct.toLowerCase()) {
    showLockControls();
  } else {
    alert("Incorrect! Try again.");
  }
}

function showPinPad() {
  document.getElementById("questionArea").innerHTML = "";
  document.getElementById("pinArea").style.display = "block";
  currentPin = "";
  updatePinDisplay();
}

function addDigit(d) {
  if (currentPin.length < 4) {
    currentPin += d;
    updatePinDisplay();
  }
}

function clearPin() {
  currentPin = "";
  updatePinDisplay();
}

function updatePinDisplay() {
  document.getElementById("pinDisplay").innerText = currentPin.padEnd(4, "_");
}

function submitPin() {
  if (currentPin === "7114") {
    showLockControls();
  } else {
    alert("Incorrect PIN");
    clearPin();
  }
}

function showLockControls() {
  document.getElementById("questionArea").innerHTML = "";
  document.getElementById("pinArea").style.display = "none";
  document.getElementById("lockControls").style.display = "block";
}

function sendSignal(command) {
  fetch(`https://your-arduino-api-url/send?cmd=${command}`)
    .then(() => alert(`Sent: ${command}`))
    .catch(err => alert("Failed to send command to Arduino"));
}
