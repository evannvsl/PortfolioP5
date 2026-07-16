// ============================================================
// js/modules/chat.js
// ============================================================
export function initChat() {
  const bubbles = document.querySelectorAll('.chat-bubble');
  if (!bubbles.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const index = Array.from(bubbles).indexOf(el);
        setTimeout(() => el.classList.add('in'), index * 160);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  bubbles.forEach(b => io.observe(b));
}