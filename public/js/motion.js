// Animations are on unless the visitor switched them off with the footer toggle.
try {
  if (localStorage.getItem('motion') === 'off') document.documentElement.dataset.motion = 'off';
} catch (e) {}
