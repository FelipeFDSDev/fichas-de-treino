export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const isValidExerciseCount = (count) => {
  return Number.isInteger(count) && count >= 3 && count <= 8;
};