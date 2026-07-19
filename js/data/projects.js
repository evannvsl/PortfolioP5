// ============================================================
// js/data/projects.js — Index
// Tambah project baru: import dari file barunya lalu masukkan
// ke array projects di bawah, urutan = urutan tampil di grid.
// ============================================================
import { projectCode }         from './projects/code.js';
import { projectHardware }     from './projects/hardware.js';
import { projectCreative }     from './projects/creative.js';
import { projectAchievements } from './projects/achievements.js';

export const projects = [
  projectCode,
  projectHardware,
  projectCreative,
  projectAchievements,
];

export const skillsData = [
  { label: 'FRONTEND', value: 'React, Tailwind, Vue',                        percent: 90 },
  { label: 'BACKEND',  value: 'Node.js, Express, REST API',                  percent: 75 },
  { label: 'BAHASA',   value: 'JavaScript, Python, SQL',                     percent: 85 },
  { label: 'DESAIN',   value: 'Alight Motion, After Effects, Davinci',        percent: 70 },
];
