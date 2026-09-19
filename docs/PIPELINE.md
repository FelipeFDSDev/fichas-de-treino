# Documentação da Pipeline GitHub Actions

## 1. Objetivo

A pipeline automatiza a validação e a geração do projeto **Ficha de Treino**. A cada alteração enviada para as branches `main` ou `develop`, ou em um pull request para essas branches, o GitHub Actions executa as verificações de qualidade, realiza o build e disponibiliza o resultado como artefato.

O workflow também pode ser iniciado manualmente pelo botão **Run workflow** na aba **Actions** do repositório.

Workflow utilizado: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)

## 2. Actions utilizadas

Foram escolhidas três Actions disponíveis no GitHub Marketplace:

| Action | Versão | Função | Contribuição para a automação |
| --- | --- | --- | --- |
| [`actions/checkout`](https://github.com/marketplace/actions/checkout) | `v4` | Baixa o código do repositório para o runner do GitHub. | Permite que todas as etapas seguintes tenham acesso aos arquivos, scripts, testes e configurações do projeto sem intervenção manual. |
| [`actions/setup-node`](https://github.com/marketplace/actions/setup-node-js-environment) | `v4` | Instala e configura o Node.js 20 no ambiente de execução. | Padroniza o ambiente da pipeline e garante que os comandos `npm ci`, lint, testes e build utilizem uma versão conhecida do Node.js. |
| [`actions/upload-artifact`](https://github.com/marketplace/actions/upload-a-build-artifact) | `v4` | Armazena arquivos e diretórios gerados pelo workflow. | Publica `src/` e `dist/` como o artefato `treino-fichas-build`, permitindo baixar e inspecionar o resultado sem acessar o runner. |

## 3. Etapas da pipeline

A pipeline possui um job chamado **Testes e build**, executado em um runner `ubuntu-latest`.

### Etapa 1: Checkout do código

```yaml
- name: Checkout do código
  uses: actions/checkout@v4
```

A Action recupera a versão do projeto associada ao commit que disparou o workflow. Isso cria a base necessária para as demais tarefas.

### Etapa 2: Configuração do Node.js

```yaml
- name: Configurar Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 20
```

A Action configura o Node.js 20 no runner. Em seguida, a pipeline instala as dependências de forma reproduzível usando o `package-lock.json`:

```yaml
- name: Instalar dependências
  run: npm ci
```

### Etapa 3: Verificações de qualidade

A pipeline executa:

```yaml
npm run lint
npm run format:check
```

O lint identifica problemas no JavaScript e o Prettier verifica se os arquivos estão formatados de acordo com o padrão do projeto.

### Etapa 4: Testes automatizados

```yaml
- name: Executar testes
  run: npm test -- --runInBand
```

Os testes unitários verificam o comportamento do `FichaManager`, incluindo criação, remoção, limpeza, exportação e importação de fichas.

### Etapa 5: Build

```yaml
- name: Gerar build
  run: npm run build
```

O build executa novamente o lint e os testes e, depois, utiliza o script `scripts/minify.js` para gerar os arquivos JavaScript minificados no diretório `dist/`.

### Etapa 6: Publicação do artefato

```yaml
- name: Publicar artefato da aplicação
  uses: actions/upload-artifact@v4
  with:
    name: treino-fichas-build
    path: |
      src/
      dist/
```

A Action disponibiliza os arquivos da aplicação e o resultado da minificação para download na página da execução do workflow.

## 4. Fluxo automatizado

```text
Alteração no repositório
        |
        v
actions/checkout@v4
        |
        v
actions/setup-node@v4 + npm ci
        |
        v
Lint + formatação + testes
        |
        v
Build e minificação
        |
        v
actions/upload-artifact@v4
        |
        v
Artefato treino-fichas-build
```

As etapas de qualidade funcionam como gates: se o lint, a formatação, os testes ou o build falharem, a publicação do artefato não é concluída. Assim, a pipeline evita disponibilizar uma versão que não passou pelas verificações do projeto.

## 5. Como verificar a execução

1. Envie um commit para `main` ou `develop`, abra um pull request ou execute o workflow manualmente.
2. Acesse a aba **Actions** no GitHub.
3. Abra a execução chamada **Pipeline de qualidade**.
4. Confirme se as etapas de checkout, configuração do Node.js, instalação, qualidade, testes e build foram concluídas com sucesso.
5. Na área **Artifacts**, baixe `treino-fichas-build` e confirme a presença dos diretórios `src/` e `dist/`.

## 6. Validação local equivalente

Os principais comandos da pipeline também podem ser executados localmente:

```bash
npm install
npm run lint
npm run format:check
npm test -- --runInBand
npm run build
```

Esses comandos permitem identificar problemas antes do push e reproduzir as verificações realizadas automaticamente pelo GitHub Actions.
