# 🏋️ Ficha de Treino - Gerador

> Gerador de fichas de treino com pipeline CI/CD completa

![CI Pipeline](https://github.com/seu-usuario/treino-fichas/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/seu-usuario/treino-fichas/actions/workflows/deploy.yml/badge.svg)
![Code Coverage](https://img.shields.io/codecov/c/github/seu-usuario/treino-fichas)
![License](https://img.shields.io/github/license/seu-usuario/treino-fichas)

## 📋 Sobre o Projeto

Gerador de fichas de treino moderno com foco em UX e boas práticas de desenvolvimento. 
Este projeto foi construído com uma pipeline CI/CD completa para demonstrar automação 
de qualidade, testes e deploy.

## 🚀 Funcionalidades

- ✅ Gerar fichas de treino com exercícios aleatórios
- ✅ Personalizar nome, nível e quantidade de exercícios
- ✅ Remover fichas individualmente ou em lote
- ✅ Exportar/Importar fichas em JSON
- ✅ Persistência local com localStorage
- ✅ Design responsivo e acessível
- ✅ Keyboard shortcuts
- ✅ Pipeline CI/CD completa

## 🛠️ Tecnologias

- HTML5, CSS3, JavaScript (ES6+)
- GitHub Actions (CI/CD)
- Jest (Testes unitários)
- ESLint + Prettier (Quality)
- Lighthouse CI (Performance)
- SonarCloud (Análise estática)
- Snyk (Segurança)
- Codecov (Cobertura de código)

## 📦 Pipeline CI/CD

### Quality Gates
- Lint e formatação de código
- Testes unitários com cobertura (80%+)
- Análise estática com SonarCloud
- Verificação de segurança com Snyk
- Accessibility check com axe
- Performance audit com Lighthouse CI

### Deploy
- Build automático
- Deploy para GitHub Pages
- Notificações de deploy

## 🏃 Como Executar

### Desenvolvimento
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm start

# Rodar testes
npm test

# Rodar testes com cobertura
npm run test:coverage

# Lint
npm run lint

# Build para produção
npm run build