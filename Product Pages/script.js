document.addEventListener('DOMContentLoaded', function () {
   
  // GSAP + ScrollTrigger animations
 gsap.registerPlugin(ScrollTrigger);

  // let time_line_svg = "./assets/svg/109_time_line.svg";
  // if (window.innerWidth <= 991) {
  //   time_line_svg = "./assets/svg/109_time_line_mob.svg";
  // }
  // fetch(time_line_svg)
  //   .then(response => response.text())
  //   .then(svgText => {
  //     document.getElementById("timeline-container").innerHTML = svgText;
  //     document.getElementById('placeholder-div').style.display = 'none'; // Hide the placeholder div
  //     animateSVGPaths();
  //     ScrollTrigger.refresh();

  //   });


// Initialize Lenis
const lenis = new Lenis({
  duration: 2.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
});

// Run Lenis on animation frame
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Connect Lenis to ScrollTrigger
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return arguments.length ? lenis.scrollTo(value) : window.scrollY;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.body.style.transform ? "transform" : "fixed",
});



// You can remove this:
// ScrollTrigger.addEventListener("refresh", () => lenis.update());

ScrollTrigger.refresh(); // ✅ Keep this


  let smoother;
  // if (window.innerWidth >= 992) {
  //   smoother = ScrollSmoother.create({
  //     wrapper: "#smooth-wrapper",
  //     content: "#smooth-content",
  //     smooth: 1.5,
  //     effects: true
  //   });
  //   ScrollTrigger.scrollerProxy("#smooth-content", smoother);
  // }


  gsap.from(".hero-text", {
    scrollTrigger: {
      trigger: ".hero-text",
      start: "top 80%",
      toggleActions: "play reverse play reverse"
    },
    x: -200,
    opacity: 0,
    duration: 1,
    delay: 1,
    ease: "power2.out"
  });

  gsap.from(".hero-video img", {
    scrollTrigger: {
      trigger: ".hero-video",
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    y: 300,
    opacity: 0,
    duration: 1,
    delay: 0,
    ease: "power2.out"
  });

  gsap.from(".hero-product-name", {
    scrollTrigger: {
      trigger: ".hero-bottom-text-container",
      start: "top 80%",
      toggleActions: "play reverse play reverse"
    },
    x: -200,
    opacity: 0,
    duration: 1,
    delay: 0.25,
    ease: "power2.out"
  });


  gsap.from(".hero-product-description", {
    scrollTrigger: {
      trigger: ".hero-bottom-text-container",
      start: "top 80%",
      toggleActions: "play reverse play reverse"
    },
    x: 200,
    opacity: 0,
    duration: 1,
    delay: 0.25,
    ease: "power2.out"
  });

 

  // technical properties, application, and benefits
 

  gsap.registerPlugin(ScrollTrigger);

  const panels = document.querySelectorAll(".panel");
  const buttons = document.querySelectorAll(".button-container button");
  panels.forEach((panel, i) => {
    gsap.set(panel, {
      opacity: i === 0 ? 1 : 0,
      zIndex: i === 0 ? 9 : 1
    });
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      id: "pinning",
      trigger: ".section-2",
      start: "top top",
      end: `+=${panels.length * 200}%`, // Adjust based on number of panels      
      scrub: true,
      pin: true,
      pinSpacing: true, // ✅ Important to prevent jump
      anticipatePin: 1,
      // scroller: "#smooth-content",
      // scroller: smoother ? smoother.scrollContainer : undefined,
      onUpdate: (self) => {
        const index = getCurrentFullyVisiblePanelByProgress(self.progress);
        updateButtons(index);
      }
    }
  });

  // Timeline for panels
  panels.forEach((panel, index) => {
    const label = `panel${index}`;
    const nextTime = index * 3;

    tl.add(label, nextTime);

    // Fade in panel
    tl.to(panel, {
      opacity: 1,
      duration: 0.3,
      zIndex: 9,

    }, label);


    // Custom animation calls
    if (index === 1) tl.call(() => animateCards(), null, label + "+=0.01");
    if (index === 2) tl.call(() => animatePanel3(), null, label + "+=0.01");

    // Fade out (except last panel)
    if (index < panels.length - 1) {
      tl.to(panel, {
        opacity: 0,
        duration: 0.3,
        zIndex: 1
      }, label + "+=2.7");
    }
  });

  // ✨ Add an artificial pause after the last panel
  tl.to({}, { duration: 1 }); // this dummy tween gives "extra time"

  function getCurrentFullyVisiblePanelByProgress(progress) {
    const totalPanels = panels.length;
    const activeIndex = Math.round(progress * (totalPanels - 1));
    return activeIndex;
  }



  let lastIndex = -1;

  function updateButtons(activeIndex) {
    if (activeIndex === lastIndex) return;
    lastIndex = activeIndex;

    buttons.forEach((btn, i) => {
      btn.classList.toggle("active", i === activeIndex);
    });
  }

  // Scroll to panel on button click
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const trigger = ScrollTrigger.getById("pinning");
      if (trigger) {
        const totalScroll = trigger.end - trigger.start;
        const targetScroll = trigger.start + (totalScroll * index / (panels.length - 1));
        gsap.to(window, {
          scrollTo: { y: targetScroll },
          duration: 1,
          ease: "power2.inOut"
        });
      }
    });
  });

  // Assign ScrollTrigger ID
  // ScrollTrigger.getAll().forEach(trigger => {
  //   if (trigger.pin === document.querySelector(".section-2")) {
  //     trigger.id = "pinning";
  //   }
  // });



  // applications section animation
  function animateCards() {
    // Animate all cards with stagger
    const cards = document.querySelectorAll("#panel2 .application-card-container");

    gsap.fromTo(cards,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.75,
        delay: 0.35,
        ease: "power2.out",
        stagger: 0.1,
        onComplete: () => console.log("Cards animation done"),
      }
    );
  }

  function animatePanel3() {
    // Left side slide in from left + fade
    gsap.fromTo("#panel3 .benefits-left-section",
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Right side benefits cards stagger fade and slide up
    gsap.fromTo("#panel3 .benefits-card",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.3 // start after left section animation begins
      }
    );
  }

  // text over video section
  gsap.to(".text-overlay h1", {
    rotate: 0,
    opacity: 1,
    duration: 1,
    delay: 3.5,
    ease: "power4.out",
    stagger: 0.25, // Adds a delay between each h1
    scrollTrigger: {
      trigger: ".text-overlay",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  // mobile view and tab view content's animation
  gsap.utils.toArray('.mob-sec-title-main').forEach(title => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  });

  // Animate Cards
  gsap.utils.toArray('.mob-sec-card').forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.2,
    });
  });

  // Animate Application Grid Cards
  gsap.utils.toArray('.mob-sec-grid-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.7,
      delay: index * 0.05,
      ease: 'back.out(1.7)',
    });
  });

  // Animate Benefits Cards
  gsap.utils.toArray('.mob-sec-benefits-card').forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
      x: -50,
      opacity: 0,
      duration: 0.6,
      ease: 'power1.out',
    });
  });

  // Animate Benefits Title & Video Section
  gsap.from('.mob-sec-benefits-title-block', {
    scrollTrigger: {
      trigger: '.mob-sec-benefits-title-block',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out',
  });

  gsap.from('.mob-sec-benefits-video-container', {
    scrollTrigger: {
      trigger: '.mob-sec-benefits-video-container',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    scale: 0.9,
    duration: 1,
    ease: 'power2.out',
  });


  // products built to stick section codes

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

lenis.on("scroll", ({ scroll }) => {
  scrollDir = scroll > lastScrollTop ? "down" : "up";
  lastScrollTop = scroll;
});

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
  window.addEventListener("load", () => {
    initHorizontalScroll();
    ScrollTrigger.refresh();
  });

});

 function animateSVGPaths() {
    gsap.registerPlugin(ScrollTrigger);

    const pathsWithId = document.querySelectorAll('#timeline-container svg path[id="text"]');

    if (pathsWithId.length === 0) {
      console.log("No paths with ID found!");
      return;
    }

    pathsWithId.forEach(path => {
      const length = path.getTotalLength();

      // Set initial dash offset
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length
      });

      // Animate on scroll
      gsap.from(path, {
        opacity: 0,
        y: 100,
        strokeDashoffset: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          console.log(`Animation complete for path ID: ${path.id}`);
        },
        scrollTrigger: {
          trigger: path,
          start: "top 90%",
          toggleActions: "play reverse play reverse"
        }
      });
    });

    const svgLine = document.querySelectorAll('#timeline-container svg path[id="straightLine"]');
    svgLine.forEach(line => {
      const length = line.getTotalLength(); // Get the actual path length

      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length
      });

      gsap.to(line, {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 6,
        ease: "power2.out",
        onComplete: () => {
          console.log(`Animation complete for path ID: ${line.id}`);
          // Don't reset to full offset here unless you plan to animate again
        },
        scrollTrigger: {
          trigger: line,
          start: "top+=100 bottom", // waits for the top of the element to be 100px *below* the bottom of the viewport
          toggleActions: "play none none none",

        }
      });
    });

    const svgCircle = document.querySelectorAll('#timeline-container svg circle[id="circle"]');
    svgCircle.forEach(circle => {
      const length = circle.getTotalLength();

      gsap.set(circle, {
        strokeDasharray: length,
        strokeDashoffset: length
      });

      gsap.to(circle, {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.out",
        onComplete: () => {
          console.log(`Animation complete for path ID: ${circle.id}`);

        },
        scrollTrigger: {
          trigger: circle,
          start: "top+=100 bottom",
          toggleActions: "play none none none",

        }
      });
    });

    const svgG = document.querySelectorAll('#timeline-container svg g[id="circle"], circle[id="circle2"]');
    svgG.forEach(G => {
      gsap.to(G, {
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: "power2.out",
        onComplete: () => {
          console.log(`Animation complete for path ID: ${G.id}`);
        },
        scrollTrigger: {
          trigger: G,
          start: "top+=100 bottom", // waits for the top of the element to be 100px *below* the bottom of the viewport
          toggleActions: "play none none none",

        }
      });
    });

  }

  
  function startAnimationCircle() {
    const strokePaths = document.querySelectorAll('#line-stroke');

    strokePaths.forEach((strokePath) => {
      const length = strokePath.getTotalLength();

      // Start with stroke only
      gsap.set(strokePath, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
        fill: "transparent"
      });

      gsap.to(strokePath, {
        strokeDashoffset: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: strokePath,
          start: "top 30%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(strokePath, {
              strokeDashoffset: 0,
              duration: 2.5,
              ease: "power2.out",
              onComplete: () => {
                // Animate fill from transparent to white
                gsap.to(strokePath, {
                  fill: "white",
                  duration: 0.2,
                  ease: "power1.inOut"
                });

                // Optional: remove stroke
                gsap.to(strokePath, {
                  stroke: "none",
                  duration: 0.5,
                  delay: 0.5
                });
              }
            });
          }
        }
      });
    });

    const popupGroups = document.querySelectorAll('.popup-group');

    popupGroups.forEach((group, index) => {
      const rects = group.querySelectorAll('rect');
      const mask = group.querySelector('mask');
      const paths = group.querySelectorAll('path');

      // Filter out paths inside <mask>
      const visiblePaths = Array.from(paths).filter(path => {
        return !mask || !mask.contains(path);
      });

      // Set initial state
      gsap.set([...rects, ...visiblePaths], {
        opacity: 0,
        scale: 0.1
      });

      // ScrollTrigger for each group
      ScrollTrigger.create({
        trigger: group,
        start: "top 30%",
        onEnter: () => {
          const delayPerGroup = index * 0.3; // Adjust this value for delay between each group

          gsap.delayedCall(delayPerGroup, () => {
            const tl = gsap.timeline();

            // Animate rects
            tl.to(rects, {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)",
              stagger: 0.1
            });

            // Animate paths
            tl.to(visiblePaths, {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.05
            }, "+=0.2");
          });
        },
        toggleActions: "play none none none"
      });
    });

    const opacityE = document.querySelectorAll('#opacity-fill');
    opacityE.forEach((element) => {
      gsap.set(element, {
        opacity: 0
      });

      gsap.to(element, {
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 30%",
          toggleActions: "play none none none"
        }
      });
    });
  }