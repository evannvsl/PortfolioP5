// ============================================================
// js/modules/skills.js (render data)
// ============================================================
import { skillsData } from '../data/projects.js';

export function renderSkills() {
  const table = document.getElementById('specTable');
  if (!table) return;
  table.innerHTML = '';
  skillsData.forEach(s => {
    const row = document.createElement('div');
    row.className = 'spec-row reveal';
    row.innerHTML = `
      <span class="spec-label">${s.label}</span>
      <span class="spec-value">${s.value}</span>
      <span class="spec-bar"><i style="width:${s.percent}%"></i></span>
    `;
    table.appendChild(row);
  });
}