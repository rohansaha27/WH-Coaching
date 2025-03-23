document.addEventListener("DOMContentLoaded", function () {
    // Menu Toggle
    let menu = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

    if (menu && navbar) {
        menu.onclick = () => {
            menu.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        };

        window.onscroll = () => {
            menu.classList.remove('bx-x');
            navbar.classList.remove('active');
        };
    }

    // AOS Animations 

    document.addEventListener("DOMContentLoaded", function () {
        AOS.init({
            offset: 50,  // Ensures animation starts earlier
            duration: 800,  // Faster animations
            easing: 'ease-in-out',
            once: true,  // Prevents re-triggering on scroll
            delay: 0,  // Ensures animations start immediately
        });
    });

    // Typed.js Animation for Multiple Text
    if (document.querySelector('.multiple-text')) {
        new Typed('.multiple-text', {
            strings: ['Bodybuilding', 'Fat Loss', 'Injury Rehabilitation', 'Muscle Building', 'Strength Training'],
            typeSpeed: 60,
            backSpeed: 60,
            backDelay: 1000,
            loop: true,
        });
    }

    // Calorie Counter Function 

    function openCalorieCalculator() {
        document.getElementById("calorie-calculator").scrollIntoView({
            behavior: "smooth"
        });
    }

// Success Stories Auto-Scrolling
const slider = document.querySelector(".slider");

if (slider) {
  let scrollAmount = 0;
  const scrollStep = 2; // Controls speed
  const maxScroll = slider.scrollWidth / 2;
  let scrolling = true;

  function autoScroll() {
    if (scrolling) {
      if (scrollAmount >= maxScroll) {
        scrollAmount = 0;
      } else {
        scrollAmount += scrollStep;
      }
      slider.style.transform = `translateX(-${scrollAmount}px)`;
    }
    requestAnimationFrame(autoScroll);
  }

  // Desktop hover control
  slider.addEventListener("mouseenter", () => {
    if (!isTouchDevice()) {
      scrolling = false;
    }
  });

  slider.addEventListener("mouseleave", () => {
    if (!isTouchDevice()) {
      scrolling = true;
    }
  });

  // Mobile touch control
  slider.addEventListener("touchstart", () => {
    scrolling = false;
  });

  slider.addEventListener("touchend", () => {
    scrolling = true;
  });

  // Utility to detect touch devices
  function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  autoScroll();
}
});
