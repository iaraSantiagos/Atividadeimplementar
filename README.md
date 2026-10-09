# Relatório Técnico: Implementação de Fluxos Assíncronos e Testes Unitários

Este documento apresenta a documentação e a explicação detalhada da atividade prática desenvolvida para a disciplina de Testes de Software. O projeto foi estruturado em **TypeScript** e implementa conceitos de assincronismo, manipulação de objetos e validações automatizadas por meio de testes unitários nativos.

---

## 1. Estrutura do Projeto

O projeto foi organizado seguindo as boas práticas de arquitetura de software, separando a lógica de negócio dos scripts de validação:

```text
atividade-implementar/
├── src/
│   ├── aula01.ts        # Regras de negócio e fluxo assíncrono da Aula 01
│   └── aula02.ts        # Regras de negócio e fluxo assíncrono da Aula 02
├── tests/
│   ├── aula01.test.ts   # Suíte de testes unitários para a Aula 01
│   └── aula02.test.ts   # Suíte de testes unitários para a Aula 02
├── dist/                # Arquivos JavaScript gerados automaticamente (Compilados)
├── package.json         # Configuração de dependências e scripts do ecossistema Node
└── tsconfig.json        # Diretrizes do compilador TypeScript
```

---

## 2. Conceitos Assíncronos Implementados

Para cumprir os requisitos solicitados, foram integrados dois pilares do JavaScript/TypeScript assíncrono:

### A. Simulação de uma `Promise`
Uma `Promise` (Promessa) é um objeto que representa a eventual conclusão (ou falha) de uma operação assíncrona. Nos arquivos `aula01.ts` e `aula02.ts`, as funções `checarPainelAeroporto` e `consultarRestricoesClinicas` retornam explicitamente uma `new Promise`. Dentro delas, utilizamos o método `setTimeout` para simular o tempo de resposta em background de um servidor remoto ou banco de dados (atraso de 300ms).

* **`resolve()`**: Invocado quando a operação simulada ocorre com sucesso.
* **`reject()`**: Invocado para disparar uma exceção (erro) caso os parâmetros de entrada sejam inválidos.

### B. Controle de Fluxo com `async` / `await`
As funções principais de processamento recebem o modificador `async`, o que indica que elas obrigatoriamente retornam uma promessa e permitem o uso do operador `await`.

* O operador `await` pausa de forma não-bloqueante a execução da função síncrona sequencial até que a `Promise` da API simulada mude de estado (seja resolvida ou rejeitada).
* O bloco `try/catch` é obrigatoriamente utilizado para capturar e tratar eventuais rejeições geradas no ecossistema assíncrono, garantindo a resiliência do software.

---

## 3. Detalhamento das Aulas

### Aula 01 (`src/aula01.ts`)
Evolução do cenário de pesagem de bagagens e checagem de passagens. O software consome a função assíncrona do painel do aeroporto. Se o voo retornar o status `"CANCELADO"`, o fluxo intercepta o processo e suspende o embarque antes de calcular as variáveis físicas. Caso contrário, valida se o peso cumulativo das malas respeita o limite aritmético (23kg por mala despachada) e se a passagem foi comprada.

### Aula 02 (`src/aula02.ts`)
Evolução do objeto complexo `Pessoa`. A função calcula o Índice de Massa Corporal (IMC) usando operadores aritméticos baseados no peso e na altura ao quadrado. Simultaneamente, o operador `await` consulta um prontuário médico externo para verificar restrições clínicas. O laudo final só é emitido se o paciente for maior de idade, possuir peso saudável (IMC entre 18.5 e 24.9) e não apresentar travas no sistema remoto de saúde.

---

## 4. Testes Unitários Nativos

Para validar as implementações sem a necessidade de frameworks complexos de terceiros, foram desenvolvidas estruturas de asserção baseadas em funções de verificação comparativa (`assegurar` e `verificar`).

Os arquivos dentro da pasta `tests/` cobrem 100% dos caminhos lógicos previstos na aplicação:

1. **Cenário de Sucesso Regular**: Garante que o fluxo síncrono e assíncrono convergem positivamente quando os dados cumprem os requisitos.
2. **Cenário de Regra de Negócio Violada**: Testa o comportamento do sistema quando limites físicos (excesso de peso) ou biológicos (IMC fora do padrão) falham.
3. **Cenário de Retorno Assíncrono Restritivo**: Valida a reação do código ao receber um status impeditivo de uma `Promise` resolvida (voo cancelado ou ficha clínica bloqueada).
4. **Cenário de Tratamento de Erro Crítico**: Avalia se o bloco `catch` consegue interceptar e tratar uma rejeição disparada pelo método `reject()` da `Promise`.

### 4.1 Conceitos Teóricos de Testes Unitários Aplicados

Para fundamentar as validações desenvolvidas no projeto, foram aplicados conceitos fundamentais da disciplina de Qualidade e Testes de Software:

* **O que é um Teste Unitário?** É o processo de isolar a menor parte testável de um sistema (neste caso, funções específicas de cálculo e tomada de decisão) e verificar seu comportamento de maneira isolada do restante da aplicação.
* **Isolamento de Efeitos Colaterais**: Em um ambiente de produção real, funções que dependem de bancos de dados ou APIs externas (como a checagem do painel ou prontuário) tornam os testes lentos e instáveis. Ao simular o comportamento de rede de forma previsível por meio de Promises locais controladas, aplicamos o conceito de isolamento, garantindo que o teste avalie estritamente a lógica interna da função.
* **Critério de Aceitação e Asserções**: Cada teste estabelece uma asserção lógica clara (mecanismo através das funções `assegurar` e `verificar`), comparando o dado retornado na execução real contra o valor teoricamente esperado. Se os valores divergirem, o teste falha, apontando imediatamente o local da regressão no código-fonte.
* **Mapeamento de Fluxos Alternativos e de Exceção**: Os testes não se limitam ao "caminho feliz" (fluxo de sucesso). Eles cobrem intencionalmente fluxos alternativos (como o bloqueio por regras de negócio) e fluxos de exceção (como parâmetros vazios provocando a rejeição da Promise). Essa abordagem eleva o indicador de cobertura de código (*code coverage*) e atesta a robustez do software contra falhas em tempo de execução.

---

## 5. Como Executar o Projeto

Para compilar o código fonte TypeScript para a pasta `dist` e disparar a execução de todos os testes sequencialmente, execute o comando abaixo no terminal da pasta raiz:

```bash
npm run test
```
