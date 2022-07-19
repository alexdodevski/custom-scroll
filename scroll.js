"use strict";

class ScrollBox {
  #SCROLLER_HEIGHT_MIN = 25;

  constructor(container) {
    this.viewport = container.querySelector(".viewport");
    this.contentBlock = container.querySelector(".content_block");
    this.init();
  }

  init() {
    // определяем высоты полученных элементов
    this.viewportHeight = this.viewport.offsetHeight;
    this.contentHeight = this.contentBlock.scrollHeight;

    // если высота контента меньше или равна высоте вьюпорта, тогда выходим из функции
    if (this.contentHeight <= this.viewportHeight) return;

    // опередляем максимальную прокрутку контента
    this.maxScroll = this.viewport.clientHeight - this.contentHeight;

    // соотношение между выостами вьюпорта и контента
    this.ratio = this.viewportHeight / this.contentHeight;

    // формируем полосу прокрутки и ползунок
    this.createScrollbar();
    // устанавливаем обработчики событий
    this.registerEventsHandler();
  }

  createScrollbar() {
    const scrollbar = document.createElement("div");
    const scroller = document.createElement("div");

    scrollbar.classList.add("scrollbar");
    scroller.classList.add("scroller");

    scrollbar.append(scroller);
    this.viewport.append(scrollbar);

    this.scrollbar = this.viewport.querySelector(".scrollbar");
    this.scroller = this.viewport.querySelector(".scroller");

    this.scrollerHeight = parseInt(this.ratio * this.viewportHeight);
    this.scrollerHeight =
      this.scrollerHeight <= this.#SCROLLER_HEIGHT_MIN
        ? this.#SCROLLER_HEIGHT_MIN
        : this.scrollerHeight;
    this.scroller.style.height = this.scrollerHeight + "px";
  }

  registerEventsHandler() {
    this.contentBlock.addEventListener("scroll", () => {
      this.scroller.style.top = this.contentBlock.scrollTop * this.ratio + "px";
    });

    this.drop = this.drop.bind(this);

    this.scroller.addEventListener("mousedown", (e) => {
      this.start = e.clientY;
      document.addEventListener("mousemove", this.drop);
    });

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", this.drop);
    });
  }

  drop(e) {
    e.preventDefault();

    let shiftScroller = this.start - e.clientY;

    this.scroller.style.top = this.scroller.offsetTop - shiftScroller + "px";

    let shiftContent = this.scroller.offsetTop / this.ratio;

    const totalHeightScroller =
      this.scroller.offsetHeight + this.scroller.offsetTop;

    const maxOffsetScroller = this.viewportHeight - this.scroller.offsetHeight;

    if (this.scroller.offsetTop < 0) this.scroller.style.top = "0px";
    if (totalHeightScroller >= this.viewportHeight)
      this.scroller.style.top = maxOffsetScroller + "px";

    this.contentBlock.scrollTo(0, shiftContent);

    this.start = e.clientY;

    console.log(shiftContent);
  }
}

const scrollBlock = document.querySelector(".container");

const scroll = new ScrollBox(scrollBlock);
