# Exemplo de Cache com Redis em NestJS

Este é um exemplo simples de como implementar cache usando Redis em uma aplicação NestJS.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- Redis instalado e rodando localmente
- npm ou yarn

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Certifique-se de que o Redis está rodando localmente na porta padrão (6379)

3. Inicie a aplicação:
```bash
npm run build
npm run start:dev
```

## Uso

A aplicação expõe dois endpoints:

1. GET `/cache/:key` - Obtém dados do cache ou do banco de dados
2. DELETE `/cache/:key` - Invalida o cache para uma chave específica

### Exemplos de uso:

1. Obter dados:
```bash
curl http://localhost:3000/cache/minha-chave
```

2. Invalidar cache:
```bash
Invoke-RestMethod -Uri http://localhost:3000/cache/minha-chave -Method Delete
```

## Funcionamento

- **Contador de Visitas**: Cada requisição incrementa um contador global de visitas
- **Primera requisição**: Os dados são obtidos do "banco de dados" (simulado) com timestamp
- **Requisições subsequentes**: Os dados são obtidos do cache Redis
- **TTL do Cache**: O cache expira automaticamente após 1 hora (3600 segundos)
- **Invalidação Manual**: Você pode invalidar o cache usando o endpoint DELETE

### Formato das Respostas

**Primeira visita (dados do banco)**:
```
Dados do banco de dados - obtidos em 12/12/2024 10:30:00 (Visita #1 - do banco de dados)
```

**Visitas subsequentes (dados do cache)**:
```
Dados do banco de dados - obtidos em 12/12/2024 10:30:00 (Visita #2 - do cache)
```

## Observações

- Os dados armazenados no cache são "limpos" (sem informação de visita)
- A informação de visita é adicionada apenas na resposta ao cliente
- Logs detalhados mostram a origem dos dados (cache ou banco) e número da visita