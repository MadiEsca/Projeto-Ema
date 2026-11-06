# Ema, Ema, Ema — Entregas

## Dashboard responsivo de gestão financeira pessoal

- [x] Criar a primeira tela do Ema, Ema, Ema em um arquivo HTML próprio, compatível com Flask/Jinja e organizada para fácil adaptação.
- [x] Implementar navegação compacta e responsiva para acesso às áreas do sistema financeiro.
- [x] Implementar resumo financeiro com cartões de saldo disponível, receitas e despesas.
- [x] Implementar visão de fluxo de caixa com indicadores de entradas e saídas.
- [x] Implementar gráfico de evolução financeira mensal.
- [x] Implementar visualização da distribuição de gastos por categoria.
- [x] Implementar lista de transações recentes com informações essenciais de cada movimentação.
- [x] Implementar área de ações rápidas para operações financeiras frequentes.
- [x] Implementar layout responsivo para desktop, tablet e dispositivos móveis.
- [x] Organizar CSS e JavaScript em arquivos separados, com componentes reutilizáveis e dados fáceis de substituir.

## Relatório detalhado de gastos

- [x] Criar a página de relatório em um arquivo HTML próprio, compatível com Flask/Jinja e acessível pela rota `/reports`.
- [x] Linkar o item “Relatórios” da navegação e o CTA “Ver análise completa” do dashboard à nova página.
- [x] Implementar indicadores de despesas no período, média diária, maior categoria e orçamento usado.
- [x] Implementar evolução dos gastos, distribuição por categoria, detalhamento com barras de participação e maiores despesas.
- [x] Implementar filtros de período, visualização do gráfico mensal/semanal/por categoria, filtro de categorias e exportação demonstrativa.
- [x] Manter a identidade visual do dashboard e a responsividade para desktop, tablet e dispositivos móveis.

## Revisão do relatório

- [x] Diferenciar visualmente o relatório do dashboard inicial, mantendo a identidade clara, profissional e com acento verde-lima.
- [x] Mover alertas financeiros para a parte superior da página, antes dos gráficos e da tabela.
- [x] Substituir a composição anterior por gráficos de barras limpos, sem linhas de grade desnecessárias e com nomes/valores sempre visíveis.
- [x] Criar tabela filtrável de serviços pagos e a pagar, com busca, status, vencimento, categoria e valor.
- [x] Reorganizar a disposição das informações para priorizar compromissos, categorias e despesas recorrentes.

## Ajuste aplicado pelo preview edit

- [x] Substituir o primeiro cartão de resumo do relatório por um gráfico compacto de despesas semanais, preservando o valor total e a comparação com o período anterior.

## Evolução e segmentação avançada

- [x] Substituir o gráfico de barras de “Evolução dos gastos” por um gráfico de linha preenchida com área em gradiente, pontos, rótulos legíveis e alternância mensal/semanal.
- [x] Permitir segmentar os serviços pagos e a pagar por categoria, combinando o filtro de categoria com status e busca textual.

## Central de atalhos do MVP

- [x] Criar a terceira tela em arquivo HTML próprio, compatível com Flask/Jinja e acessível pela rota `/shortcuts`.
- [x] Criar atalhos visuais para adicionar receita, adicionar despesa e importar extrato.
- [x] Implementar formulário demonstrativo de lançamento manual com tipo, descrição, valor, data, categoria, conta, recorrência e observação.
- [x] Implementar importação por conexão bancária e por upload de arquivos OFX, CSV, QIF ou PDF.
- [x] Conectar o botão “Nova movimentação” e as ações rápidas do dashboard à nova tela com o fluxo correspondente pré-selecionado.
- [x] Adicionar a rota de atalhos à navegação do dashboard e do relatório, mantendo responsividade desktop/mobile e a identidade visual do Ema, Ema, Ema.

## Landing page inicial

- [x] Transformar a rota `/` na landing page inicial do Ema, Ema, Ema, mantendo o dashboard acessível pela rota `/dashboard`.
- [x] Criar uma apresentação moderna do produto com headline, CTA para acessar o dashboard, benefícios e prévia visual do sistema.
- [x] Criar formulário de lista de contato com nome, e-mail, CPF e idade, incluindo validação, máscara de CPF e feedback de envio.
- [x] Aplicar identidade visual do sistema financeiro, com fundo claro, contraste preto/lima, tipografia existente, transições suaves e efeitos práticos.
- [x] Garantir responsividade desktop/mobile e registrar a landing page no manifesto de rotas.
- [x] Reestruturar a narrativa da landing com hero, prova visual do produto, seção interativa de funcionamento, demonstração de transações e insights, módulos funcionais, compromissos de confiança e CTA final.
- [x] Adicionar tabs de demonstração, reveal-on-scroll, cabeçalho com estado de rolagem, parallax sutil na prévia do dashboard e microinterações nos cartões.

## Documentação do projeto

- [x] Criar documento descritivo completo com objetivo, estágio do MVP, entregas, pendências, próximos passos, arquitetura, rotas e jornada do usuário.
- [x] Disponibilizar a documentação em Markdown editável e PDF compartilhável.

## Rebranding e retorno ao tema claro

- [x] Alterar o nome da aplicação para “Ema, Ema, Ema” e aplicar o slogan “cada um com seu problema... Não, estamos com você.”
- [x] Retornar landing page, dashboard, relatórios e atalhos ao estilo claro original, com fundo cinza claro, superfícies brancas e acentos verde-lima.
- [x] Preservar a hierarquia visual, os componentes, gráficos e estados financeiros já aprovados antes da tentativa de tema escuro.
- [x] Atualizar ícone, títulos de rota, mensagens de interface, metadados e documentação do projeto.

## Áreas ainda em desenvolvimento

- [x] Criar a rota dinâmica `/development/:feature` com uma tela própria de “Em desenvolvimento”.
- [x] Conectar Metas, Contas e cartões e Configurações à tela de desenvolvimento, exibindo os itens da navegação com ícone e texto acinzentados e selo “Em breve”.
- [x] Aumentar levemente a tipografia da plataforma, preservando a responsividade.
- [x] Corrigir a visibilidade do ícone de Metas na navegação da página de relatórios.
