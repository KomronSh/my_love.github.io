// Love website dynamic logic
document.addEventListener('DOMContentLoaded', () => {
  // Default values or stored preferences
  const defaultData = {
    herName: 'Моей Любимой',
    hisName: 'Твоего Заи',
    startDate: '2023-02-14',
    loveLetter: `Ты — самое лучшее, что случалось со мной в жизни. Твоя улыбка освещает даже самые пасмурные дни, а твои глаза излучают тепло и доброту. Спасибо за каждую секунду, проведённую вместе. Я люблю тебя всё сильнее с каждым днём! ❤️`
  };

  // Load from localStorage or defaults
  let store = { ...defaultData };
  try {
    const saved = localStorage.getItem('love_site_data');
    if (saved) {
      store = { ...defaultData, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('LocalStorage read error', e);
  }

  // DOM Elements
  const displayHerName = document.getElementById('display-her-name');
  const displayHisName = document.getElementById('display-his-name');
  const letterHisName = document.getElementById('letter-his-name');
  const footerHerName = document.getElementById('footer-her-name');
  const displayLetterText = document.getElementById('display-letter-text');

  // Input Elements
  const inputHerName = document.getElementById('input-her-name');
  const inputHisName = document.getElementById('input-his-name');
  const inputStartDate = document.getElementById('input-start-date');
  const inputLoveLetter = document.getElementById('input-love-letter');

  // Timer Elements
  const timerDays = document.getElementById('timer-days');
  const timerHours = document.getElementById('timer-hours');
  const timerMinutes = document.getElementById('timer-minutes');
  const timerSeconds = document.getElementById('timer-seconds');

  // Modal Elements
  const settingsToggle = document.getElementById('settings-toggle');
  const settingsModal = document.getElementById('settings-modal');
  const closeSettings = document.getElementById('close-settings');
  const saveSettings = document.getElementById('save-settings');

  const envelope = document.getElementById('envelope');
  const letterModal = document.getElementById('letter-modal');
  const closeLetter = document.getElementById('close-letter');

  // Compliment Elements
  const complimentText = document.getElementById('compliment-text');
  const btnNextCompliment = document.getElementById('btn-next-compliment');

  // Quiz Elements
  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  const quizResult = document.getElementById('quiz-result');

  // Reasons Data
  const reasonsData = [
    "Твоя искренняя и лучезарная улыбка, которая поднимает настроение мгновенно! 😊",
    "Твое доброе и чуткое сердце, готовое дарить тепло вокруг 💖",
    "То, как смешно и мило ты морщишь носик, когда смеешься 😄",
    "Твоя забота и поддержка в любые моменты моей жизни 🤝",
    "Твои невероятно красивые глаза, в которых можно утонуть ✨",
    "Наши долгие уютные разговоры обо всём на свете до поздней ночи 🌙",
    "Твоя неповторимая грация и чувство стиля 💃",
    "То, как крепко и нежно ты обнимаешь меня при встрече 🫂",
    "Твой задорный смех, который я готов слушать бесконечно 🎉",
    "Потому что с тобой я чувствую себя самым счастливым человеком! ❤️"
  ];

  // Compliments List
  const complimentsList = [
    "«Ты делаешь этот мир бесконечно прекраснее просто тем, что ты в нём есть!» ✨",
    "«Твоя улыбка — моё самое любимое зрелище во вселенной!» 😍",
    "«Ты самая невероятная, умная, красивая и милая девушка на свете!» 💕",
    "«Рядом с тобой время останавливается, а сердце бьётся чаще!» 💓",
    "«Ты мой главный источник вдохновения и радости каждый день!» 🌟",
    "«Спасибо за твою нежность, тепло и бесконечную доброту!» 🌹",
    "«С каждым днём я влюбляюсь в тебя всё сильнее и сильнее!» 💘"
  ];

  // Apply stored data to UI
  function updateUI() {
    if (displayHerName) displayHerName.textContent = store.herName;
    if (displayHisName) displayHisName.textContent = store.hisName;
    if (letterHisName) letterHisName.textContent = store.hisName;
    if (footerHerName) footerHerName.textContent = store.herName;
    if (displayLetterText) displayLetterText.textContent = store.loveLetter;

    if (inputHerName) inputHerName.value = store.herName;
    if (inputHisName) inputHisName.value = store.hisName;
    if (inputStartDate) inputStartDate.value = store.startDate;
    if (inputLoveLetter) inputLoveLetter.value = store.loveLetter;
  }

  updateUI();

  // Settings Modal Handlers
  if (settingsToggle && settingsModal) {
    settingsToggle.addEventListener('click', () => settingsModal.classList.remove('hidden'));
  }
  if (closeSettings && settingsModal) {
    closeSettings.addEventListener('click', () => settingsModal.classList.add('hidden'));
  }

  if (saveSettings) {
    saveSettings.addEventListener('click', () => {
      store.herName = inputHerName.value.trim() || defaultData.herName;
      store.hisName = inputHisName.value.trim() || defaultData.hisName;
      store.startDate = inputStartDate.value || defaultData.startDate;
      store.loveLetter = inputLoveLetter.value.trim() || defaultData.loveLetter;

      try {
        localStorage.setItem('love_site_data', JSON.stringify(store));
      } catch (e) {
        console.error('LocalStorage write error', e);
      }

      updateUI();
      settingsModal.classList.add('hidden');
      triggerConfetti();
    });
  }

  // Love Letter Envelope Handlers
  if (envelope && letterModal) {
    envelope.addEventListener('click', () => {
      letterModal.classList.remove('hidden');
      triggerConfetti();
    });
  }
  if (closeLetter && letterModal) {
    closeLetter.addEventListener('click', () => letterModal.classList.add('hidden'));
  }

  // Love Counter logic
  function updateTimer() {
    const start = new Date(store.startDate + 'T00:00:00');
    const now = new Date();
    const diff = Math.max(0, now - start);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (timerDays) timerDays.textContent = String(days).padStart(3, '0');
    if (timerHours) timerHours.textContent = String(hours).padStart(2, '0');
    if (timerMinutes) timerMinutes.textContent = String(minutes).padStart(2, '0');
    if (timerSeconds) timerSeconds.textContent = String(seconds).padStart(2, '0');
  }

  setInterval(updateTimer, 1000);
  updateTimer();

  // Render "Reasons Why" Cards
  const cardsGrid = document.getElementById('cards-grid');
  if (cardsGrid) {
    cardsGrid.innerHTML = '';
    reasonsData.forEach((reason, index) => {
      const card = document.createElement('div');
      card.className = 'flip-card';
      card.innerHTML = `
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <span class="card-number">#${index + 1}</span>
            <p>Нажми, чтобы узнать ❤️</p>
          </div>
          <div class="flip-card-back">
            <p>${reason}</p>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });

      cardsGrid.appendChild(card);
    });
  }

  // Compliment Generator Logic
  let lastComplimentIndex = -1;
  if (btnNextCompliment && complimentText) {
    btnNextCompliment.addEventListener('click', () => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * complimentsList.length);
      } while (randomIndex === lastComplimentIndex && complimentsList.length > 1);

      lastComplimentIndex = randomIndex;
      complimentText.style.opacity = '0';
      setTimeout(() => {
        complimentText.textContent = complimentsList[randomIndex];
        complimentText.style.opacity = '1';
      }, 200);
    });
  }

  // Playful Dodging "No" Button Quiz
  if (btnNo) {
    const moveNoButton = () => {
      const container = btnNo.parentElement;
      const rect = container.getBoundingClientRect();
      const btnRect = btnNo.getBoundingClientRect();

      const maxX = rect.width - btnRect.width;
      const maxY = 150;

      const randomX = (Math.random() - 0.5) * maxX;
      const randomY = (Math.random() - 0.5) * maxY;

      btnNo.style.position = 'relative';
      btnNo.style.left = `${randomX}px`;
      btnNo.style.top = `${randomY}px`;
    };

    btnNo.addEventListener('mouseover', moveNoButton);
    btnNo.addEventListener('touchstart', (e) => {
      e.preventDefault();
      moveNoButton();
    });
    btnNo.addEventListener('click', (e) => {
      e.preventDefault();
      moveNoButton();
    });
  }

  if (btnYes && quizResult) {
    btnYes.addEventListener('click', () => {
      quizResult.classList.remove('hidden');
      triggerConfetti();
      btnYes.style.display = 'none';
      if (btnNo) btnNo.style.display = 'none';
    });
  }

  // Canvas floating hearts animation
  const canvas = document.getElementById('canvas-hearts');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class HeartParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 50;
        this.size = Math.random() * 18 + 8;
        this.speedY = Math.random() * 1.5 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.6 + 0.3;
        this.color = `hsla(${Math.random() * 30 + 340}, 100%, 75%, ${this.opacity})`;
      }

      update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.y * 0.02) * 0.5 + this.speedX;

        if (this.y < -30) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
        ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, this.size, 0, this.size);
        ctx.bezierCurveTo(0, this.size, this.size / 2, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight);
        ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    const particles = Array.from({ length: 30 }, () => new HeartParticle());

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();
  }

  // Confetti helper
  function triggerConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff4b72', '#ff85a2', '#ffd1dc', '#ffffff']
      });
    }
  }
});
