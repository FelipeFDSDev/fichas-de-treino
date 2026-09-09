export const EXERCICIOS = [
  'Supino reto',
  'Supino inclinado',
  'Crucifixo',
  'Flexão de braços',
  'Rosca direta',
  'Rosca martelo',
  'Rosca concentrada',
  'Tríceps corda',
  'Tríceps testa',
  'Mergulho',
  'Puxada frontal',
  'Remada curvada',
  'Remada unilateral',
  'Levantamento terra',
  'Agachamento livre',
  'Agachamento sumô',
  'Leg press',
  'Cadeira extensora',
  'Flexora',
  'Stiff',
  'Elevação pélvica',
  'Desenvolvimento militar',
  'Elevação lateral',
  'Elevação frontal',
  'Remada alta',
  'Prancha',
  'Abdominal infra',
  'Abdominal supra',
  'Prancha lateral',
  "Farmer's walk",
];

export const getRandomExercises = (count) => {
  const shuffled = [...EXERCICIOS];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));
  return selected.map(name => ({
    nome: name,
    detalhe: `${Math.floor(Math.random() * 3) + 3}x${Math.floor(Math.random() * 6) + 8}`
  }));
};