"use strict";
const scroll = document.querySelector(".scroller");
const block = document.querySelector(".scroll_block");
const blockContent = document.querySelector(".block_content");

scroll.addEventListener("mousedown", function (e) {
  scroll.ondragstart = function () {
    return false;
  };
  let shiftY = e.clientY - scroll.getBoundingClientRect().top;

  scroll.style.zIndex = "1000";

  const blockTop = blockContent.getBoundingClientRect().top;

  function moveAt(y) {
    block.style.userSelect = "none";

    let top = y - blockTop - shiftY;

    if (top < 0) {
      console.log("hi top");
      top = 0;
    }
    if (top + scroll.offsetHeight > blockContent.offsetHeight) {
      console.log(blockContent.offsetHeight);
      top = blockContent.clientHeight - scroll.offsetHeight;
    }
    scroll.style.top = top + "px";
  }

  function onMouseMove(e) {
    moveAt(e.clientY);
  }

  document.addEventListener("mousemove", onMouseMove);

  document.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    block.style.userSelect = "text";
    document.onmouseup = null;
  };
});

blockContent.addEventListener("scroll", function (e) {
  console.log(e);
});
