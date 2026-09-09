import { fichaManager } from './fichaManager.js';
import { Renderer } from './renderer.js';
import { getRandomExercises } from './exercises.js';

let renderer;

export function init() {
  // DOM references
  const grid = document.getElementById('cardsGrid');
  const emptyState = document.getElementById('emptyState');
  const totalBadge = document.getElementById('totalBadge');
  const nomeInput = document.getElementById('nomeTreino');
  const nivelSelect = document.getElementById('nivelSelect');
  const numExerciciosInput = document.getElementById('numExercicios');
  const gerarBtn = document.getElementById('gerarBtn');
  const limparBtn = document.getElementById('limparBtn');
  const exportarBtn = document.getElementById('exportarBtn');
  const importarBtn = document.getElementById('importarBtn');

  // Initialize renderer
  renderer = new Renderer(grid, emptyState, totalBadge);
  
  // Subscribe to changes
  fichaManager.subscribe((fichas) => {
    renderer.render(fichas);
  });

  // Initial render
  renderer.render(fichaManager.getFichas());

  // Event: Generate
  gerarBtn.addEventListener('click', () => {
    const nome = nomeInput.value.trim() || 'Treino';
    const nivel = nivelSelect.value;
    let qtde = parseInt(numExerciciosInput.value, 10);
    if (isNaN(qtde) || qtde < 1) qtde = 3;
    if (qtde > 8) qtde = 8;
    numExerciciosInput.value = qtde;

    const exercicios = getRandomExercises(qtde);
    fichaManager.addFicha(nome, nivel, exercicios);
  });

  // Event: Remove
  document.addEventListener('removeFicha', (e) => {
    fichaManager.removeFicha(e.detail.id);
  });

  // Event: Clear all
  limparBtn.addEventListener('click', () => {
    if (fichaManager.getFichas().length === 0) return;
    if (confirm('Remover todas as fichas?')) {
      fichaManager.clearAll();
    }
  });

  // Event: Export
  exportarBtn.addEventListener('click', () => {
    const fichas = fichaManager.getFichas();
    if (fichas.length === 0) {
      alert('Nenhuma ficha para exportar.');
      return;
    }
    const dataStr = fichaManager.exportFichas();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fichas_treino_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Event: Import
  importarBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          fichaManager.importFichas(data);
        } catch (err) {
          alert('Erro ao importar: formato inválido');
          console.error(err);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  });

  // Keyboard shortcuts
  const shortcuts = {
    'Enter': () => gerarBtn.click(),
    'Escape': () => limparBtn.click()
  };

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
      if (e.key === 'Enter') {
        gerarBtn.click();
      }
      return;
    }
    const handler = shortcuts[e.key];
    if (handler) {
      e.preventDefault();
      handler();
    }
  });

  // Set version
  const versionEl = document.getElementById('version');
  if (versionEl) {
    versionEl.textContent = `v${process.env.npm_package_version || '1.0.0'}`;
  }

  console.log('🏋️ Treino Fichas App inicializado!');
}