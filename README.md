# Ficha de Treino

Gerador de fichas de treino em HTML, CSS e JavaScript. O projeto inclui uma pipeline automatizada no GitHub Actions para verificar qualidade, executar os testes e publicar o build como artefato.

## Executar localmente

```bash
npm install
npm start
```

Comandos úteis:

```bash
npm run lint
npm run format:check
npm test
npm run build
```

## Pipeline automatizada

O workflow [ci.yml](.github/workflows/ci.yml) é executado em pushes para `main`/`develop`, pull requests e manualmente pelo botão **Run workflow**. Ele instala as dependências, executa lint, formatação, testes, build e publica `src/` e `dist/` como artefato para download.

### Actions do GitHub Marketplace utilizadas

1. **[actions/checkout](https://github.com/marketplace/actions/checkout)** (`actions/checkout@v4`): baixa o código do repositório no runner Ubuntu. É a primeira etapa, pois todas as verificações dependem dos arquivos do projeto.
2. **[actions/setup-node](https://github.com/marketplace/actions/setup-node-js-environment)** (`actions/setup-node@v4`): configura o Node.js 20 antes do `npm ci`, garantindo um ambiente padronizado para lint, testes e build.
3. **[actions/upload-artifact](https://github.com/marketplace/actions/upload-a-build-artifact)** (`actions/upload-artifact@v4`): armazena `src/` e `dist/` ao final do job, permitindo baixar e inspecionar o resultado gerado pela pipeline.

As Actions são usadas em etapas diferentes: preparação do código, preparação do ambiente e entrega do resultado. Os comandos `npm run lint`, `npm run format:check`, `npm test` e `npm run build` funcionam como quality gates: se qualquer um falhar, o artefato não é publicado.

### Como verificar a execução

1. Faça push para `main` ou abra um pull request.
2. Acesse a aba **Actions** no GitHub e abra o workflow **Pipeline de qualidade**.
3. Confirme as etapas de checkout, Node.js, validações e build.
4. Ao final, abra **Artifacts** e baixe `treino-fichas-build`.

## Estrutura principal

- `src/index.html`: entrada da aplicação.
- `src/css/style.css`: estilos da interface.
- `src/css/js/`: módulos da aplicação.
- `tests/unit/`: testes unitários.
- `scripts/minify.js`: gera os JavaScript minificados em `dist/`.
- `.github/workflows/ci.yml`: pipeline de integração contínua.
