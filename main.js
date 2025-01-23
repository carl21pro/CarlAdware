const graph = id => [`https://graph.facebook.com/${id}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, id];
const GID = id => document.getElementById(id);
const openLink = link => window.location.href = link;
const profile = GID("profile");
const container = GID("container");
const particleContainer = document.querySelector('.animated-bg');
const maxParticles = 30;
let particleCount = 0;
container.style.display = "none";
let sound = null;

function playMusic(url, isalang, isLoop) {
  if (sound != null) {
    sound.stop();
    sound.unload();
    sound = null;
  }
  sound = new Howl({
    src: [url],
    loop: isLoop,
    format: ['mp3'],
    volume: 1,
    onend: () => {}
  });
  if (isalang) {
    sound.play();
  }
}

function playShortAudio(url) {
  const s = new Howl({
    src: [url],
    loop: false,
    volume: 1,
    autoplay: true
  });
  s.play();
}

async function music() {
  let muswitch = false;
  const file = "bgm",
    nameFile = "https://i.imgur.com/VKlwxl0.mp4",
    mustore = localStorage.getItem(file),
    switchMusic = b => {
      playMusic(nameFile, b, true);
      //mus.innerHTML = `${b ? "Stop" : "Play"} Music`;
    }
  profile.addEventListener("click", async () => {
    muswitch = !muswitch;
    switchMusic(muswitch);
    localStorage.setItem(file, muswitch ? "1" : "0");
    return;
  });
  muswitch = mustore === "1";
  switchMusic(muswitch);
}

function information() {
  const myProfile = graph("100029350902119");
  profile.src = myProfile[0];
  const bio = [
    "“Justise is the last refuge of the weakness” 👑"
  ];
  GID("title").innerText = "Carl Joshua S Jacalan";
  GID("name").innerText = "Carl Joshua S Jacalan";
  GID("username").innerText = "Jaca G";
  GID("bio").innerText = bio[Math.floor(Math.random() * bio.length)];
  GID("fb").onclick = () => openLink("https://www.facebook.com/profile.php?id=100056093558255" + myProfile[1]);
  GID("Tik").onclick = () => openLink("https://www.tiktok.com/@tnccarl?_t=ZS-8tIx6NJN5QQ&_r=1");
  GID("group").onclick = () => openLink("https://www.facebook.com/groups/coders.dev");
  GID("created").innerText = "her bf";
}
function createParticle() {
  //credits sayo pre @Arbeirth einstien
  if (particleCount >= maxParticles) return;
  const particle = document.createElement('div');
  particle.className = 'particle';
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight;
  const moveX = (Math.random() - 0.5) * 200;
  const moveY = (Math.random() - 0.5) * 200;
  particle.style.left = startX + 'px';
  particle.style.top = startY + 'px';
  particle.style.setProperty('--moveX', moveX + 'px');
  particle.style.setProperty('--moveY', moveY + 'px')
  particle.style.animation = `particleFloat ${5 + Math.random() * 5}s ease-out forwards`;
  particleContainer.appendChild(particle);
  particleCount++;
  particle.addEventListener('animationend', () => {
    particle.remove();
    particleCount--;
  });
}

addEventListener("DOMContentLoaded", async () => {
  information();
  await music();
  container.style.display = "block";
  setInterval(createParticle, 200);
});