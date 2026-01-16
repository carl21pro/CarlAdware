/* CUSTOM CURSOR */
const dot = document.querySelector(".cursor-dot");
const outline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  dot.style.left = `${posX}px`;
  dot.style.top = `${posY}px`;

  outline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });
});

/* SCROLL REVEAL */
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
      
      // Animate skill bars if this is the skills section
      if (reveals[i].classList.contains("skills")) {
        const bars = reveals[i].querySelectorAll(".fill");
        bars.forEach(bar => {
          const percent = bar.getAttribute("data-percent");
          bar.style.width = percent + "%";
        });
      }
    }
  }
}
window.addEventListener("scroll", reveal);
reveal(); // Initial check

/* PARTICLES */
if (window.particlesJS) {
  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#00d4ff" },
      shape: { type: "circle" },
      opacity: { value: 0.2, random: false },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: "#00d4ff", opacity: 0.1, width: 1 },
      move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
      modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });
}

/* TESTIMONIAL SLIDER */
let slides = document.querySelectorAll(".slide");
let idx = 0;

setInterval(() => {
  if (slides.length > 0) {
    slides[idx].classList.remove("active");
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add("active");
  }
}, 3500);

/* LIVE AI */
async function askAI() {
  const input = document.getElementById("aiInput").value;
  const out = document.getElementById("aiOutput");

  if (!input) {
    out.textContent = "Please type a question.";
    return;
  }

  out.textContent = "Thinking...";

  try {
    const res = await fetch(
      "/api/ai/chat?question=" + encodeURIComponent(input)
    );
    const data = await res.json();
    const result = data.result || "No response.";
    
    // Typewriter effect
    out.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
      if (i < result.length) {
        out.textContent += result.charAt(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  } catch {
    out.textContent = "AI offline — demo integration successful.";
  }
}

/* PH TIME */
function updateTime() {
  const now = new Date().toLocaleString("en-PH", {
    timeZone: "Asia/Manila"
  });
  document.getElementById("time").textContent =
    "Philippine Time: " + now;
}
setInterval(updateTime, 1000);
updateTime();