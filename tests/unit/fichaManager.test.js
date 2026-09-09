import { fichaManager } from '../../src/js/fichaManager.js';

describe('FichaManager', () => {
  beforeEach(() => {
    fichaManager.clearAll();
  });

  test('should add a ficha', () => {
    const ficha = fichaManager.addFicha('Teste', 'Iniciante', [
      { nome: 'Supino', detalhe: '3x10' }
    ]);
    
    expect(ficha).toHaveProperty('id');
    expect(ficha.nome).toBe('Teste');
    expect(ficha.nivel).toBe('Iniciante');
    expect(ficha.exercicios).toHaveLength(1);
    expect(ficha.exercicios[0].nome).toBe('Supino');
  });

  test('should remove a ficha', () => {
    const ficha = fichaManager.addFicha('Teste', 'Iniciante', [
      { nome: 'Supino', detalhe: '3x10' }
    ]);
    
    expect(fichaManager.getFichas()).toHaveLength(1);
    
    fichaManager.removeFicha(ficha.id);
    expect(fichaManager.getFichas()).toHaveLength(0);
  });

  test('should clear all fichas', () => {
    fichaManager.addFicha('Teste1', 'Iniciante', [{ nome: 'Supino', detalhe: '3x10' }]);
    fichaManager.addFicha('Teste2', 'Intermediário', [{ nome: 'Agachamento', detalhe: '4x10' }]);
    
    expect(fichaManager.getFichas()).toHaveLength(2);
    
    fichaManager.clearAll();
    expect(fichaManager.getFichas()).toHaveLength(0);
  });

  test('should export fichas as JSON', () => {
    fichaManager.addFicha('Teste', 'Iniciante', [{ nome: 'Supino', detalhe: '3x10' }]);
    const json = fichaManager.exportFichas();
    const parsed = JSON.parse(json);
    
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].nome).toBe('Teste');
  });

  test('should import fichas from JSON', () => {
    const data = [
      {
        id: 'test123',
        nome: 'Importado',
        nivel: 'Avançado',
        exercicios: [{ nome: 'Flexão', detalhe: '3x15' }]
      }
    ];
    
    fichaManager.importFichas(data);
    const fichas = fichaManager.getFichas();
    
    expect(fichas).toHaveLength(1);
    expect(fichas[0].nome).toBe('Importado');
    expect(fichas[0].nivel).toBe('Avançado');
  });
});