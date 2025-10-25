const colors = ['orange','green','blue','purple','red','yellow'];
const dice = document.querySelectorAll('.die');
const rollBtn = document.getElementById('rollBtn');
const rollVideo = document.getElementById('rollVideo');
const rollSound = document.getElementById('rollSound');
const pageContent = document.body.querySelectorAll('body > *:not(#rollVideo):not(#rollSound)');

const videos = [
  'videos/roll1.mp4',
  'videos/roll2.mp4',
  'videos/roll3.mp4',
  'videos/roll4.mp4',
  'videos/roll5.mp4'
];

// 🔁 Shuffle helper
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 🎲 Generate dice color results with probabilities
function getColorResult(availableColors) {
  const chance = Math.random() * 100;
  let resultColors = [];

  if (chance < 60) {
    // 60% → 2 same color
    const color = availableColors[Math.floor(Math.random()*availableColors.length)];
    resultColors = [color, color];
    while (resultColors.length < 4) {
      let c = availableColors[Math.floor(Math.random()*availableColors.length)];
      if (!resultColors.includes(c)) resultColors.push(c);
    }
  } else if (chance < 85) {
    // 25% → all different
    resultColors = [...availableColors].sort(() => 0.5 - Math.random()).slice(0,4);
  } else if (chance < 95) {
    // 10% → 3 same color
    const color = availableColors[Math.floor(Math.random()*availableColors.length)];
    resultColors = [color, color, color];
    while (resultColors.length < 4) {
      let c = availableColors[Math.floor(Math.random()*availableColors.length)];
      if (!resultColors.includes(c)) resultColors.push(c);
    }
  } else {
    // 5% → 4 same color
    const color = availableColors[Math.floor(Math.random()*availableColors.length)];
    resultColors = [color, color, color, color];
  }

  // 🔀 Randomize order so same colors aren't always adjacent
  return shuffle(resultColors);
}

// 🎬 Roll Again Button
rollBtn.addEventListener('click', () => {
  const randomVideo = videos[Math.floor(Math.random() * videos.length)];
  rollVideo.src = randomVideo;

  pageContent.forEach(el => el.classList.add('hidden'));
  rollSound.currentTime = 0;
  rollSound.play();

  rollVideo.style.display = 'block';
  rollVideo.currentTime = 0;
  rollVideo.play().catch(()=>{});

  rollVideo.onended = () => {
    rollVideo.style.display = 'none';
    pageContent.forEach(el => el.classList.remove('hidden'));

    const resultColors = getColorResult(colors);
    dice.forEach((die, i) => {
      die.className = 'die';
      die.classList.add(resultColors[i]);
    });
  };
});

// 🎹 Keyboard shortcuts (R, G, B, etc.)
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  const keyToColor = { 'r':'red', 'p':'purple', 'b':'blue', 'g':'green', 'o':'orange', 'y':'yellow' };
  const excludedColor = keyToColor[key];

  if (excludedColor) {
    const availableColors = colors.filter(c => c !== excludedColor);
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    rollVideo.src = randomVideo;

    pageContent.forEach(el => el.classList.add('hidden'));
    rollSound.currentTime = 0;
    rollSound.play();

    rollVideo.style.display = 'block';
    rollVideo.currentTime = 0;
    rollVideo.play().catch(()=>{});

    rollVideo.onended = () => {
      rollVideo.style.display = 'none';
      pageContent.forEach(el => el.classList.remove('hidden'));

      const resultColors = getColorResult(availableColors);
      dice.forEach((die, i) => {
        die.className = 'die';
        die.classList.add(resultColors[i]);
      });
    };
  }
});
