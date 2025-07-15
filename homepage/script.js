
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, ScrollSmoother);

if (window.innerWidth >= 992) {
  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    effects: true
  });
}

document.addEventListener('DOMContentLoaded', () => {

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


  const counters = document.querySelectorAll('.short-brief-count');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => {
          const target = +counter.dataset.count;
          const suffix = counter.dataset.splitend || '';
          let current = 0;
          const increment = Math.ceil(target / 100);

          const updateCount = () => {
            if (current < target) {
              current += increment;
              counter.innerText = (current < target ? current : target) + suffix;
              setTimeout(updateCount, 20);
            } else {
              counter.innerText = target + suffix;
            }
          };

          updateCount();
        });

        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.querySelector('.short-brief-card'));
});


let hasTriggered = false;
gsap.set(".homeContainer", { opacity: 0, pointerEvents: "none" });
gsap.set(".left-text p", { opacity: 0, y: 50, filter: "blur(4px)" });
gsap.set(".right-img img", { opacity: 0, y: 80, filter: "blur(6px)" });
const words = ["Bond", "Protect", "Endure"];

function animateWords() {
  gsap.to(".homeContainer", {
    opacity: 1,
    pointerEvents: "auto",
    duration: 0.5,
    ease: "power2.out",
    onComplete: () => {
      gsap.fromTo(".left-text p",
        { y: 200, opacity: 0, filter: "blur(1px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 2.5,
          ease: "power3.out",
          stagger: 0.1
        });
    }
  });
}

animateWords();
let wordIndex = 0;
let isAnimating = false;
let hasPausedForIndex4 = false;

const scrollWordTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".homeContainer",
    start: "top top",
    end: "+=3000",
    scrub: true,
    pin: true,
    id: "wordScroll",
    onUpdate: (self) => {
      const progress = self.progress;
      const totalWords = words.length;
      const step = 1 / totalWords;
      const currentIndex = Math.min(totalWords - 1, Math.floor(progress / step));
      const direction = self.direction;

      if (currentIndex === 4 && !hasPausedForIndex4) {
        hasPausedForIndex4 = true;
        self.disable();
        isAnimating = true;

        setTimeout(() => {
          self.enable();
          isAnimating = false;
        }, 5000);
        return;
      }

      if (currentIndex !== wordIndex && !isAnimating) {
        isAnimating = true;

        const current = document.querySelector(".word-current");
        const next = document.querySelector(".word-next");

        next.textContent = words[currentIndex];
        const h1 = Math.floor(Math.random() * 360);
        const h2 = (h1 + 60) % 360;
        const gradient = `linear-gradient(to right, hsl(${h1}, 70%, 35%), hsl(${h2}, 70%, 40%))`;
        next.classList.add("gradient-text");
        next.style.backgroundImage = gradient;

        gsap.set(next, { y: "100%", opacity: 0 });

        const tl = gsap.timeline({
          onComplete: () => {
            current.classList.remove("word-current");
            current.classList.add("word-next");
            next.classList.remove("word-next");
            next.classList.add("word-current");
            isAnimating = false;
            wordIndex = currentIndex;
          }
        });

        tl.to(current, {
          y: direction === 1 ? -200 : 200,
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut"
        }, 0);

        tl.fromTo(next,
          { y: direction === 1 ? "500%" : "-300%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.6, ease: "power2.inOut" }, 0);
      }
    }
  }
});


gsap.set(".img-overlay img", {
  scale: 1
});

gsap.timeline({
  scrollTrigger: {
    trigger: ".img-reveal",
    start: "top top",
    end: "bottom",
    scrub: true,
    pin: true,
    anticipatePin: 1,
    markers: false
  }
})
  .to(".img-overlay img", {
    scale: 4,
    duration: 1,
    ease: "power3.out"
  });


const images1 = gsap.utils.toArray('.gallery-container img');

