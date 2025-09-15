# Site Responsivo - Padaria Doce Pão

## 📌 Estrutura do Projeto
- index.html → Página inicial com galeria, cardápio, diferenciais e horários.
- pedidos.html → Formulário de pedidos especiais.
- contato.html → Formulário de contato.
- cadastro.html → Formulário de cadastro de clientes.
- feedback.html → Formulário de feedback.
- css/style.css → Estilos globais e responsivos.

## 📐 Breakpoints Utilizados
- Extra Small (até 320px) → Ajuste para celulares muito pequenos.
- Small (até 480px) → Smartphones padrão.
- Medium (até 768px) → Tablets e celulares grandes.
- Large (até 1024px) → Tablets maiores e notebooks pequenos.
- Default (acima de 1024px) → Desktop.

## 🎯 Boas Práticas Implementadas
- Abordagem **Mobile First** nas media queries.
- Tipografia fluida com `clamp()`, `rem`, `em`.
- Sistema de **Grid** e **Flexbox** para responsividade.
- **Menu Hambúrguer** ativado em telas menores.
- Imagens com `max-width: 100%`, `object-fit: cover` e `loading="lazy"`.
- Vídeos responsivos com `iframe` em container flexível.
- Formulários otimizados para **mobile** (inputs grandes e acessíveis).
- Botões com tamanho **mínimo 44px** para toque confortável.
- Tabelas responsivas com `overflow-x` em telas menores.
- Acessibilidade: `prefers-contrast`, `prefers-reduced-motion`.
- Testado em orientação **portrait** e **landscape**.

## ⚡ Dicas de Teste
1. Abra o DevTools (F12) e teste em diferentes resoluções.
2. Ative modo de conexão lenta (3G) para verificar lazy loading.
3. Valide em dispositivos reais (celular/tablet).
