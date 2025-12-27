import { preloadImages } from "../../libs/utils.js";
import { customDropdown } from "../../js/index/global.js";
("use strict");
$ = jQuery;

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

function hero() {
  if ($("section.hero").length < 1) return;

  $(".hero-slider").each(function () {
    let $slider = $(this);

    let $dataSpeed;
    let $dataLoop = $slider.attr("data-loop");
    let $dataAutoplay = $slider.data("autoplay")
      ? { delay: $slider.data("autoplay") }
      : $slider.data("autoplay");
    if ($slider.is("[data-speed]")) {
      $dataSpeed = $slider.data("speed");
    } else {
      $dataSpeed = 900; // by default
    }

    new Swiper($slider[0], {
      direction: "vertical",
      speed: $dataSpeed,
      loop: $dataLoop,
      autoplay: $dataAutoplay,
      preloadImages: true,
      parallax: true,
      lazy: {
        loadPrevNext: true
      },
      allowTouchMove: false,
      simulateTouch: false,
      mousewheel: false,
      pagination: {
        el: ".hero .swiper-pagination",
        clickable: false,
        renderBullet: function (i, className) {
          return `
            <button class="${className}">
            <svg class="progress" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle class="circle-origin" cx="14" cy="14" r="13" stroke="white"/>
            </svg>
            </button>`;
        }
      },
      navigation: {
        nextEl: ".hero .swiper-button-next",
        prevEl: ".hero .swiper-button-prev"
      },
      on: {
        init: function () {
          let $this = this;
          $($this.slides[$this.activeIndex]);
        }
      }
    });
  });

  gsap.utils.toArray("[effect-title]").forEach((description) => {
    const delay = parseFloat(description.getAttribute("data-delay")) || 0;

    const split = new SplitText(description, {
      type: "lines",
      linesClass: "line",
      mask: "lines"
    });

    gsap.fromTo(
      split.lines,
      { yPercent: 100, willChange: "transform" },
      {
        yPercent: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.05,
        delay: delay
      }
    );
  });
}

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  customDropdown();
  hero();
};
preloadImages("img").then(() => {
  init();
});

let isLinkClicked = false;
$("a").on("click", function (e) {
  if (this.href && !this.href.match(/^#/) && !this.href.match(/^javascript:/)) {
    isLinkClicked = true;
  }
});

$(window).on("beforeunload", function () {
  if (!isLinkClicked) {
    $(window).scrollTop(0);
  }
  isLinkClicked = false;
});