const showDemo = () => {
  document.body.style.overflow = 'auto';
  document.scrollingElement.scrollTo(0, 0);
  gsap.to(document.querySelector('.loader'), { autoAlpha: 0 });

  gsap.utils.toArray('section').forEach((section, index) => {
    const w = section.querySelector('.wrapper');
    if (!w) return;

    const [x, xEnd] = (index % 2)
      ? ['100%', (w.scrollWidth - section.offsetWidth) * -1]
      : [w.scrollWidth * -1, 0];

    gsap.fromTo(w, { x }, {
      x: xEnd,
      scrollTrigger: {
        trigger: section,
        scrub: 0.5
      }
    });
  });
  setupImageGridScrollAnimations()
}

imagesLoaded(images1).on('always', showDemo);

// industries we server section
if (window.innerWidth >= 992) {

  window.addEventListener('load', () => {

    const tlCustom = gsap.timeline({
      scrollTrigger: {
        trigger: ".industries-we-serve-section-main",
        start: "top top",
        end: () => "+=" + document.querySelector(".industries-we-serve-content").offsetHeight * 2.5,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Your existing animations
    tlCustom.to(".industries-we-serve-circle-bg", {
      scale: 4,
      xPercent: 10,
      transformOrigin: "center center",
      ease: "none"
    }, 0);

    tlCustom.to(".industries-we-serve-image-wrapper", {
      xPercent: 20,
      ease: "none"
    }, 0);

    tlCustom.to(".industries-we-serve-top-left", {
      yPercent: -1600,
      opacity: 0,
      ease: "none"
    }, 0);

    tlCustom.to(".industries-we-serve-bottom-right", {
      yPercent: 1600,
      opacity: 0,
      ease: "none"
    }, 0);

    tlCustom.fromTo(".industries-we-serve-content",
      {
        yPercent: 100,
        borderTopRightRadius: 350,
      },
      {
        yPercent: 0,
        borderTopRightRadius: 0,
        ease: "power2.out"
      },
      0.9
    );

    tlCustom.from(".industries-we-serve-content-inner", {
      y: 950,
      duration: 1,
      ease: "power2.out"
    }, 2);

    // Curtain reveal animation for "We Serve"
    // tl.from(".industries-we-serve-weServe", {
    //   width: 0,  // Start with zero width (hidden)
    //   opacity: 0,  // Make it hidden initially
    //   transformOrigin: "center center", // Set the transformation to start from the center
    //   duration: 1,
    //   ease: "power2.out"
    // }, 2.5);

    // tl.to(".industries-we-serve-weServe", {
    //   width: "auto",  // Expand the width to reveal the text
    //   opacity: 1,  // Fade in the text
    //   duration: 1,
    //   ease: "power2.out"
    // }, 3);

  });

}

const images = [
  "./homepage/images/industries_we_serve/automotive.webp",
  "./homepage/images/industries_we_serve/aerospace.webp",
  "./homepage/images/industries_we_serve/electronics.webp",
  "./homepage/images/industries_we_serve/medical.webp",
  "./homepage/images/industries_we_serve/ev_vehicles.webp",
  "./homepage/images/industries_we_serve/fastners.webp",
  "./homepage/images/industries_we_serve/railways.webp",
  "./homepage/images/industries_we_serve/mining.webp",
  "./homepage/images/industries_we_serve/marine.webp",
];

function changeImage(index) {
  const allCards = document.querySelectorAll('.industries-we-serve-sec-3-new-card');
  allCards.forEach(card => card.classList.remove('active'));
  allCards[index].classList.add('active');

  const img = document.getElementById('industries-we-serve-sec-3-new-main-image');
  img.src = images[index];
}

const mobileImages = [
  "./homepage/images/industries_we_serve/automotive.webp",
  "./homepage/images/industries_we_serve/aerospace.webp",
  "./homepage/images/industries_we_serve/electronics.webp",
  "./homepage/images/industries_we_serve/medical.webp",
  "./homepage/images/industries_we_serve/ev_vehicles.webp",
  "./homepage/images/industries_we_serve/fastners.webp",
  "./homepage/images/industries_we_serve/railways.webp",
  "./homepage/images/industries_we_serve/mining.webp",
  "./homepage/images/industries_we_serve/marine.webp",
];

function changeImageMobile(index) {
  const allCards = document.querySelectorAll('.industries-we-serve-mobile-card');
  allCards.forEach(card => card.classList.remove('active'));
  allCards[index].classList.add('active');

  const img = document.getElementById('industries-we-serve-mobile-image');
  img.src = mobileImages[index];

  document.getElementById('industries-we-serve-mobile-image').scrollIntoView({ behavior: 'smooth' });

}

window.addEventListener('load', () => {

  // gsap.to(".text-overlay h1", {
  //   rotate: 0,
  //   opacity: 1,
  //   duration: 1,
  //   delay: 0.5,
  //   ease: "power4.out",
  //   stagger: 0.25,
  //   scrollTrigger: {
  //     trigger: ".text-overlay",
  //     start: "top 80%",
  //     toggleActions: "play reverse play reverse"
  //   }
  // });



  const mainSection = document.querySelector(".made-in-sec-main-section");
  const gradientOverlay = document.querySelector(".made-in-sec-gradient-overlay");
  const revealCircle = document.querySelector(".made-in-sec-reveal-circle");

  const textGroup = document.querySelector(".made-in-sec-text-group");


  const maxRadiusPx = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);

  // ✅ Set initial mask and reveal circle position
  gradientOverlay.style.webkitMaskImage = `radial-gradient(circle 80px at center, transparent 99%, black 100%)`;
  gradientOverlay.style.maskImage = `radial-gradient(circle 80px at center, transparent 99%, black 100%)`;
  revealCircle.style.transform = `scale(${80 / 40})`;

  if (window.innerWidth < 480) {
    revealCircle.style.transform = `scale(${80 / 20})`; // Adjust for smaller screens
    gradientOverlay.style.webkitMaskImage = `radial-gradient(circle 40px at center, transparent 99%, black 100%)`;
    gradientOverlay.style.maskImage = `radial-gradient(circle 40px at center, transparent 99%, black 100%)`;
  }

  ScrollTrigger.create({
    trigger: mainSection,
    start: "top top",
    end: "+=100%",  // Pin for 1 viewport height, adjust if needed
    scrub: true,
    pin: true,

    onUpdate: (self) => {
      const progress = self.progress;
      const clampedProgress = Math.min(Math.max(progress, 0), 1);

      // Animate radius from small to large
      const radiusPx = 80 + clampedProgress * (maxRadiusPx - 80);

      // Use mask: transparent inside circle (reveals video), black outside (gradient overlay visible)
      gradientOverlay.style.webkitMaskImage = `radial-gradient(circle ${radiusPx}px at center, transparent 99%, black 100%)`;
      gradientOverlay.style.maskImage = `radial-gradient(circle ${radiusPx}px at center, transparent 99%, black 100%)`;

      // Scale revealCircle div accordingly (optional)
      const scale = radiusPx / 40;  // base radius half of 80px
      revealCircle.style.transform = `scale(${scale})`;
    },
  });



  gsap.to(textGroup, {
    y: "-200px",
    opacity: 0,
    duration: 0.02,
    ease: "power1.out",
    scrollTrigger: {
      trigger: mainSection,
      start: "top top",
      scrub: true,
    },
  });




  /* ── STEP DATA ──────────────────────────────────────────────────────── */
  const steps = [
    {
      heading: "Invisible",
      text: "So strength didn’t come at the cost of clarity.",
      leftImage: "./homepage/images/what_if_imges/Card 100.png",
      rightImage: "./homepage/images/what_if_imges/Card 101.png"
    },
    {
      heading: "Instant",
      text: "So your process never had to wait for performance.",
      leftImage: "./homepage/images/what_if_imges/Card 2.1.webp",
      rightImage: "./homepage/images/what_if_imges/Card 2.2.webp"
    },
    {
      heading: "Unbreakable",
      text: "So you could trust every joint—no matter the challenge.",
      leftImage: "./homepage/images/what_if_imges/Card 3.1.webp",
      rightImage: "./homepage/images/what_if_imges/Card 3.2.webp"
    },
    {
      heading: "Smart",
      text: "So bonding adapted to materials, environments, and expectations.",
      leftImage: "./homepage/images/what_if_imges/Card 4.1.webp",
      rightImage: "./homepage/images/what_if_imges/Card 4.2.webp"
    },
    {
      heading: "Versatile",
      text: "So one adhesive could serve industries, not just applications.",
      leftImage: "./homepage/images/what_if_imges/Card 5.1.webp",
      rightImage: "./homepage/images/what_if_imges/Card 5.2.webp"
    },
  ];

  /* ── DOM SHORTCUTS ──────────────────────────────────────────────────── */
  const blueDot = document.getElementById("what-if-blueDot");
  const numberSpan = document.getElementById("what-if-stepNumber");
  const centerHeading = document.getElementById("what-if-centerHeading");
  const centerText = document.getElementById("what-if-centerText");
  const leftImage = document.getElementById("what-if-leftImage");
  const rightImage = document.getElementById("what-if-rightImage");
  const verticalLine = document.getElementById("what-if-verticalLine");

  /* ── CONTENT SWAP UTILITY ───────────────────────────────────────────── */
  let currentStep = 0;

  function swapContent(stepIndex) {
    if (stepIndex === currentStep) return;
    currentStep = stepIndex;

    const s = steps[stepIndex];

    // fade out content before swap
    const tl = gsap.timeline();
    tl.to([centerHeading, centerText, verticalLine], { opacity: 0, duration: 0.3 })

      .to([leftImage, rightImage], {
        opacity: 0,
        scale: 0.8,
        duration: 0.25
      })

      .set(leftImage, { attr: { src: s.leftImage } })
      .set(rightImage, { attr: { src: s.rightImage } })

      .to([leftImage, rightImage], {
        opacity: 1,
        scale: 1,
        duration: 0.25
      })

      .add(() => {
        numberSpan.textContent = stepIndex + 1;
        centerHeading.textContent = s.heading;
        centerText.textContent = s.text;
      })

      .to([centerHeading, centerText, verticalLine], {
        opacity: 1,
        duration: 0.5
      });
  }

  /* ── INITIAL STATE ──────────────────────────────────────────────────── */
  gsap.set(blueDot, { xPercent: -50, yPercent: -50 });
  swapContent(0); // Set first step properly

  /* ── MASTER TIMELINE ────────────────────────────────────────────────── */
  const master = gsap.timeline({
    scrollTrigger: {
      trigger: "#what-if-arcSection",
      start: "top top",
      end: () => `+=${steps.length * window.innerHeight}`,
      scrub: true,
      pin: true,
      snap: {
        snapTo: value => {
          const segments = steps.length - 1;
          return Math.round(value * segments) / segments;
        },
        duration: 0.3,
        ease: "power1.inOut"
      },
      onUpdate: self => {
        const progress = self.progress;
        const step = Math.round(progress * (steps.length - 1));
        if (step !== currentStep) {
          swapContent(step);
        }
      }
    }
  });

  /* ── DOT MOTION PATH PER STEP ───────────────────────────────────────── */
  for (let i = 0; i < steps.length - 1; i++) {
    master.to(blueDot, {
      duration: 3,
      motionPath: {
        path: "#what-if-entryArcPath",
        align: "#what-if-entryArcPath",
        alignOrigin: [0.5, 0.5],
        autoRotate: false
      },
      ease: "power1.inOut"
    });
  }
});

// products built to stick section
function initHorizontalScroll() {
  const isDesktop = window.innerWidth > 991;
  const section = document.querySelector("#productSection");
  const scrollWrapper = document.querySelector(".scroll-wrapper");


  gsap.set(section, { clearProps: 'all' });
  gsap.set(scrollWrapper, { clearProps: 'all' });

  if (isDesktop) {
    const scrollLength = section.scrollWidth - window.innerWidth;
    const horizontalTween = gsap.to(section, {
      x: () => -scrollLength,
      ease: "none",
      scrollTrigger: {
        trigger: scrollWrapper,
        start: "top top",
        end: () => "+=" + scrollLength,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      }
    });

    setupHeadings(horizontalTween);
  } else {
    setupHeadings(); // no containerAnimation for mobile
  }
}

let lastScrollTop = 0;
let scrollDir = "down";

window.addEventListener("scroll", () => {
  const st = window.pageYOffset || document.documentElement.scrollTop;
  scrollDir = st > lastScrollTop ? "down" : "up";
  lastScrollTop = st <= 0 ? 0 : st;
}, false);



function setupHeadings(horizontalTween) {
  const isDesktop = window.innerWidth > 991;
  const productRevealer = document.querySelector(".product-revealer");
  const targetWidth = productRevealer.scrollWidth;

  // Clear previous letters to avoid duplication
  document.querySelectorAll(".heading p").forEach((p) => {
    const chars = p.textContent.trim().split("");
    p.innerHTML = chars.map(c => `<span class="letter">${c === ' ' ? '&nbsp;' : c}</span>`).join("");
  });

  // Product Revealer Animation – Always replays
  ScrollTrigger.create({
    trigger: productRevealer,
    containerAnimation: isDesktop ? horizontalTween : undefined,
    start: "left center",
    onEnter: () => animateProductRevealer(),
    onEnterBack: () => animateProductRevealer(),
    onLeave: () => resetProductRevealer(),
    onLeaveBack: () => resetProductRevealer(),
  });

  function animateProductRevealer() {
    gsap.fromTo(productRevealer, {
      width: 0,
      opacity: 0,
    }, {
      width: targetWidth,
      opacity: 1,
      duration: 0.75,
      ease: "power2.out",
      overwrite: "auto"
    });
  }

  function resetProductRevealer() {
    gsap.set(productRevealer, { width: 0, opacity: 0 });
  }
  document.querySelectorAll(".heading p").forEach((p) => {
  const letters = p.querySelectorAll(".letter");

  ScrollTrigger.create({
    trigger: p,
    containerAnimation: isDesktop ? horizontalTween : undefined,
    start: "top 90%",
    onEnter: (self) => {
      if (scrollDir === "down") {
        animateLetters(letters, "enter");
      }
    },
    onEnterBack: () => animateLetters(letters, "reverse"),
    onLeave: () => resetLetters(letters, "onleave"),
    onLeaveBack: () => resetLetters(letters, "leave back"),
  });
});


  function animateLetters(letters, action) {
    console.log(action)
    gsap.fromTo(letters, {
      opacity: 0,
      y: 30,
      scale: 0.9
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.04,
      duration: 0.35,
      ease: "back.out(1.7)",
      overwrite: "auto"
    });
  }

  function resetLetters(letters) {
    gsap.set(letters, { opacity: 0 });
  }
}



window.addEventListener("load", () => {
  initHorizontalScroll();
  ScrollTrigger.refresh();
});

document.querySelectorAll('.card').forEach(card => {
  const bgImage = card.querySelector('.bg-image');
  const centerImage = card.querySelector('.center-image');

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    const moveX = (x * 1.5).toFixed(2);
    const moveY = (y * 1.5).toFixed(2);

    bgImage.style.transform = `translate3d(${moveX}vw, ${moveY}vw, 0px)`;
    centerImage.style.transform = `translateX(-50%) translate3d(${moveX}vw, 0vw, 0px)`;
  });

  card.addEventListener('mouseleave', () => {
    bgImage.style.transform = `translate3d(0vw, 0vw, 0px)`;
    centerImage.style.transform = `translateX(-50%) translate3d(0vw, 0vw, 0px)`;
  });
});

