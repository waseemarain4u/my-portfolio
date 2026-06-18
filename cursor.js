/*
  Custom fluid cursor — glowing dot + trailing ring.
  Applies cursor:none globally and manages hover/click states.
*/
(function () {
  'use strict';

  const style = document.createElement('style');
  style.textContent = [
    '*, *::before, *::after { cursor: none !important; }',
    '#fc-dot {',
    '  position: fixed; top: 0; left: 0;',
    '  width: 10px; height: 10px;',
    '  background: #2563EB;',
    '  border-radius: 50%;',
    '  pointer-events: none;',
    '  z-index: 999999;',
    '  transform: translate(-50%, -50%);',
    '  box-shadow: 0 0 14px 5px rgba(37,99,235,.75), 0 0 30px 10px rgba(37,99,235,.25);',
    '  transition: width .15s, height .15s, background .15s, opacity .3s, box-shadow .15s;',
    '  opacity: 0;',
    '  will-change: left, top;',
    '}',
    '#fc-ring {',
    '  position: fixed; top: 0; left: 0;',
    '  width: 40px; height: 40px;',
    '  border: 2px solid rgba(37,99,235,.5);',
    '  border-radius: 50%;',
    '  pointer-events: none;',
    '  z-index: 999998;',
    '  transform: translate(-50%, -50%);',
    '  transition: width .22s, height .22s, border-color .22s, opacity .3s;',
    '  opacity: 0;',
    '  will-change: left, top;',
    '}',
    '#fc-dot.fc-hover {',
    '  width: 14px; height: 14px; background: #3B82F6;',
    '  box-shadow: 0 0 20px 6px rgba(59,130,246,.85), 0 0 40px 14px rgba(59,130,246,.3);',
    '}',
    '#fc-ring.fc-hover { width: 56px; height: 56px; border-color: rgba(59,130,246,.75); }',
    '#fc-dot.fc-click { transition: transform .08s; transform: translate(-50%,-50%) scale(.7); }',
  ].join('\n');
  document.head.appendChild(style);

  let dot, ring;
  let mx = -200, my = -200;
  let rx = -200, ry = -200;

  function createCursor() {
    dot = document.createElement('div');
    dot.id = 'fc-dot';
    ring = document.createElement('div');
    ring.id = 'fc-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    animateRing();
  }

  function animateRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    if (ring) {
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
    }
    requestAnimationFrame(animateRing);
  }

  window.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    if (!dot) return;
    dot.style.left    = mx + 'px';
    dot.style.top     = my + 'px';
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  window.addEventListener('mouseleave', function () {
    if (!dot) return;
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });

  window.addEventListener('mouseenter', function () {
    if (!dot) return;
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });

  window.addEventListener('mousedown', function () {
    if (dot) dot.classList.add('fc-click');
  });

  window.addEventListener('mouseup', function () {
    if (dot) dot.classList.remove('fc-click');
  });

  function bindHovers() {
    document.querySelectorAll('a, button, [role="button"], input, textarea, select, label').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        if (dot)  dot.classList.add('fc-hover');
        if (ring) ring.classList.add('fc-hover');
      });
      el.addEventListener('mouseleave', function () {
        if (dot)  dot.classList.remove('fc-hover');
        if (ring) ring.classList.remove('fc-hover');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      createCursor();
      bindHovers();
    });
  } else {
    createCursor();
    bindHovers();
  }
})();
