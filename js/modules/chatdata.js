// ============================================================
// js/modules/chatdata.js (render chat bubbles)
// ============================================================
export function renderChat() {
  const arena = document.getElementById('chatArena');
  if (!arena) return;
  // Hanya render jika kosong (hindari duplikasi)
  if (arena.querySelector('.chat-bubble')) return;

  const chats = [
    { side: 'left', avatar: 'assets/img/ava_cat.png', name: 'MORGANA', text: 'Looking cool, Joker!' },
    { side: 'right', avatar: 'assets/img/ava_joker.png', name: 'JOKER', text: 'Thanks, Morgana.' },
    { side: 'left', avatar: 'assets/img/ava_cat.png', name: 'MORGANA', text: "I'm you... Nothing... Then don't text me!!!" },
    { side: 'right', avatar: 'assets/img/ava_joker.png', name: 'JOKER', text: 'Bit mean.' },
    { side: 'left', avatar: 'assets/img/ava_cat.png', name: 'MORGANA', text: 'Whatever... Seems ok?' },
    { side: 'right', avatar: 'assets/img/ava_joker.png', name: 'JOKER', text: 'Yeah that is actually a bit better. Good work mate.' },
    { side: 'left', avatar: 'assets/img/ava_cat.png', name: 'MORGANA', text: 'Finally!<br>Getting closer to being finished now, yay!' }
  ];

  // sisipkan di awal arena, sebelum .chat-input-bar
  const inputBar = arena.querySelector('.chat-input-bar');
  chats.forEach(c => {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${c.side}`;
    bubble.innerHTML = `
      <img src="${c.avatar}" alt="${c.name}" class="bubble-avatar" />
      <div class="bubble-body">
        <span class="bubble-name">${c.name}</span>
        <p>${c.text}</p>
      </div>
    `;
    arena.insertBefore(bubble, inputBar);
  });
}