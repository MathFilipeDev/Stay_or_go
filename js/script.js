function updateTime() {
    console.log("JS funcionando");

  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  const timeString = hours + ":" + minutes;

  const timeElement = document.getElementById("time");
  timeElement.textContent = timeString;

  const body = document.body;

  if (hours >= 6 && hours < 12) {
    body.className = "morning";
  } else if (hours >= 12 && hours < 18) {
    body.className = "afternoon";
  } else {
    body.className = "night";
  }
}

updateTime();
setInterval(updateTime, 1000);
