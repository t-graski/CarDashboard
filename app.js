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
speed = 0;
cpuGauge.setValue(speed);
//cpuGauge.setValueAnimated(260, 5);



window.onkeydown = function input({ keyCode }) {
  console.log(keyCode);
  if (keyCode == 87) {
    if (speed < 260)
      cpuGauge.setValueAnimated(speed += 0.5);
  }
}
setInterval(slowDown, 150);
function slowDown() {
  if (speed > 0)
    cpuGauge.setValueAnimated(speed--);
}