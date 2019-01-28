"use strict";
(function() {
  var body = document.body,
    box = document.getElementById("box"),
    inbox = document.getElementById("inbox"),
    p = inbox.children[0],
    textarea = p.children[0],
    clone = document.createElement("em"),
    shining = document.createElement("em"),
    shininginner = document.createElement("em"),
    guide = document.querySelector(".guide"),
    maxrotatey = 15,
    currentpercent = 0,
    areawidth,
    areaheight;

  p.appendChild(clone);

  shining.className = "shining";
  shining.appendChild(shininginner);
  p.appendChild(shining);

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
  tilt(0);

  function move(e) {
    var x,
      halfwidth = areawidth / 2;
    if (e.alpha || e.beta || e.gamma) {
      if (!window.orientation || window.orientation == 180) {
        x = e.gamma;
      } else {
        x = 0 > window.orientation ? -e.beta : e.beta;
      }
      x = areawidth * (Math.max(-30, Math.min(30, x)) + 30) / 60;
    } else {
      x = e.pageX;
    }
    currentpercent = ((x || 0) - halfwidth) / halfwidth;
    currentpercent *= -1;
    tilt(currentpercent);
    e.preventDefault();
  }

  function tilt(percent) {
    var halfwidth = clone.offsetWidth / 2,
      left = halfwidth + halfwidth * -percent - shining.offsetWidth / 2;
    shining.style.left = left + "px";
    shininginner.style.left = -left + "px";
    box.style.transform = box.style.webkitTransform =
      "rotateY(" + maxrotatey * percent + "deg)";
  }

  function resize() {
    var gridsize, padding;

    areawidth = document.documentElement.offsetWidth;
    areaheight = document.documentElement.offsetHeight;

    gridsize = parseInt(body.style.fontSize) * 1.5;
    padding = gridsize * Math.ceil(areawidth / 2 / gridsize);
    box.style.left = box.style.top = -padding + "px";
    box.style.padding = padding + "px";
    box.style.backgroundSize = gridsize + "px " + gridsize + "px";
  }

  function copy(e) {
    clone.innerHTML = shininginner.innerHTML = textarea.value;
  }
})();