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

  document.querySelectorAll(".swiper-hero").forEach((el) => {
    const swiper = new Swiper(el, {
      slidesPerView: 1,
      watchSlidesProgress: true,
      speed: 1500,
      loop: true,
      autoplay: {
        delay: 3000
      },

      on: {
        progress(swiper) {
          swiper.slides.forEach((slide) => {
            const slideProgress = slide.progress || 0;
            const innerOffset = swiper.width * 0.95;
            const innerTranslate = slideProgress * innerOffset;

            const slideInner = slide.querySelector(".hero-box");
            if (slideInner && !isNaN(innerTranslate)) {
              slideInner.style.transform = `translate3d(${innerTranslate}px, 0, 0)`;
            }
          });
        },
        touchStart(swiper) {
          swiper.slides.forEach((slide) => {
            slide.style.transition = "";
          });
        },
        setTransition(swiper, speed) {
          const easing = "cubic-bezier(0.25, 0.1, 0.25, 1)";

          swiper.slides.forEach((slide) => {
            slide.style.transition = `${speed}ms ${easing}`;
            const slideInner = slide.querySelector(".hero-box");
            if (slideInner) {
              slideInner.style.transition = `${speed}ms ${easing}`;
            }
          });
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
