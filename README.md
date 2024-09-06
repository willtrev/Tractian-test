# Front End Software Engineer Challenge

## Preview: https://willtrev-tractian-challenge.netlify.app/

## Desafio: [Front End Software Engineer Challenge](https://github.com/tractian/challenges/blob/main/front-end/README.md)

### Video de demonstração da aplicação: [Gravação](https://youtu.be/iwNV1voQBKc)

### Melhorias planejadas:
- **Responsividade**: Adicionar suporte completo para dispositivos móveis e tablets.
- **Cache de Filtros**: Implementar funcionalidade para salvar filtros aplicados em cache, melhorando a experiência do usuário.

## Decisões de design e desenvolvimento:

- **Filtros combinados**: Os filtros de "sensor de energia" e "crítico" foram projetados para funcionarem simultaneamente, aprimorando a usabilidade da aplicação.
- **Tipo de equipamento e responsáveis**:
  - O tipo de equipamento não estava disponível diretamente na requisição. Foi utilizada uma estratégia de split na primeira palavra do nome do componente para exibir o tipo de equipamento.
  - Para sensores de energia, os responsáveis foram definidos como "Elétrica", e para sensores de vibração, como "Mecânica".
- **Imagens de componentes**: Como as imagens dos componentes não estavam disponíveis, foi criada uma box de placeholder informando que não há imagem disponível.

### Tecnologias utilizadas:
- **Frontend**: ReactJS, Vite, TypeScript.
- **Linting**: ESLint.
- **Roteamento**: React Router Dom.

