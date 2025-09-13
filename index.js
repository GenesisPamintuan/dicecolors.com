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

 // --- Roll Again Button Logic ---
rollBtn.addEventListener('click', () => {
  const randomVideo = videos[Math.floor(Math.random() * videos.length)];
  rollVideo.src = randomVideo;

  pageContent.forEach(el => el.classList.add('hidden'));
  rollSound.currentTime = 0;
  rollSound.play();

  rollVideo.style.display = 'block';
  rollVideo.currentTime = 0;
  rollVideo.play();

  rollVideo.onended = () => {
    rollVideo.style.display = 'none';
    pageContent.forEach(el => el.classList.remove('hidden'));

    // Unique colors only
    const shuffledColors = [...colors].sort(() => 0.5 - Math.random());
    dice.forEach((die, i) => {
      die.className = 'die';
      die.classList.add(shuffledColors[i]);
    });
  };
});

// --- Keyboard Logic ---
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  const keyToColor = { 'r':'red', 'p':'purple', 'b':'blue', 'g':'green', 'o':'orange', 'y':'yellow' };
  const excludedColor = keyToColor[key];

  if(excludedColor) {
    const availableColors = colors.filter(c => c !== excludedColor);
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    rollVideo.src = randomVideo;

    pageContent.forEach(el => el.classList.add('hidden'));
    rollSound.currentTime = 0;
    rollSound.play();

    rollVideo.style.display = 'block';
    rollVideo.currentTime = 0;
    rollVideo.play();

    rollVideo.onended = () => {
      rollVideo.style.display = 'none';
      pageContent.forEach(el => el.classList.remove('hidden'));

      const chance = Math.random() * 100;
      let resultColors = [];

      if (chance < 50) {
        // 2 same color
        const color = availableColors[Math.floor(Math.random()*availableColors.length)];
        resultColors = [color, color];
        while(resultColors.length < 4){
          let c = availableColors[Math.floor(Math.random()*availableColors.length)];
          if(!resultColors.includes(c)) resultColors.push(c);
        }
      } else if (chance < 60) {
        // 3 same color
        const color = availableColors[Math.floor(Math.random()*availableColors.length)];
        resultColors = [color, color, color];
        while(resultColors.length < 4){
          let c = availableColors[Math.floor(Math.random()*availableColors.length)];
          if(!resultColors.includes(c)) resultColors.push(c);
        }
      } else if (chance < 65) {
        // 4 same color
        const color = availableColors[Math.floor(Math.random()*availableColors.length)];
        resultColors = [color, color, color, color];
      } else {
        // all different
        resultColors = [...availableColors].sort(() => 0.5 - Math.random()).slice(0,4);
      }

      dice.forEach((die, i) => {
        die.className = 'die';
        die.classList.add(resultColors[i]);
      });
    };
  }
});