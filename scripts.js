(function () {
  const track   = document.querySelector('.testimonials-track');
  const dotsEl  = document.querySelector('.testimonials-dots');
  const btnPrev = document.querySelector('.arrow-prev');
  const btnNext = document.querySelector('.arrow-next');
  if (!track || !dotsEl || !btnPrev || !btnNext) return;

  const slides = Array.from(track.querySelectorAll('.testimonials-slide'));
  const total  = slides.length; // 3
  let current  = 0;
  let autoTimer;

  // Build one dot per slide
  dotsEl.innerHTML = '';
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'dot' + (i === 0 ? ' active' : '');
    btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    btn.addEventListener('click', () => { goTo(i); resetAuto(); });
    dotsEl.appendChild(btn);
  });
  const dots = Array.from(dotsEl.querySelectorAll('.dot'));

  function goTo(index) {
    current = Math.max(0, Math.min(index, total - 1));

    // Each slide is 100% of the wrapper width — offset by multiples of 100%
    track.style.transform = 'translateX(-' + (current * 100) + '%)';

    // Update dots
    dots.forEach((d, i) => d.classList.toggle('active', i === current));

    // Dim arrows at boundaries
    btnPrev.style.opacity = current === 0 ? '0.3' : '1';
    btnNext.style.opacity = current === total - 1 ? '0.3' : '1';
    btnPrev.style.pointerEvents = current === 0 ? 'none' : 'auto';
    btnNext.style.pointerEvents = current === total - 1 ? 'none' : 'auto';
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      goTo(current < total - 1 ? current + 1 : 0);
    }, 5000);
  }

  btnPrev.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  btnNext.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  // Initialise
  goTo(0);
  resetAuto();
})();