let list = document.querySelectorAll(".item");
    let prev = document.getElementById("prev");
    let next = document.getElementById("next");
    let active = 0;
    let count = list.length;
    let autoPlayInterval;

    const backgroundMusic = document.getElementById('backgroundMusic');
    const playButton = document.getElementById('playButton');
    const audioNotice = document.getElementById('audioNotice');

    function updateCarousel(newActive) {
      list[active].classList.remove("active");
      setTimeout(() => {
        active = newActive;
        list[active].classList.add("active");
      }, 30); 
    }

    function nextSlide() {
      let newActive = (active + 1) % count;
      updateCarousel(newActive);
      if (newActive === 0) {
        stopAutoPlay();
      }
    }

    function prevSlide() {
      let newActive = (active - 1 + count) % count;
      updateCarousel(newActive);
    }

    next.onclick = nextSlide;
    prev.onclick = prevSlide;

    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 3000);
    }

    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }

    startAutoPlay();

    prev.addEventListener('click', stopAutoPlay);
    next.addEventListener('click', stopAutoPlay);

    let musicStarted = false;

    function toggleMusic() {
      if (backgroundMusic.paused) {
        backgroundMusic.play();
        playButton.textContent = 'Pausar Música';
        playButton.style.animation = 'bounce 2s infinite';
      } else {
        backgroundMusic.pause();
        playButton.textContent = 'Tocar Música';
        playButton.style.animation = 'none';
      }
    }

    playButton.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMusic();
      musicStarted = true;
      audioNotice.classList.remove('show');
    });

    document.body.addEventListener('click', () => {
      if (!musicStarted) {
        toggleMusic();
        musicStarted = true;
        audioNotice.classList.remove('show');
      }
    });

    window.addEventListener('load', () => {
      audioNotice.classList.add('show');
      setTimeout(() => {
        audioNotice.classList.remove('show');
      }, 5000);
    });

    const bottles = document.querySelectorAll('.refri');
    bottles.forEach(bottle => {
      bottle.addEventListener('click', (e) => {
        e.stopPropagation();
        bottle.style.animation = 'none';
        bottle.offsetHeight;
        bottle.style.animation = 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both';
      });
    });