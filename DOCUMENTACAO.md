# Documentação do Sistema de Cache com Redis

## Visão Geral
Este projeto implementa um sistema de cache utilizando Redis em uma aplicação NestJS, demonstrando boas práticas de otimização de performance e gerenciamento de dados em memória, com controle de visitas e monitoramento detalhado.

## Arquitetura do Sistema

### Componentes Principais

1. **Redis (Cache Layer)**
   - Servidor de cache em memória
   - Responsável pelo armazenamento temporário de dados
   - Configurado para expirar dados após 1 hora (3600 segundos)
   - Porta padrão: 6379

2. **NestJS (Application Layer)**
   - Framework Node.js para construção de aplicações escaláveis
   - Gerencia a lógica de negócio e comunicação com o Redis
   - Implementa padrões de projeto e boas práticas de desenvolvimento
   - Controle de contador de visitas em memória

### Estrutura do Código

```
src/
├── app.module.ts    # Configuração do módulo principal e Redis
├── app.service.ts   # Lógica de negócio e manipulação do cache
├── app.controller.ts # Endpoints da API
└── main.ts         # Ponto de entrada da aplicação
```

## Funcionalidades Implementadas

### 1. Sistema de Cache Avançado
- **Armazenamento**: Dados "limpos" armazenados no Redis com TTL de 1 hora
- **Recuperação**: Implementação de padrão "Cache-Aside"
- **Invalidação**: Mecanismo manual de limpeza de cache
- **Contador de Visitas**: Rastreamento sequencial de todas as requisições
- **Timestamping**: Registro de quando os dados foram obtidos originalmente

### 2. Endpoints da API
- **GET /cache/:key**
  - Recupera dados do cache ou fonte original
  - Implementa lógica de fallback para banco de dados
  - Incrementa contador de visitas
  - Retorna dados com informação de origem (cache/banco) e número da visita
  - Formato: `"dados (Visita #N - do cache/banco de dados)"`

- **DELETE /cache/:key**
  - Remove dados específicos do cache
  - Permite controle manual da invalidação
  - Não afeta o contador de visitas

### 3. Sistema de Monitoramento
- **Logs Detalhados**: Cada operação é logada com informações contextuais
- **Rastreamento de Origem**: Distinção clara entre dados do cache e banco
- **Contador Sequencial**: Numeração contínua de todas as visitas
- **Timestamps**: Registro preciso de quando os dados foram gerados

## Comportamento do Sistema

### Fluxo de uma Requisição
1. **Incremento do Contador**: Cada requisição incrementa o contador global
2. **Consulta ao Cache**: Verifica se os dados existem no Redis
3. **Cache Hit**: Se encontrado, retorna dados do cache com informação de visita
4. **Cache Miss**: Se não encontrado, gera novos dados com timestamp atual
5. **Armazenamento**: Salva dados "limpos" no cache (sem informação de visita)
6. **Resposta**: Retorna dados com informação de visita e origem

### Exemplo de Comportamento
```
Visita #1: "Dados do banco de dados - obtidos em 12/12/2024 10:30:00 (Visita #1 - do banco de dados)"
Visita #2: "Dados do banco de dados - obtidos em 12/12/2024 10:30:00 (Visita #2 - do cache)"
Visita #3: "Dados do banco de dados - obtidos em 12/12/2024 10:30:00 (Visita #3 - do cache)"
[Invalidação do cache]
Visita #4: "Dados do banco de dados - obtidos em 12/12/2024 11:00:00 (Visita #4 - do banco de dados)"
```

## Benefícios do Sistema

1. **Performance**
   - Redução significativa no tempo de resposta
   - Diminuição da carga no banco de dados
   - Melhor experiência do usuário

2. **Monitoramento**
   - Rastreamento detalhado de uso da API
   - Visibilidade completa do comportamento do cache
   - Logs estruturados para análise

3. **Escalabilidade**
   - Arquitetura preparada para crescimento
   - Fácil manutenção e extensão
   - Separação clara de responsabilidades

4. **Transparência**
   - Usuário sempre sabe a origem dos dados
   - Contagem precisa de visitas
   - Informações de timestamp para auditoria

## Métricas de Performance

- **Tempo de Resposta**:
  - Com cache: < 10ms
  - Sem cache: ~100ms (simulado)

- **Taxa de Hit/Miss**:
  - Monitoramento implementado via logs
  - Métricas disponíveis através dos logs estruturados
  - Diferenciação clara entre cache hits e misses

## Configurações Técnicas

### Cache TTL
- **Configuração no Módulo**: 24 horas (86400 segundos)
- **Configuração no Service**: 1 hora (3600 segundos) - prevalece
- **Motivo**: Configuração no service é mais específica e flexível

### Armazenamento de Dados
- **No Cache**: Apenas dados "limpos" sem metadados de visita
- **Na Resposta**: Dados enriquecidos com informações contextuais
- **Vantagem**: Evita concatenação em cascata e mantém cache limpo

## Próximos Passos Sugeridos

1. **Melhorias Técnicas**
   - Persistência do contador em Redis
   - Implementação de métricas de performance
   - Configuração de alertas para cache miss ratio

2. **Expansão de Funcionalidades**
   - Cache distribuído com múltiplas instâncias
   - Compressão de dados para otimização de memória
   - Cache em múltiplas camadas (L1, L2)

3. **Monitoramento Avançado**
   - Dashboard de métricas em tempo real
   - Alertas para comportamentos anômalos
   - Análise de padrões de uso

## Requisitos Técnicos

- Node.js >= 14
- Redis Server >= 6.0
- npm ou yarn
- Porta 3000 disponível para a aplicação
- Porta 6379 disponível para o Redis

## Conclusão

Este sistema demonstra uma implementação robusta e transparente de cache utilizando Redis, com recursos avançados de monitoramento e rastreamento. A solução é escalável, manutenível e oferece visibilidade completa do comportamento do sistema, sendo ideal tanto para aprendizado quanto para uso em produção. 