// animate on scroll codes
// gsap.from(".hero-text .OODA-BOND-TEXT", {
//   scrollTrigger: {
//     trigger: ".hero",
//     start: "top 80%", // Trigger when top of hero is at 80% of viewport
//     toggleActions: "play reverse play reverse"
//   },
//   y: 100,
//   opacity: 0,
//   duration: 1.5,
//   ease: "power4.out"
// });

// gsap.from(".hero-video", {
//   scrollTrigger: {
//     trigger: ".hero",
//     start: "top 80%",
//     toggleActions: "play reverse play reverse"
//   },
//   scale: 0.95,
//   opacity: 0,
//   duration: 1.2,
//   ease: "power2.out"
// });

// ===== Section 2: Why Choose OODA Bond =====
gsap.utils.toArray(".new-why-choose-sec-card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play reverse play reverse"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    delay: i * 0.2,
    ease: "back.out(1.4)"
  });
});

gsap.from(".short-brief-heading-1", {
  scrollTrigger: {
    trigger: ".short-brief-section",
    start: "top 80%",
    toggleActions: "play reverse play reverse",
  },
  x: -100,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

gsap.from(".short-brief-heading-2", {
  scrollTrigger: {
    trigger: ".short-brief-section",
    start: "top 80%",
    toggleActions: "play reverse play reverse"
  },
  x: 100,
  opacity: 0,
  duration: 1,
  delay: 0.2,
  ease: "power3.out"
});

// Animate Description and Button
gsap.from([".short-brief-description", ".short-brief-button"], {
  scrollTrigger: {
    trigger: ".short-brief-section",
    start: "top 70%",
    toggleActions: "play reverse play reverse"
  },
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power2.out"
});

// Animate Counters and Fade-In
const counters = document.querySelectorAll(".short-brief-count");

counters.forEach((counter, index) => {
  const endValue = parseInt(counter.dataset.count);
  const suffix = counter.dataset.splitend || "";

  gsap.from(counter, {
    scrollTrigger: {
      trigger: counter,
      start: "top 90%",
      toggleActions: "play reverse play reverse",
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: index * 0.1,
    ease: "power1.out",
    onStart: () => {
      let value = 0;
      const updateCount = () => {
        if (value < endValue) {
          value += Math.ceil(endValue / 40); // Adjust step size here
          if (value > endValue) value = endValue;
          counter.innerText = value + suffix;
          requestAnimationFrame(updateCount);
        }
      };
      updateCount();
    }
  });
});

gsap.from(".made-in-sec-heading-1:first-child", {
  scrollTrigger: {
    trigger: ".made-in-sec-main-section",
    start: "top 85%",
    toggleActions: "play reverse play reverse"
  },
  opacity: 0,
  y: -40,
  duration: 1,
  ease: "expo.out"
});

gsap.from(".made-in-sec-heading-2", {
  scrollTrigger: {
    trigger: ".made-in-sec-main-section",
    start: "top 85%",
    toggleActions: "play reverse play reverse"
  },
  opacity: 0,
  y: 40,
  duration: 1,
  delay: 0.2,
  ease: "expo.out"
});

// Reveal Circle Animation (pulse effect)
gsap.fromTo(".made-in-sec-reveal-circle", {
  scale: 0,
  opacity: 0
}, {
  scrollTrigger: {
    trigger: ".made-in-sec-main-section",
    start: "top 75%",
    toggleActions: "play reverse play reverse"
  },
  scale: 1,
  opacity: 1,
  duration: 1.2,
  ease: "elastic.out(1, 0.6)"
});

// Mobile Text Animations
gsap.from(".mob-made-in-sec-heading-1.mob-made-in-sec-rotated", {
  scrollTrigger: {
    trigger: ".mob-section-wrapper",
    start: "top 80%",
    toggleActions: "play reverse play reverse"
  },
  y: -50,
  opacity: 0,
  duration: 1,
  ease: "power2.out"
});

gsap.from(".mob-made-in-sec-heading-2", {
  scrollTrigger: {
    trigger: ".mob-section-wrapper",
    start: "top 80%",
    toggleActions: "play reverse play reverse"
  },
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 0.2,
  ease: "power2.out"
});

function splitTextToSpans(selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach(el => {
    const html = el.innerHTML;

    // Split content into text and <br> using RegExp
    const parts = html.split(/(<br\s*\/?>)/gi);

    const newHTML = parts.map(part => {
      if (part.match(/<br\s*\/?>/i)) {
        return "<br>";
      } else {
        return [...part].map(char => {
          if (char === " ") {
            return `<span class="reveal-letter">&nbsp;</span>`;
          }
          return `<span class="reveal-letter">${char}</span>`;
        }).join("");
      }
    }).join("");

    el.innerHTML = newHTML;
  });
}



// Split both desktop and mobile titles
splitTextToSpans(".what-if-center-text");
splitTextToSpans(".mob-what-if-title");

// Animate both sets
gsap.to(".what-if-center-text .reveal-letter", {
  scrollTrigger: {
    trigger: ".what-if-center-text",
    start: "top 20%",
  },
  y: 0,
  opacity: 1,
  duration: 0.8,
  ease: "power2.out",
  stagger: 0.04
});

gsap.to(".mob-what-if-title .reveal-letter", {
  scrollTrigger: {
    trigger: ".mob-what-if-title",
    start: "top 20%",
  },
  y: 0,
  opacity: 1,
  duration: 0.8,
  ease: "power2.out",
  stagger: 0.04
});



function setupImageGridScrollAnimations() {
  if (window.innerWidth < 991) {
    // Don't run animation on mobile
    return;
  }
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".image-grid-section",
      start: "top top",
      end: "+=400%",
      scrub: 1,
      pin: true,
      pinSpacing: true,
    }
  });

  tl.from(".image-grid-section .scaler img", {
    height: window.innerHeight + 10,
    scrub: 1,
    ease: "power1.inOut"
  }, 0)
    .from(".image-grid-section .scaler img", {
      width: window.innerWidth + 10,
      scrub: 1,
      ease: "power2.inOut"
    }, 0)

    .addLabel("zoomEnd", 0.2)

    .from(".image-grid-section .layer:nth-of-type(1)", {
      opacity: 0,
      scale: 0,
      ease: "power1.inOut"
    }, "zoomEnd")
    .from(".image-grid-section .layer:nth-of-type(2)", {
      opacity: 0,
      scale: 0,
      ease: "power3.inOut"
    }, "zoomEnd")
    .from(".image-grid-section .layer:nth-of-type(3)", {
      opacity: 0,
      scale: 0,
      ease: "power4.inOut"
    }, "zoomEnd");
}


