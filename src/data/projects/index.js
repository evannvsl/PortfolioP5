// ============================================================
// src/data/projects/index.js
// Tambah project baru: import dari file barunya lalu masukkan
// ke array projects di bawah.
// ============================================================
import { projectCode }         from './code.js';
import { projectHardware }     from './hardware.js';
import { projectCreative }     from './creative.js';
import { projectAchievements } from './achievements.js';

export const projects = [
  projectCode,
  projectHardware,
  projectCreative,
  projectAchievements,
];