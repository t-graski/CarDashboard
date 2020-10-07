const Gauge = window.Gauge;

let cpuGauge = Gauge(document.getElementById("speedC"), {
  max: 260,

  label: function (value) {
    return Math.round(value) + " km/h";
  },
  value: 50,

  color: function (value) {
    if (value < 80) {
      return "#5ee432";
    } else if (value < 150) {
      return "#fffa50";
    } else if (value < 200) {
      return "#f7aa38";
    } else {
      return "#ef4655";
    }
  },
});
let cpuGaug2 = Gauge(document.getElementById("batteryC"), {
  max: 100,

  label: function (value) {
    return Math.round(value) + "%";
  },
  value: 50,

  color: function (value) {
    if (value < 10) {
      return "ff1717";
    } else if (value < 50) {
      return "#ffa523";
    } else if (value < 101) {
      return "#09ff00";
    } else {
      return "#ef4655";
    }
  },
});
speed = 0;
battery = 100;
let isBrake = false;
cpuGauge.setValue(speed);
cpuGaug2.setValue(battery)

window.onkeydown = function input({ keyCode }) {
  if (keyCode == 81) {
    if (!leftBlink) {
      left();
      leftNormalID = setInterval(leftNormal, 500);
      leftID = setInterval(left, 1000);
      leftBlink = true;
    } else {
      clearInterval(leftNormalID);
      clearInterval(leftID);
      leftNormal();
      leftBlink = false;
    }
  }
  if (keyCode == 69) {
    if (!rightBlink) {
      right();
      rightNormalID = setInterval(rightNormal, 500);
      rightID = setInterval(right, 1000);
      rightBlink = true;
    } else {
      clearInterval(rightNormalID);
      clearInterval(rightID);
      rightNormal();
      rightBlink = false;
    }
  }
  if (keyCode == 83) {
    if (speed > 0 && !isBrake)
      isBrake = true;
      brakeID = setInterval(brake, 175);
  }
  console.log(keyCode);
  if (battery > 0) {
    if (keyCode == 87) {
      isBrake = false;
      if (speed < 260)
        cpuGauge.setValueAnimated(speed += 0.5);
    }
  }
}
setInterval(slowDown, 150);
function slowDown() {
  if (speed >= 0)
    cpuGauge.setValueAnimated(speed--);
}
function brake() {
  if (speed > 0 && isBrake) {
    cpuGauge.setValueAnimated(speed -= .4); 
  } 
  if(speed < 0) {
    isBrake = false;
  }
}

setInterval(reduceBatteryPercentage, 5000);

function reduceBatteryPercentage() {
  if (battery > 0) {
    if (speed > 10 && speed < 100) {
      cpuGaug2.setValueAnimated(battery -= 1);
    } else if (speed > 100 && speed < 200) {
      cpuGaug2.setValueAnimated(battery -= 1.5);
    } else if (speed > 200) {
      cpuGaug2.setValueAnimated(battery -= 2);
    }
  }
}
function time() {
  const date = new Date();
  document.querySelector('#time').innerHTML = date.getMinutes() < 10 ? date.getHours() + ":0" + date.getMinutes() : date.getHours() + ":" + date.getMinutes();
}
function date() {
  const date = new Date();
  document.querySelector('#date').innerHTML = date.getDate() + "/" + Number(date.getMonth() + 1) + "/" + date.getFullYear()
}
function welcome() {
  const date = new Date();
  if (date.getHours() > 5 && date.getHours() < 13)
    document.querySelector('#header').innerHTML = 'Good Morning';
  if (date.getHours() > 13 && date.getHours < 18)
    document.querySelector('#header').innerHTML = 'Good Afternoon';
  if (date.getHours() > 18 && date.getHours() < 23)
    document.querySelector('#header').innerHTML = 'Good Evening'
  if ((date.getHours() == 24) || (date.getHours > 0 && date.getHours() < 5))
    document.querySelector('#header').innerHTML = 'Good Night';
}
async function loadTemperature() {
  try {
    const response = await fetch('http://api.openweathermap.org/data/2.5/forecast?id=7872055&appid=a8bbcfc9596bfb46e4a044c64db39297');
    if (response.ok) {
      const body = await response.json();
      document.querySelector('#temp').innerHTML = Math.round(((body.list[0].main.temp - 273.15) + Number.EPSILON) * 100) / 100 + "°C"
    }
  } catch (error) {

  }
}
setInterval(date, 10);
setInterval(time, 10);

let rightBlink = false;
let leftBlink = false;

let leftNormalID;
let leftID;

let rightNormalID;
let rightID;

let brakeID;

function left() {
  document.querySelector('#lArrow').src = 'arrow_yellow.png';
}
function leftNormal() {
  document.querySelector('#lArrow').src = 'arrow.png';
}
function right() {
  document.querySelector('#rArrow').src = 'arrow_yellow.png';
}
function rightNormal() {
  document.querySelector('#rArrow').src = 'arrow.png';
}