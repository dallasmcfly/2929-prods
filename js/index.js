"use strict";
(function() {
  var body = document.body,
    box = document.getElementById("box"),
    inbox = document.getElementById("inbox"),
    p = inbox.children[0],
    logo = document.createElement("div"),
    clone = document.getElementById("logo"),
    shining = document.createElement("div"),
    shininginner = document.createElement("div"),
    shine = document.createElement("img"),
    guide = document.querySelector(".guide"),
    maxrotatey = 5,
    currentpercent = 0,
    areawidth,
    areaheight;

  shining.className = "shining";
  shining.appendChild(shininginner);
  logo.appendChild(clone);
  p.appendChild(shining);
  p.appendChild(logo);
  window.addEventListener("resize", resize);

  if (
    /iphone|ipad|android/i.test(navigator.userAgent) &&
    window.DeviceOrientationEvent
  ) {
    window.addEventListener("deviceorientation", move);
    body.addEventListener("touchmove", move);
  } else {
    body.addEventListener("mousemove", move);
  }

  resize();
  copy();
  tilt(0.0);

  function move(e) {
    var x,
      halfwidth = areawidth / 2.0;
    if (e.alpha || e.beta || e.gamma) {
      if (!window.orientation || window.orientation == 180.0) {
        x = e.gamma;
      } else {
        x = 0.0 > window.orientation ? -e.beta : e.beta;
      }
      x = areawidth * (Math.max(-30.0, Math.min(30.0, x)) + 30.0) / 60.0;
    } else {
      x = e.pageX;
    }
    currentpercent = ((x || 0.0) - halfwidth) / halfwidth;
    currentpercent *= -1.0;
    tilt(currentpercent);
    e.preventDefault();
  }

  function tilt(percent) {
    var halfwidth = shining.offsetWidth / 2.0,
      left = shining.offsetWidth * -percent / 2.0;
    shining.style.left = left + "px";
    shininginner.style.left = -left + "px";
    p.style.transform = box.style.webkitTransform =
      "rotateY(" + maxrotatey * percent + "deg)";
  }

  function resize() {
    var gridsize, padding;

    areawidth = document.documentElement.offsetWidth;
    areaheight = document.documentElement.offsetHeight;

    box.style.left = box.style.top = -padding + "px";
    box.style.padding = padding + "px";
    //box.style.backgroundSize = gridsize + "px " + gridsize + "px";
  }

  function copy(e) {
    shine.src = clone.src;
    shininginner.innerHTML =
      "<img src =" + document.getElementById("logo").src + ">";
  }
})();