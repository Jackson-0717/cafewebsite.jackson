// 開場動畫
const introScreen = document.getElementById('introScreen');
if (introScreen) {
  const dismissIntro = () => introScreen.classList.add('hide');
  introScreen.addEventListener('click', dismissIntro);
  setTimeout(dismissIntro, 4000);
}

// 行動選單
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// 課程時間 Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const classPanels = document.querySelectorAll('.class-panel');
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabButtons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    classPanels.forEach(panel => {
      const match = panel.id === `panel-${target}`;
      panel.classList.toggle('active', match);
      panel.hidden = !match;
    });
  });
});

// 滾動出現動畫
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// 預約表單（前端展示用，尚未串接後端）
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
if (contactForm && formNote) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formNote.hidden = false;
    contactForm.reset();
  });
}
