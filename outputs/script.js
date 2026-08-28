(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const { gsap, ScrollTrigger } = window;
  const bookingWhatsApp = '5551982171591';
  const bookingForm = document.querySelector('#booking-form');
  const leadDock = document.querySelector('.lead-dock');
  const bookingSection = document.querySelector('#booking');
  const statsStatus = document.querySelector('#stats-status');
  const statsRefreshInterval = 60 * 60 * 1000;
  let statsUpdatedAt = 0;

  const formatPlays = (value) => new Intl.NumberFormat('pt-BR').format(value);

  const updatePlatformStats = async () => {
    try {
      const response = await fetch('/api/stats', { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`API respondeu ${response.status}`);

      const data = await response.json();
      const values = {
        soundcloud: Number(data.soundcloud?.plays),
        spotify: Number(data.spotify?.plays),
        total: Number(data.total),
      };

      if (Object.values(values).some((value) => !Number.isSafeInteger(value) || value < 0)) {
        throw new Error('Resposta de métricas inválida');
      }

      Object.entries(values).forEach(([key, value]) => {
        const target = document.querySelector(`[data-stat="${key}"]`);
        if (target) target.textContent = formatPlays(value);
      });

      const soundcloudLink = document.querySelector('.platform-stat[href*="soundcloud.com"]');
      const spotifyLink = document.querySelector('.platform-stat[href*="spotify.com"]');
      const total = document.querySelector('.platform-total');
      soundcloudLink?.setAttribute('aria-label', `${formatPlays(values.soundcloud)} reproduções em ${data.soundcloud.tracks} faixas próprias no SoundCloud`);
      spotifyLink?.setAttribute('aria-label', `${formatPlays(values.spotify)} reproduções nas ${data.spotify.tracks} faixas com números públicos no Spotify`);
      total?.setAttribute('aria-label', `${formatPlays(values.total)} reproduções públicas somadas`);

      statsUpdatedAt = Date.now();
      if (statsStatus) {
        const allLive = data.soundcloud?.live && data.spotify?.live;
        statsStatus.textContent = allLive
          ? 'Números de reproduções atualizados.'
          : 'SoundCloud atualizado; Spotify mantém o último número público confirmado.';
      }
    } catch {
      if (statsStatus) statsStatus.textContent = 'Mantendo os últimos números confirmados.';
    }
  };

  updatePlatformStats();
  window.setInterval(updatePlatformStats, statsRefreshInterval);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && Date.now() - statsUpdatedAt >= statsRefreshInterval) updatePlatformStats();
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      bookingForm.classList.add('is-validated');

      const status = bookingForm.querySelector('.form-status');

      if (!bookingForm.checkValidity()) {
        status.textContent = 'Revise os campos obrigatórios para continuar.';
        bookingForm.reportValidity();
        return;
      }

      const data = new FormData(bookingForm);
      const eventType = String(data.get('type')).trim();
      const city = String(data.get('city')).trim();
      const rawDate = String(data.get('date')).trim();
      const formattedDate = rawDate ? rawDate.split('-').reverse().join('/') : 'Não informada';
      const message = encodeURIComponent([
        'Olá, NOVUM! Quero solicitar um orçamento.',
        '',
        `Nome: ${String(data.get('name')).trim()}`,
        `E-mail: ${String(data.get('email')).trim()}`,
        `Cidade do evento: ${city}`,
        `Data do evento: ${formattedDate}`,
        `Tipo de evento: ${eventType}`,
        '',
        'Sobre o evento:',
        String(data.get('message')).trim() || 'Não informado.'
      ].join('\n'));

      status.textContent = 'Briefing pronto. Abrindo o WhatsApp…';
      window.location.href = `https://wa.me/${bookingWhatsApp}?text=${message}`;
    });
  }

  if (leadDock && bookingSection && 'IntersectionObserver' in window) {
    const dockTargets = [bookingSection, document.querySelector('.booking-board')].filter(Boolean);
    const visibleTargets = new Set();
    const dockObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleTargets.add(entry.target);
        else visibleTargets.delete(entry.target);
      });
      leadDock.classList.toggle('is-hidden', visibleTargets.size > 0);
    }, { threshold: 0.08 });
    dockTargets.forEach((target) => dockObserver.observe(target));
  }

  if (reduceMotion || !gsap) return;

  document.documentElement.classList.add('motion-ready');

  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });

  gsap.set('.hero-title span', { yPercent: 115 });
  gsap.set('.baile-stamp, .platform-stats', { y: 18 });
  gsap.set('.booking-board', { yPercent: 100 });
  gsap.set('.scroll-cue', { y: 10 });

  intro
    .fromTo('.hero-background', { scale: 1.065, xPercent: -0.5 }, { scale: 1.025, xPercent: 0, duration: 0.62 })
    .to('.hero-title span', { autoAlpha: 1, yPercent: 0, duration: 0.38 }, '-=0.4')
    .to('.baile-stamp', { autoAlpha: 1, y: 0, duration: 0.2 }, '-=0.12')
    .to('.platform-stats', { autoAlpha: 1, y: 0, duration: 0.24 }, '<')
    .to('.scroll-cue', { autoAlpha: 1, y: 0, duration: 0.16 }, '-=0.08')
    .to('.booking-board', { autoAlpha: 1, yPercent: 0, duration: 0.28 }, '-=0.14');

  if (!ScrollTrigger) return;

  gsap.to('.scroll-cue', {
    autoAlpha: 0,
    y: 8,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '28% top', scrub: true }
  });

  gsap.fromTo('.social-link', { x: -18, autoAlpha: 0 }, {
    x: 0,
    autoAlpha: 1,
    duration: 0.2,
    stagger: 0.04,
    scrollTrigger: { trigger: '.poster-info', start: 'top 75%' }
  });
})();
