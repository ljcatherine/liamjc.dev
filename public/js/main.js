const root = document.documentElement;
const motionOn = root.dataset.motion !== 'off';

const toggle = document.getElementById('motion-toggle');
toggle.textContent = `Animations: ${motionOn ? 'on' : 'off'}`;
toggle.addEventListener('click', () => {
  try {
    motionOn ? localStorage.setItem('motion', 'off') : localStorage.removeItem('motion');
  } catch (e) {}
  location.reload();
});

if (motionOn) {
  // Scroll timelines aren't in every browser yet (Firefox), so drive the reveals from JS there.
  const needsFallback = !CSS.supports('animation-timeline: view()');
  const reveals = [...document.querySelectorAll('.reveal')];
  let queued = false;

  function onFrame() {
    queued = false;
    root.style.setProperty('--scroll', String(scrollY));
    if (!needsFallback) return;
    for (const el of reveals) {
      const box = el.getBoundingClientRect();
      const t = Math.max(0, Math.min(1, (innerHeight - box.top) / (Math.min(box.height, innerHeight) * 0.45)));
      el.style.opacity = String(0.2 + 0.8 * t);
      el.style.translate = `0 ${40 * (1 - t)}px`;
    }
  }
  function queue() {
    if (!queued) { queued = true; requestAnimationFrame(onFrame); }
  }
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);
  onFrame();

  const hero = document.querySelector('.hero');
  const coord = hero.querySelector('.coord');
  hero.addEventListener('pointermove', (e) => {
    const box = hero.getBoundingClientRect();
    const x = Math.round(e.clientX - box.left);
    const y = Math.round(e.clientY - box.top);
    hero.style.setProperty('--x', `${x}px`);
    hero.style.setProperty('--y', `${y}px`);
    coord.textContent = `x ${String(x).padStart(4, '0')}  y ${String(y).padStart(4, '0')}`;
  });
}
