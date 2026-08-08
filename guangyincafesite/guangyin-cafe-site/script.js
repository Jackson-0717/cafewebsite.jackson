// 開場打字動畫 + 進站
(function initIntro() {
  const introScreen = document.getElementById('introScreen');
  const introText = document.getElementById('introText');
  const message = '老闆娘把門打開了，請進';
  let i = 0;

  function typeChar() {
    if (i <= message.length) {
      introText.textContent = message.slice(0, i);
      i++;
      setTimeout(typeChar, 200);
    }
  }
  setTimeout(typeChar, 4300); // 等店員把門推開後再開始打字

  function enterSite() {
    introScreen.classList.add('hide');
    document.body.style.overflow = 'auto';
  }

  introScreen.addEventListener('click', enterSite);
  // 若使用者不點擊，動畫結束後自動進入
  setTimeout(enterSite, 8000);
})();

// 暖色散景光點，緩緩飄浮
(function initBokeh() {
  const container = document.getElementById('particles');
  if (!container) return;
  const total = 16;

  for (let n = 0; n < total; n++) {
    const p = document.createElement('div');
    p.className = 'bokeh';
    const left = Math.random() * 100;
    const top = 10 + Math.random() * 70;
    const size = 8 + Math.random() * 18;
    const duration = 6 + Math.random() * 6;
    const delay = Math.random() * 6;
    const drift = (Math.random() * 60 - 30).toFixed(0) + 'px';

    p.style.left = left + 'vw';
    p.style.top = top + 'vh';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.setProperty('--drift', drift);
    p.style.animationDuration = duration + 's';
    p.style.animationDelay = delay + 's';

    container.appendChild(p);
  }
})();

// 水晶吊燈的閃爍光點
(function initSparkles() {
  const container = document.getElementById('sparkles');
  if (!container) return;
  const parent = container.parentElement;
  container.remove();
  const total = 10;

  for (let n = 0; n < total; n++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    const left = 10 + Math.random() * 80;
    const top = 5 + Math.random() * 55;
    const delay = 2.3 + Math.random() * 3;

    s.style.left = left + '%';
    s.style.top = top + 'px';
    s.style.animationDelay = delay + 's';

    parent.appendChild(s);
  }
})();

// 捲動淡入效果
(function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach((el) => observer.observe(el));
})();

// 菜單分類切換
(function initMenuTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.menu-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach((p) => {
        p.classList.remove('active');
        p.hidden = true;
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const panel = document.getElementById('panel-' + tab.dataset.tab);
      panel.hidden = false;
      panel.classList.add('active');
    });
  });
})();
