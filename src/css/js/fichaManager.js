
import { generateId } from './utils.js';

class FichaManager {
  constructor() {
    this.fichas = [];
    this.listeners = [];
    this.loadFromStorage();
  }

  addFicha(nome, nivel, exercicios) {
    const ficha = {
      id: generateId(),
      nome: nome.trim() || 'Treino sem nome',
      nivel: nivel || 'Intermediário',
      exercicios: exercicios.map(ex => ({
        nome: ex.nome,
        detalhe: ex.detalhe || '3x10'
      })),
      createdAt: new Date().toISOString()
    };
    this.fichas.push(ficha);
    this.saveToStorage();
    this.notifyListeners();
    return ficha;
  }

  removeFicha(id) {
    this.fichas = this.fichas.filter(f => f.id !== id);
    this.saveToStorage();
    this.notifyListeners();
  }

  clearAll() {
    this.fichas = [];
    this.saveToStorage();
    this.notifyListeners();
  }

  getFichas() {
    return [...this.fichas];
  }

  getFichaById(id) {
    return this.fichas.find(f => f.id === id);
  }

  importFichas(data) {
    if (!Array.isArray(data)) {
      throw new Error('Formato inválido: esperado array');
    }
    this.fichas = data.map(f => ({
      ...f,
      id: f.id || generateId()
    }));
    this.saveToStorage();
    this.notifyListeners();
  }

  exportFichas() {
    return JSON.stringify(this.fichas, null, 2);
  }

  saveToStorage() {
    try {
      localStorage.setItem('treino-fichas', JSON.stringify(this.fichas));
    } catch (e) {
      console.warn('Não foi possível salvar no localStorage:', e);
    }
  }

  loadFromStorage() {
    try {
      const data = localStorage.getItem('treino-fichas');
      if (data) {
        this.fichas = JSON.parse(data);
      }
    } catch (e) {
      console.warn('Não foi possível carregar do localStorage:', e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.fichas));
  }
}

export const fichaManager = new FichaManager();