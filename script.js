const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
const milisecondsLabel = document.getElementById("miliseconds");

const startButton = document.getElementById("startBtn");
const stopButton = document.getElementById("stopBtn");
const pauseButton = document.getElementById("pauseBtn");
const resetButton = document.getElementById("resetBtn");

const lapList = document.getElementById("laplist");

//Smart watch variables
let minutes = 0;
let seconds = 0;
let miliseconds = 0;
let interval;

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

function startTimer() {
  interval = setInterval(updateTimer, 10);
  startButton.disabled = true;
  pauseButton.disabled = false;
}

function stopTimer() {
  clearInterval(interval);
  addToLapList();
  resetTimerData();
  startButton.disabled = false;
}

function pauseTimer() {
  clearInterval(interval);
  pauseButton.disabled = true;
}

function resetTimer() {
  clearInterval(interval);
  addToLapList();
  resetTimerData();
  startButton.disabled = false;
  // resetTimerData().disabled=true;
}

function updateTimer() {
  miliseconds++;
  if (miliseconds == 100) {
    miliseconds = 0;
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
    }
  }
  displayTimer();
}

function displayTimer() {
  milisecondsLabel.textContent = padTime(miliseconds);
  secondsLabel.textContent = padTime(seconds);
  minutesLabel.textContent = padTime(minutes);
}

//The padTime function ensures that a given number is always displayed as a two-digit string by adding a leading zero if the number is less than 10. This is useful for formatting time values (e.g., minutes, seconds, milliseconds) in a stopwatch or clock.
function padTime(time) {
  return time.toString().padStart(2, "0");
}

function resetTimerData() {
  miliseconds = 0;
  seconds = 0;
  minutes = 0;
  displayTimer();
}

function addToLapList() {
  const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(
    miliseconds
  )}`;
  const listItem = document.createElement("li");
  listItem.innerHTML = `<span>Lap ${ 
    lapList.childElementCount + 1 //this gives the lap number 1,2,3
  }: </span>${lapTime}`;
  lapList.appendChild(listItem);
}