function setResponsiveBackground() {
  const imgReveal = document.querySelector('.img-reveal');
  const imageRevealFront = document.querySelector('#imageRevealFront');

  if (!imgReveal) return;

  let backgroundImage = '';
  let frontImage = '';

  const width = window.innerWidth;

  if (width >= 1024) {
    backgroundImage = './homepage/images/trusted_products/trusted_pro_desktop2.webp';
    frontImage = './homepage/images/trusted_products/trusted_pro_desktop.webp';
  } else if (width >= 768 && width < 1024) {
    backgroundImage = './homepage/images/trusted_products/trusted_pro_tab2.webp';
    frontImage = './homepage/images/trusted_products/trusted_pro_tab.webp';
  } else {
    backgroundImage = './homepage/images/trusted_products/trusted_pro_mob2.webp';
    frontImage = './homepage/images/trusted_products/trusted_pro_mob.webp';
  }

  imgReveal.style.backgroundImage = `url('${backgroundImage}')`;
  imageRevealFront.src = frontImage;
}

// Set on load
window.addEventListener('load', setResponsiveBackground);

// Update on resize
window.addEventListener('resize', setResponsiveBackground);

const tl_mob = gsap.timeline({
  scrollTrigger: {
    trigger: ".mob-animate-grid-wrapper",
    start: "top top",
    end: "+=100%",
    pin: true,
    scrub: true, 
    invalidateOnRefresh: true
  }
});
 

tl_mob.set(".center-card", {
  scale: 3,
  transformOrigin: "center center",
  zIndex: 10,
  opacity: 1
}, 0);
 
 
tl_mob.set(".mob-animate-grid-card:not(.center-card)", {
  scale: 0.2,
  opacity: 0,
}, 0);
 
tl_mob.to(".center-card", {
  scale: 1,
  ease: "power2.out"
}, 0);
 
tl_mob.to(".mob-animate-grid-card:not(.center-card)", {
  opacity: 1,
  scale: 1,
  ease: "power2.out"
}, 0);