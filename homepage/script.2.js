gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

// Step data
const steps = [
  {
    heading: "Welcome to the Arc",
    text: "Experience a seamless animation journey that flows across a perfectly balanced path.",
    leftImage: "./homepage/images/what_if_imges/Card 100.png",
    rightImage: "./homepage/images/what_if_imges/Card 101.png"
  },
  {
    heading: "The Motion Begins",
    text: "Watch as the dot dances, setting the stage for a smooth visual rhythm.",
    leftImage: "./homepage/images/what_if_imges/Card 101.png",
    rightImage: "./homepage/images/what_if_imges/Card 100.png"
  },
  {
    heading: "Visual Flow",
    text: "Every scroll unlocks a new phase of motion and story.",
    leftImage: "./homepage/images/what_if_imges/Card 100.png",
    rightImage: "./homepage/images/what_if_imges/Card 101.png"
  }
];

// DOM references
const blueDot = document.getElementById("blueDot");
const numberSpan = document.getElementById("stepNumber");
const centerHeading = document.getElementById("centerHeading");
const centerText = document.getElementById("centerText");
const leftImage = document.getElementById("leftImage");
const rightImage = document.getElementById("rightImage");

// Set initial position of the dot
gsap.set(blueDot, { xPercent: -50, yPercent: -50 });

// Initial content (step 0)
const initialStep = steps[0];
numberSpan.textContent = 1;
centerHeading.innerText = initialStep.heading;
centerText.innerText = initialStep.text;
leftImage.src = initialStep.leftImage;
rightImage.src = initialStep.rightImage;

// Direction flag
let isScrollingBack = false;
ScrollTrigger.defaults({
  onUpdate: (self) => {
    isScrollingBack = self.direction === -1;
  }
});

// Master timeline
const master = gsap.timeline({
  scrollTrigger: {
    trigger: "#arcSection",
    start: "top top",
    end: () => `+=${(steps.length - 1) * window.innerHeight}`,
    scrub: true,
    pin: true,
    anticipatePin: 1,
    snap: {
      snapTo: 1 / steps.length,
      duration: 0.5,
      ease: "power1.inOut"
    }
  }
});
console.log(steps);
steps.forEach((step, index) => {

  // Animate blue dot on arc
  master.to(blueDot, {
    duration: 3,
    motionPath: {
      path: "#entryArcPath",
      align: "#entryArcPath",
      alignOrigin: [0.5, 0.5],
      autoRotate: false
    },
    ease: "power1.inOut"
  });

  console.log("Step :", step);
  console.log("Index :", index);

  // Skip content update on first forward scroll (index 0), but allow on scroll back
  master.call(() => {
    if (index !== 0 || isScrollingBack) {
      numberSpan.textContent = index + 1;
      centerHeading.innerText = step.heading;
      centerText.innerText = step.text;
    }
  });

  // Animate out images
  master.to([leftImage, rightImage], {
    opacity: 0,
    scale: 0.8,
    duration: 1
  });

  // Image source swap
  master.set(leftImage, { attr: { src: step.rightImage } });
  master.set(rightImage, { attr: { src: step.leftImage } });

  // Animate in new images
  master.to([leftImage, rightImage], {
    opacity: 1,
    scale: 1,
    duration: 1
  });

  console.log("Heading this time: ", step.heading);
});
    