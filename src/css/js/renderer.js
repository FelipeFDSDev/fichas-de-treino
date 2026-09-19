export class Renderer {
  constructor(gridElement, emptyElement, badgeElement) {
    this.grid = gridElement;
    this.empty = emptyElement;
    this.badge = badgeElement;
  }

  render(fichas) {
    // Remove existing cards
    const cards = this.grid.querySelectorAll('.treino-card');
    cards.forEach(el => el.remove());

    if (fichas.length === 0) {
      this.empty.classList.remove('hidden');
      this.badge.textContent = '📋 0 fichas';
      return;
    }

    this.empty.classList.add('hidden');
    this.badge.textContent = `📋 ${fichas.length} ficha${fichas.length > 1 ? 's' : ''}`;

    fichas.forEach(ficha => {
      const card = this.createCard(ficha);
      this.grid.appendChild(card);
    });
  }

  createCard(ficha) {
    const card = document.createElement('div');
    card.className = 'treino-card';
    card.dataset.id = ficha.id;
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', `Ficha de treino: ${ficha.nome}`);

    // Header
    const header = document.createElement('div');
    header.className = 'card-header';
    header.innerHTML = `
      <h3>${ficha.nome}</h3>
      <span class="nivel">${ficha.nivel}</span>
    `;
    card.appendChild(header);

    // Exercise list
    const ul = document.createElement('ul');
    ul.className = 'exercicios-lista';
    ficha.exercicios.forEach(ex => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="ex-nome">${ex.nome}</span>
        <span class="ex-detalhe">${ex.detalhe}</span>
      `;
      ul.appendChild(li);
    });
    card.appendChild(ul);

    // Footer
    const footer = document.createElement('div');
    footer.className = 'card-footer';
    const btnRemover = document.createElement('button');
    btnRemover.className = 'btn-remover';
    btnRemover.textContent = '✕ Remover';
    btnRemover.setAttribute('aria-label', `Remover ficha ${ficha.nome}`);
    btnRemover.addEventListener('click', e => {
      e.stopPropagation();
      const removeEvent = new CustomEvent('removeFicha', {
        detail: { id: ficha.id },
      });
      document.dispatchEvent(removeEvent);
    });
    footer.appendChild(btnRemover);
    card.appendChild(footer);

    return card;
  }
}
